---
layout: home

hero:
  name: Palexplorer (Public Beta)
  text: Post-Quantum P2P File Sharing & AI Explorer
  tagline: Public Beta · Powered by the zero-TCP PAL/3.0 Protocol (X25519 + ML-KEM-768 & Ed25519 + ML-DSA-65), 256 KiB BLAKE2b-256 Merkle verification, PAL-EXT-SIG-V3 signed extensions, and the built-in GUI Command Line & AI Assistant.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Download (Beta)
      link: https://palexplorer.com/download
    - theme: alt
      text: CLI Reference
      link: /cli/

features:
  - icon: 🛡️
    title: PAL/3.0 Hybrid Post-Quantum Protocol
    details: Clean-slate zero-TCP transport over WebRTC DataChannels and PAL-UDP. 1.5-RTT SIGMA-I handshake with mandatory hybrid X25519 + ML-KEM-768 (FIPS 203) and Ed25519 + ML-DSA-65 (FIPS 204), ChaCha20-Poly1305 encryption, and 256 KiB BLAKE2b-256 Merkle trees.
  - icon: 🤖
    title: GUI Command Line & PAL/3 AI Bar
    details: Press Ctrl+` in the Desktop GUI or run pal ai in your terminal. Ask in plain English — e.g. "search for all my personal documents in old pc I want to download them" — to scan remote pals/PCs over PAL/3 and download matched files.
  - icon: 🧩
    title: Signed Extensions (PAL-EXT-SIG-V3, Beta)
    details: 36 extensions (in Public Beta) verified with PAL-EXT-SIG-V3 hybrid Ed25519 + ML-DSA-65 signatures and Team-signed Publisher Certificates (publisherCert). Self-signed untrusted keys are blocked.
  - icon: 💻
    title: Cross-Platform Desktop & CLI (Beta)
    details: 2-pane Desktop GUI (with integrated Command Line & AI bar), CLI tool (pal), and built-in PAL/3 diagnostics (pal doctor, pal diag, pal ping, pal trace).
  - icon: 🔑
    title: Self-Sovereign Hybrid Identity
    details: Your identity is a local Ed25519 + Post-Quantum keypair derived from a 24-word mnemonic. No mandatory accounts, no central file storage, no tracking.
  - icon: 📡
    title: Works Offline on LAN
    details: Full PAL/3 sharing, remote machine browsing (pal share-machine), FastCDC delta sync, and natural-language peer search work directly over LAN without internet.
---
