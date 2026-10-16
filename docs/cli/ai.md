# pal ai & GUI Command Line (Public Beta)

AI assistant and built-in **PAL/3 Natural-Language Search & Transfer Engine** for Palexplorer. Supports zero-API-key remote peer search and download over PAL/3.0, natural language CLI translation, interactive GUI Command Line (`Ctrl+\``), and LLM chat powered by local models (Ollama) or cloud providers (Claude, OpenAI, Gemini).

## Built-in PAL/3 Remote Peer Search & Download (Zero API Key Required)

Search any connected pal or your own other PC (e.g., `old-pc` / `Hannan-Old`) over PAL/3.0 and download matching files with ChaCha20-Poly1305 + SHA-256 verification:

```bash
# Search remote PC for personal documents and preview matches + CLI commands
pal ai "search for all my personal documents in old pc I want to download them"

# Search and immediately download all matched personal documents over PAL/3.0
pal ai "search for all my personal documents in old pc I want to download them" --run

# Specify a custom destination directory
pal ai "search for all my personal documents in old pc I want to download them" --run --to ./MyOldPcDocs
```

In the **Palexplorer Desktop GUI**, press **`Ctrl+\``** (or click **`>_ Command Line / AI`** in the status bar) to open the unified Command Line & AI Bar (modeled after Inkfold Desktop). Type any `pal` command or natural-language prompt and click **"Download All via PAL/3"** on the interactive result card.

## LLM Provider Setup (Optional)

```bash
pal ai config set --provider ollama      # Free, local (default)
pal ai config set --provider claude      # Anthropic Claude
pal ai config set --provider openai      # OpenAI GPT
pal ai config set --provider gemini      # Google Gemini

pal ai config set --key YOUR_API_KEY     # Set API key (not needed for Ollama)
pal ai config set --model llama3.2       # Set model (Ollama default: llama3.2)
pal ai config show                       # Show current config
```

## Natural Language CLI

Translate plain English into `pal` commands:

```bash
pal ai "share my documents with alice for 7 days"
# → pal share ~/Documents --with alice --expires 7d

pal ai "list all shares I have with bob"
# → pal list --with bob

pal ai "sync my projects folder two-way with charlie"
# → pal sync start ~/projects charlie

pal ai "remove alice from my photos share"
# → pal revoke --share photos --pal alice
```

Add `--dry-run` to see the translated command without running it:

```bash
pal ai --dry-run "share my desktop"
```

Add `--yes` to skip the confirmation prompt:

```bash
pal ai --yes "download the latest file from bob"
```

## AI Chat

Ask questions about your shares, pals, and how to use Palexplorer:

```bash
pal ai chat                              # Start interactive chat session
pal ai chat "what have I shared with alice?"
pal ai chat "how do I sync a folder two-way?"
pal ai chat "explain what PAL/2.0 protocol does"
```

## Smart Search

Use natural language to search your shares:

```bash
pal ai search "large videos from last week"
# Translates to: category=video, size>100MB, date>7d

pal ai search "documents shared with alice"
pal ai search "images I downloaded today"
```

## Providers

| Provider | Cost | Privacy | Setup |
|----------|------|---------|-------|
| Ollama | Free | Local — data never leaves your machine | Install Ollama + pull a model |
| Claude | Paid | Anthropic servers | API key from console.anthropic.com |
| OpenAI | Paid | OpenAI servers | API key from platform.openai.com |
| Gemini | Paid | Google servers | API key from aistudio.google.com |

> **Note**: With cloud providers, your queries (not your files) are sent to the provider's API. File contents never leave your machine.

## Ollama Quick Start

```bash
# Install Ollama from https://ollama.com
ollama pull llama3.2
pal ai config set --provider ollama --model llama3.2
pal ai "list my shares"
```
