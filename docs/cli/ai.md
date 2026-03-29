# pal ai

AI assistant for Palexplorer. Supports natural language CLI, chat assistant, and smart search. Works with local models (Ollama) or cloud providers (Claude, OpenAI, Gemini).

## Setup

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
# → pal sync add ~/projects --with charlie --mode both

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
pal ai chat "explain what PAL/1.0 protocol does"
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
