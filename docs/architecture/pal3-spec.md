# PAL/3.0 Post-Quantum Peer-to-Peer Wire Protocol Specification

> **Copyright © 2026 Palexplorer. All rights reserved.**
> Canonical Specification & Conformance Vectors: [`github.com/hn2/pal-spec`](https://github.com/hn2/pal-spec) · Status: **Draft 0.3.0** (2026-10-15)

PAL/3.0 is an integrated, zero-TCP, post-quantum peer-to-peer protocol that carries peer discovery, mutual identity authentication, capability permissions, Merkle-verified file transfer, low-latency media streaming, delta synchronization, encrypted messaging, and network diagnostics over UDP carriers.

## Conventions

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) when, and only when, they appear in all capitals.

## 0. Architectural Decisions

| # | Decision |
|---|---|
| D1 | Legacy BitTorrent/WebTorrent protocols (BEP 3, BEP 10, torrents, trackers, PEX, LSD, magnet links) are completely replaced by PAL/3.0. |
| D2 | **No raw TCP and no HTTP** in the P2P stack (`net`, `tls`, `http`, `http2` are forbidden in core). All peer traffic is UDP-based. |
| D3 | Post-quantum cryptography is mandatory: hybrid `X25519 + ML-KEM-768` (NIST FIPS 203) key establishment and hybrid `Ed25519 + ML-DSA-65` (NIST FIPS 204) authentication. Classical-only modes and silent fallbacks are forbidden. |
| D4 | Granular capability permissions and byte-range media streaming are core protocol operations. |
| D5 | Core works with zero central servers (LAN multicast + endpoint cache + mutual-peer introducer + serverless WAN mailbox). Servers (TURN, rendezvous, discovery, `@handles`) remain optional extensions. |
| D6 | Portable cross-platform file-system metadata across Windows, macOS, and Linux is first-class (§10). |
| D7 | PAL/3.0 is a clean-slate binary wire protocol. Handshake frames use deterministic binary TLV (Appendix A); operation bodies use a deterministic binary codec (PAL-CBOR subset) with strict pre-allocation bounds. |

---

## 1. Protocol Objectives & Verification Targets

| ID | Objective | Acceptance Target | Verification Method |
|---|---|---|---|
| O1 | Zero TCP in P2P | Zero TCP sockets opened during any P2P operation; WebRTC ICE configured with `enableIceTcp: false` | Static import gate and runtime socket guard; packet capture confirms UDP-only transport |
| O2 | Mandatory Hybrid PQC | 100% of sessions use hybrid KEM + hybrid signatures; downgrade, replay, reflection, unknown-key, truncation, identity-misbinding, and forged-block attacks rejected | Deterministic test vectors (Appendix A) and adversarial fault-injection suite (§13) |
| O3 | High-Throughput LAN | Cold time-to-first-byte ≤ 500 ms; warm pooled connection ≤ 50 ms; 1.5-RTT handshake; ≥ 100 MB/s single large file on 1 GbE | Multi-platform benchmark harness across Windows, Linux, and macOS |
| O4 | Serverless NAT Traversal | ≥ 90% direct UDP connection across consumer/SOHO NAT pairings; ≥ 99% connectivity when end-to-end encrypted peer relay (§4.1 N6) is enabled | Network namespace NAT matrix (EIM-EIF, EIM-ADF, EIM-APDF, APDM-APDF, CGNAT, IPv6) |
| O5 | Cryptographic Block Integrity | Every 256 KiB block verified against a hybrid-signed Merkle root before disk write; no partially written file ever visible under its final name | Bit-flip, leaf/interior swap, proof forgery, and size-truncation fault-injection tests |
| O6 | Granular Capability Grants | Default deny; every operation authorized before the first byte and re-checked at every 256 KiB block boundary; revocation halts active streams within 1 block (≤ 256 KiB) | Permission matrix (subject × operation × constraint) and mid-stream revocation tests |
| O7 | Low-Latency Media Seek | Byte-range seek → first verified bytes ≤ 300 ms on LAN, ≤ 1.5 s on a 20 Mbit/s 50 ms RTT link | Media streaming byte-range seek profiles |
| O8 | Cross-OS File-System Fidelity | Portable metadata set (§10) round-trips Windows ↔ macOS ↔ Linux; incoming files receive platform quarantine / Mark-of-the-Web attributes | 3-OS round-trip verification (`Zone.Identifier`, `com.apple.quarantine`, `user.xdg.origin.url`) |
| O9 | Bounded Memory & Fuzz Safety | Frame parser, handshake TLV decoder, and manifest decoder reject malformed inputs prior to unbounded allocation; memory ≤ 256 MiB at 64 concurrent streams | Continuous fuzzing and 64-stream credit-cap soak testing |

---

## 2. Protocol Layers

```
Application    shares · permissions · file.read · media.stream · sync · chat · groups · receipts · MFT
Content        signed manifests · BLAKE2b-256 Merkle trees (256 KiB blocks) · resume bitmaps
Operations     request/response + streams · credit flow control · priorities · cancel
Records        ChaCha20-Poly1305 (IETF) per channel and direction · strict sequence numbers
Session        PAL/3 handshake (hybrid KEM + hybrid signatures, SIGMA-I transcript) · key epochs
Carrier        C1 WebRTC data channels (UDP: ICE/DTLS/SCTP) · C2 PAL-UDP direct LAN
Rendezvous     R1 LAN multicast · R2 endpoint cache · R3 serverless WAN mailbox · R4 mutual peer · R5 extensions
```

Each layer communicates strictly with its adjacent layers.

---

## 3. Carrier Layer

### 3.1 C1 — WebRTC DataChannels (Primary, Required)
- **Single-Port UDP Multiplexing:** Implementations SHOULD bind a single UDP socket (`enableIceUdpMux`, default port `52474`, falling back to an OS-assigned port if already bound) with `enableIceTcp: false`. This allows router port mappings (N2) and peer-observed reflexive addresses (N3) to be reused across all peer connections.
- **Channel Allocation (One Pooled Connection per Peer Device Pair):**
  - `pal3/ctl` (channel ID `0`): ordered, reliable. Handshake, control frames, chat, permission events, and diagnostics.
  - `pal3/media` (channel ID `1`): ordered, reliable. Dedicated to `media.stream`, using a small send buffer high-water mark (`clamp(RTT × bandwidth, 256 KiB, 1 MiB)`) so byte-range seeks are never queued behind bulk transfers.
  - `pal3/bulk/0..N-1` (channel IDs `2..3`, `N = 1..2`): ordered, reliable. File transfer and delta sync data (`clamp(RTT × bandwidth, 512 KiB, 4 MiB)`).
- **Record Sizing Alignment:** `MAX_DATA_PAYLOAD = 65,536` bytes (`64 KiB`), `MAX_RECORD_WIRE = 65,572` bytes (`65,536` payload + `20` header + `16` AEAD tag). A `256 KiB` Merkle block splits into at most 4 aligned `64 KiB` `DATA` records, avoiding SCTP head-of-line fragmentation blocking.
- **End-to-End Post-Quantum Security Independent of DTLS:** Because WebRTC DTLS is classical and terminates at peer relays (N6), PAL/3.0 authenticates and encrypts every record end-to-end at the Session/Record layers (§5–§6).

### 3.2 C2 — PAL-UDP Direct
A direct UDP carrier (`dgram`) carrying the exact same 20-byte framed records and session handshake over UDP datagrams with packet numbers, ACK ranges, pacing, and path MTU discovery for LAN and symmetric-NAT birthday punching (N5).

---

## 4. Rendezvous & NAT Traversal

A peer is identified by its **Identity Key** (`Ed25519` 32 B + `ML-DSA-65` 1,952 B) and each machine by a **Device Key** (`Ed25519` + `ML-DSA-65` signing pair, plus `X25519` + `ML-KEM-768` static signaling key) certified by the Identity Key.

| ID | Mechanism | Scope | Normative Behavior |
|---|---|---|---|
| R1 | LAN Multicast (`239.255.42.99:52473`) | LAN, zero servers | Announces a rotating keyed tag `HMAC-SHA-256(key = SHA-256("pal3-lan-v1" \|\| identity_ed25519_pk), u64be(floor(unix_sec / 900)))` with a 16-byte random beacon nonce and timestamp. Unrelated LAN observers cannot link rotating tags across 15-minute epochs; known contacts recompute the tag (`±1` epoch window) and exchange hybrid-sealed unicast UDP signaling. |
| R2 | Endpoint Cache | LAN / WAN | Persists last verified `(ip, port, family, lastSeen)` candidate pairs per device for fast direct reconnect before WAN lookup. |
| R3 | Serverless WAN Mailbox (PAL-DHT) | WAN, zero central servers | Stores hybrid-sealed signaling blobs under a rotating location key `SHA-256("pal3-wan-mailbox-v1" \|\| recipient_ed25519_pk \|\| u64be(floor(unix_sec / 3600)))` over UDP Kademlia DHT supporting ≥ 16 KiB signed records. |
| R4 | Mutual Peer Introducer | WAN | Any mutually connected peer forwards hybrid-sealed signaling blobs over `pal3/ctl` (`rendezvous.forward`). The introducer cannot decrypt or forge the signaling payload. |
| R5 | Optional Server Extensions | Enterprise / Custom | Self-hosted or cloud rendezvous, `@handle` discovery servers, and TURN relays. |

All signaling blobs MUST be hybrid-sealed (`X25519 + ML-KEM-768`) to the recipient, hybrid-signed (`Ed25519 + ML-DSA-65`) by the sender, carry `(session_id, signal_seq, timestamp_ms)` within a `±5 min` window, and be checked against a bounded LRU replay cache.

### 4.1 Serverless NAT Traversal Hierarchy (N1–N7)
1. **N1 — IPv6 Direct:** Gather global unicast IPv6 candidates (excluding `fe80::/10` link-local and deprecated temporary addresses).
2. **N2 — Router Port Mapping:** PCP (RFC 6887), NAT-PMP (RFC 6886), and UPnP-IGD for the single muxed UDP port; detect CGNAT (`100.64.0.0/10` or RFC 1918 WAN IP).
3. **N3 — Serverless Reflexive Discovery (`addr.observe`):** Connected peers report the caller's observed source `(ip, port)` on `pal3/ctl`. A reported address is accepted only if it is a valid global unicast IP and confirmed by ≥ 2 independent peers on distinct `/24` IPv4 (or `/48` IPv6) prefixes. Divergent observed ports across independent peers automatically classify the local NAT as Address/Port-Dependent (Symmetric NAT).
4. **N4 — Simultaneous Open (ICE Paced Hole Punching):** Paced connectivity checks (`20 ms` interval) exchanged via R1–R4.
5. **N5 — Symmetric NAT Port Prediction / Bounded Birthday Punching:** Sequential delta probing (`1 <= Δp <= 16`) or bounded birthday probing over C2 (max 64 sockets, ≤ 50 probes/s for 3 s = 150 packets max).
6. **N6 — End-to-End Encrypted Peer Relay (`relay.v1`):** When N1–N5 do not establish a direct path within `2.5 s`, peers dial through a mutual peer issuing a signed `RelayReservation` token (default 15 min duration, 2 MiB/s rate cap, 256 MiB quota). The relay forwards opaque `RELAY{session_id, opaque_record}` frames without decrypting them. Background hole punching upgrades seamlessly to a direct path via authenticated `PATH_CHALLENGE` / `PATH_RESPONSE` and `PATH_SWITCH{switch_id, last_seq}`.
7. **N7 — TURN Relay:** Optional enterprise extension (off by default).

---

## 5. Session Handshake (1.5-RTT Hybrid PQC SIGMA-I)

### 5.1 Wire Messages (on `pal3/ctl`, Deterministic Binary TLV)

```
COOKIE_REQ  R→I (optional, stateless DoS defense under load):
                cookie = HMAC-SHA-256(responder_secret, caller_endpoint || minute_bucket || SHA-256(HELLO_without_cookie))

HELLO       I→R : version_list, suite, nonce_I (32B), cookie (0 or 32B),
                  device_cert_I, x25519_eph_I (32B), mlkem_ek_I (1184B),
                  capabilities_I, revocation_version_I (u64), expected_id_R (0 or 32B)

ACCEPT      R→I : version (u16), suite (u16), nonce_R (32B),
                  device_cert_R, x25519_eph_R (32B), mlkem_ct (1088B),
                  capabilities_R, revocation_version_R (u64),
                  sig_ed25519_R (64B), sig_mldsa65_R (3309B)
                  where both signatures sign:
                  "pal3-hs-v1-responder" || SHA-256(HELLO_bytes || ACCEPT_body_bytes)

FINISH      I→R : [sent as the FIRST encrypted record on pal3/ctl, key_epoch = 0, channel_seq = 0, type = CTRL]
                  sig_ed25519_I (64B), sig_mldsa65_I (3309B)
                  where both signatures sign:
                  "pal3-hs-v1-initiator" || SHA-256(HELLO_bytes || ACCEPT_bytes)

READY       R→I : [sent as the FIRST encrypted record from R→I on pal3/ctl, key_epoch = 0, channel_seq = 0, type = CTRL]
                  CTRL{op: "ready"}
```

### 5.2 Cryptographic Rules & Key Schedule
- **Strict-AND Hybrid Signature Verification:** Both `sig_ed25519` AND `sig_mldsa65` (with FIPS 204 context `"pal3-hs-v1"`) MUST verify. If either fails, the session MUST abort immediately.
- **Device Certificate (`device_cert`):** Certifies `device_ed25519_pk (32B)` and `device_mldsa65_pk (1952B)` under `identity_ed25519_pk (32B)` and `identity_mldsa65_pk (1952B)` over `"pal3-devcert-v1" || SHA-256(cert_body_bytes)` (FIPS 204 context `"pal3-devcert-v1"`). Single-device self-bound identities (`device_pk == identity_pk`) MAY set `flags = 0x01 (SELF_CERT)` and omit the duplicate device public keys and self-signature (`2,009 bytes` vs `7,373 bytes`).
- **IND-CCA Hybrid KEM Combiner & Key Schedule (Suite `0x0001`):**
  1. `ss_x = X25519(x25519_eph_sk, x25519_eph_peer_pk)` (MUST reject all-zero shared secret).
  2. `ss_pq = ML-KEM-768.Decaps(mlkem_dk_I, mlkem_ct)` (or `Encaps(mlkem_ek_I)` on responder).
  3. `kem_context = x25519_eph_I || x25519_eph_R || SHA-256(mlkem_ek_I) || SHA-256(mlkem_ct)` (`128 bytes`).
  4. `ikm = ss_x || ss_pq || kem_context` (`192 bytes`).
  5. `th = SHA-256(HELLO_bytes || ACCEPT_bytes)` (`32 bytes`).
  6. `prk_0 = HKDF-Extract-SHA-256(salt = th, ikm = ikm)`.
  7. For each channel `ch_id` (`0 = ctl`, `1 = media`, `2 = bulk/0`, `3 = bulk/1`) and direction `role_dir` (`"i2r"` or `"r2i"`):
     - `key = HKDF-Expand-SHA-256(prk_0, "pal3-k-v1" || u16be(epoch) || u8(ch_id) || role_dir, 32)`
     - `salt = HKDF-Expand-SHA-256(prk_0, "pal3-s-v1" || u16be(epoch) || u8(ch_id) || role_dir, 4)`
  8. `exporter_secret = HKDF-Expand-SHA-256(prk_0, "pal3-exp-v1" || u16be(epoch), 32)`.
  All intermediate secrets (`ss_x`, `ss_pq`, `ikm`, ephemeral private keys) MUST be zeroized immediately after derivation.

### 5.3 Lifetime & Post-Compromise Rekey (`REKEY`)
- Triggered after `2^32` records on any channel, `64 GiB` transmitted in either direction, or `1 hour` elapsed.
- Performs a fresh ephemeral `X25519 + ML-KEM-768` exchange (`rekey_init` / `rekey_resp`) on `pal3/ctl` and derives:
  `prk_{e+1} = HKDF-Extract-SHA-256(salt = exporter_secret_e, ikm = ss_x_new || ss_pq_new || kem_context_new)`.
- Each side sends `REKEY{new_epoch: e+1, last_seq}` as its final epoch-`e` record on each active channel and resets `channel_seq = 0` for epoch `e+1`.

---

## 6. Record Layer

### 6.1 Wire Layout (20-Byte Header + Ciphertext + 16-Byte Tag)
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|    type (u8)  |   flags (u8)  |         key_epoch (u16be)     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        stream_id (u32be)                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                       channel_seq (u64be)                     +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      payload_length (u32be)                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                   ciphertext (payload_length bytes)          ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        poly1305_tag (16 bytes)                |
|                                                               |
|                                                               |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
- **Header (20 bytes):** Passed verbatim as Additional Authenticated Data (AAD) to **ChaCha20-Poly1305 (RFC 8439)**.
- **Nonce Construction (12 bytes):** `salt (4 bytes, per channel + direction + key_epoch) || u64be(channel_seq) (8 bytes)`.
- **Strict Monotonicity:** `channel_seq` MUST equal `expected_recv_seq` for `(channel_id, key_epoch)`. Any gap, repeat, or out-of-order record MUST abort the session immediately before state mutation.
- **Size Bounds:** `MAX_DATA_PAYLOAD = 65,536` bytes (`64 KiB`); `MAX_CONTROL_PAYLOAD = 65,536` bytes (`64 KiB`); `MAX_HANDSHAKE_WIRE = 32,768` bytes (`32 KiB`).
- **Record Types (`type u8`):**
  - Unencrypted pre-epoch-0 handshake frames on `ctl`: `0x01 HELLO`, `0x02 ACCEPT`, `0x03 COOKIE_REQ`.
  - Encrypted session records: `0x10 CTRL`, `0x11 REQ`, `0x12 RES`, `0x13 DATA`, `0x14 END`, `0x15 CANCEL`, `0x16 CREDIT`, `0x17 ERROR`, `0x18 PING`, `0x19 PONG`, `0x1A REKEY`, `0x1B PATH_SWITCH`, `0x1C RELAY`, `0x1D CLOSE`.

---

## 7. Operations & Credit-Controlled Streams

- Every request uses a directional `stream_id` (`odd = initiator`, `even = responder`, `0 = connection-wide control`), an ASCII operation name (`<= 128` bytes), and a deterministic binary body.
- **Credit Flow Control:** Receivers grant byte credits per stream (`CREDIT{granted_bytes: u32}`). Each stream starts with an initial credit window of `512 KiB` (2 Merkle blocks), auto-tuned up to `16 MiB` per stream from measured `RTT × throughput`, bounded by a hard per-connection cap of `64 MiB` across all active streams. Sending `DATA` bytes beyond granted credit is a fatal protocol violation.
- **Core Operations Catalogue (v1):** `share.list`, `share.manifest`, `share.browse`, `file.read`, `have`, `sources`, `identity.state`, `addr.observe`, `rendezvous.forward`, `media.stream`, `sync.offer`, `sync.manifest`, `sync.push`, `sync.ack`, `chat.message`, `chat.receipt`, `group.invite`, `group.event`, `device.sync`, `grant.request`, `grant.issue`, `grant.revoke`, `receipt.delivery`, `presence`, `ping`.

---

## 8. Content Model & BLAKE2b-256 Merkle Trees

### 8.1 Domain-Separated BLAKE2b-256 Merkle Tree (`256 KiB` Blocks)
- **Block Size:** `BLOCK_BYTES = 262,144` (`256 KiB`). A file of `size > 0` bytes has `num_blocks = ceil(size / 262144)` blocks indexed `0 .. num_blocks - 1`.
- **Empty File (`size == 0`):** Canonical empty root:
  `empty_root = BLAKE2b-256(0x02 || u64be(0))` (`9` bytes input).
- **Leaf Hash:** Binds domain byte `0x00`, 0-based `block_index (u64be)`, and `block_len (u32be)`:
  `leaf(index, block) = BLAKE2b-256(0x00 || u64be(index) || u32be(block.length) || block)`
- **Interior Node Hash:** Binds domain byte `0x01` and tree `level (u8, >= 1)`:
  `node(level, left, right) = BLAKE2b-256(0x01 || u8(level) || left || right)`
  When a level has an odd number of nodes (`count > 1` and `count % 2 == 1`), the unpaired rightmost node is promoted to the next level without hashing.
- **Content Identifier:** `pal3:b2t:<root-hex-64>:<size-decimal>`.
- **Mandatory Pre-Write Verification:** Receivers MUST verify block index bounds, exact block byte length, and the Merkle inclusion proof against the signed manifest's `(expected_root, expected_size)` before writing any bytes to disk.

### 8.2 Hybrid-Signed Manifests & Rollback Protection
- Manifests are signed by the owner's `Ed25519 + ML-DSA-65` identity keys under context `"pal3-manifest-v1"` and carry `revision_counter (u64)` and `author_device_id (16B)`.
- Receivers persist the highest seen `(revision_counter, author_device_id, manifest_hash)` per `share_id` and reject any update with a lower `revision_counter`.

### 8.3 Private Encrypted Shares (Encrypt-Then-Merkle)
- Per-file keys are derived via `HKDF-SHA-256(share_key, file_id, "pal3-file-key-v1", 32)` where `file_id` is a 16-byte random nonce.
- Each 256 KiB block `index` is encrypted with `ChaCha20-Poly1305-IETF(key = file_key, nonce = "pal3" || u64be(index), aad = file_id || u64be(index))` prior to computing the BLAKE2b-256 Merkle tree so multi-source holders can verify block integrity over ciphertext without learning the plaintext.

---

## 9. Capability Permissions Engine

- **Subjects:** `identity` (`ed25519_pk`), `device` (`ed25519_pk + device_id`), `group` (`group_id`), `link-capability` (bound to first claimant's `identity_pk`), `password` (Argon2id-wrapped share key), `anonymous`.
- **Operations:** `list`, `read`, `stream`, `write`, `delete`, `reshare`, `chat`, `sync`, `relay`.
- **Constraints:** `expires_at_ms`, `not_before_ms`, `max_reads`, `max_bytes`, `bandwidth_bps`, `devices_max`, `require_pq` (always `true`), `time_window_utc`, `watermark`.
- **Evaluation Order:**
  1. Deny-list and `revocation_version` check → `DENY` if matched.
  2. Active signed grant matching caller subject, operation, and target resource.
  3. Time-window and quota checks (`reads_used < max_reads`, `bytes_used < max_bytes`, `active_devices <= devices_max`).
  4. Default `DENY` if no grant passes.
  5. Active `GrantLease` re-verified at every `256 KiB` block boundary (`assertActive(chunkBytes)`).

---

## 10. Cross-Platform File-System Layer

1. **Path Segment Validation:** Wire paths are arrays of UTF-8 `segments[]`. Receivers MUST reject empty segments, `"."`, `".."`, segments > 255 UTF-8 bytes, total paths > 4096 UTF-8 bytes, `/` or `` or control characters (`\x00`–`\x1f`), and Windows reserved device names (`CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`, `CONIN$`, `CONOUT$`, `CLOCK$`).
2. **NFC & Case-Collision Check:** All manifest paths are normalized to Unicode `NFC` and checked for case-insensitive collisions prior to extraction.
3. **No-Symlink-Traversal Staging & Atomic Commit:** Blocks are staged to `.palpart-<root-prefix>-<entry-hash>.part` with a `.bitmap` resume file, tagged with platform Mark-of-the-Web / quarantine metadata (`Zone.Identifier` on Windows, `com.apple.quarantine` on macOS, `user.xdg.origin.url` on Linux), flushed via `datasync()`, and atomically renamed into place.

---

## 11. Network & System Diagnostics (`diag.v1`)

- **Wire-Level RTT & Jitter Probing (`PING` / `PONG`):** Encrypted `PING` / `PONG` records on `pal3/ctl` track smoothed RTT ($	ext{SRTT} = \frac{7}{8}	ext{SRTT} + \frac{1}{8}R$), RFC 3550 smoothed jitter, packet loss ratio, and connection quality tier (`excellent`, `good`, `fair`, `poor`).
- **Standard Diagnostic Operations:**
  - `diag.ping`: Application-layer echo (`{ seq, echoNonce, responderTimeMs }`).
  - `diag.report`: Sanitized, zero-PII diagnostic snapshot signed with hybrid `Ed25519 + ML-DSA-65` under context `"pal3-diag-v1"` and domain `"pal3-diag-report-v1"`.
  - `diag.trace`: Hop-by-hop epoch, channel count, smoothed RTT, and link quality trace.
  - `addr.observe`: Serverless reflexive address observation (§4.1 N3).

---

## 12. Versioning, Comprehension-Bit TLV Extensions & Extension Signing (`PAL-EXT-SIG-V3`)

### 12.1 Comprehension-Bit TLV Tag Ranges
- `0x0001..0x7FFF`: **Core protocol tags.** Unknown core tags MUST abort with `E_PAL3_UNKNOWN_CORE_TAG`.
- `0x8000..0xBFFF` (`(tag & 0xC000) == 0x8000`): **Critical (comprehension-required) extension tags.** Unknown critical tags MUST abort with `E_PAL3_UNSUPPORTED_CRITICAL_EXTENSION`.
- `0xC000..0xFFFF` (`(tag & 0xC000) == 0xC000`): **Comprehension-optional (ignorable) extension tags.** Unknown optional tags MUST be preserved verbatim in the transcript hash and hybrid signatures and surfaced to the application.

### 12.2 Hybrid Post-Quantum Extension Signing (`PAL-EXT-SIG-V3`)
- Extension bundles and package manifests (`PAL-EXT-SIG-V3
`) MUST be signed with **both** `Ed25519` (`64B`) and `ML-DSA-65` (`3309B`, FIPS 204 context `"pal3-ext-sig-v1"`).
- Third-party publishers present a delegated `publisherCert` signed by a trusted root/team identity (`"pal3-ext-cert-v1"`), scoping `allowedExtensions`, `allowedPermissions`, and `expiresAtMs`.

---

## Appendix A. Byte-Exact Wire Encodings

### A.1 Deterministic TLV Encoding (Handshake & Certificates)
Every TLV message is a sequence of fields sorted strictly by ascending `tag (u16be)`:
```
tag (u16be) | length (u32be) | value (length bytes)
```
Duplicate tags or out-of-order tags MUST be rejected immediately with `E_PAL3_MALFORMED_TLV`.

#### Device Certificate (`device_cert`) TLV Tags
| Tag | Field | Wire Encoding |
|---|---|---|
| `0x0001` | `flags` | `u8` (`0x00` = delegated device cert, `0x01` = self-certified single-device identity) |
| `0x0002` | `identity_ed25519_pk` | `32 bytes` |
| `0x0003` | `identity_mldsa65_pk` | `1952 bytes` |
| `0x0004` | `device_id` | `16 bytes` |
| `0x0005` | `device_ed25519_pk` | `32 bytes` (omitted if `flags == 0x01`) |
| `0x0006` | `device_mldsa65_pk` | `1952 bytes` (omitted if `flags == 0x01`) |
| `0x0007` | `issued_at_ms` | `u64be` (`8 bytes`) |
| `0x0008` | `expires_at_ms` | `u64be` (`8 bytes`) |
| `0x0009` | `cert_sig_ed25519` | `64 bytes` (omitted if `flags == 0x01`) |
| `0x000A` | `cert_sig_mldsa65` | `3309 bytes` (omitted if `flags == 0x01`) |

#### `HELLO` Message TLV Tags (`record.type = 0x01`, `stream_id = 0`, `channel_seq = 0`)
| Tag | Field | Wire Encoding |
|---|---|---|
| `0x0001` | `version_list` | `2 * N` bytes of `u16be` versions (e.g. `0x0003`) |
| `0x0002` | `suite` | `u16be` (`0x0001` = `X25519_MLKEM768_ED25519_MLDSA65_CHACHA20POLY1305_BLAKE2B`) |
| `0x0003` | `nonce_I` | `32 bytes` |
| `0x0004` | `cookie` | `0` or `32 bytes` |
| `0x0005` | `device_cert_I` | nested TLV bytes |
| `0x0006` | `x25519_eph_I` | `32 bytes` |
| `0x0007` | `mlkem_ek_I` | `1184 bytes` |
| `0x0008` | `capabilities_I` | UTF-8 comma-separated sorted ASCII tokens |
| `0x0009` | `revocation_version_I` | `u64be` (`8 bytes`) |
| `0x000A` | `expected_id_R` | `0` or `32 bytes` |

#### `ACCEPT` Message TLV Tags (`record.type = 0x02`, `stream_id = 0`, `channel_seq = 0`)
| Tag | Field | Wire Encoding |
|---|---|---|
| `0x0001` | `version` | `u16be` (`0x0003`) |
| `0x0002` | `suite` | `u16be` (`0x0001`) |
| `0x0003` | `nonce_R` | `32 bytes` |
| `0x0004` | `device_cert_R` | nested TLV bytes |
| `0x0005` | `x25519_eph_R` | `32 bytes` |
| `0x0006` | `mlkem_ct` | `1088 bytes` |
| `0x0007` | `capabilities_R` | UTF-8 comma-separated sorted ASCII tokens |
| `0x0008` | `revocation_version_R` | `u64be` (`8 bytes`) |
| `0x0009` | `sig_ed25519_R` | `64 bytes` |
| `0x000A` | `sig_mldsa65_R` | `3309 bytes` |

(`ACCEPT_body_bytes` is the concatenation of tags `0x0001` through `0x0008`.)

#### `FINISH` Message TLV Tags (`record.type = 0x10 CTRL`, `key_epoch = 0`, `channel_seq = 0`)
| Tag | Field | Wire Encoding |
|---|---|---|
| `0x0001` | `sig_ed25519_I` | `64 bytes` |
| `0x0002` | `sig_mldsa65_I` | `3309 bytes` |
