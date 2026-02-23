#!/bin/bash
# Auto-copy template files to new sub-agent workspace
# This runs automatically when sub-agents are spawned with the subagent-template skill

SOURCE_DIR="/root/.openclaw/skills/subagent-template/templates"
TARGET_DIR="/root/.openclaw/workspace"

echo "[subagent-template] Copying template files to workspace..."

cp "$SOURCE_DIR"/*.md "$TARGET_DIR/" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "[subagent-template] ✓ Templates copied:"
  ls -1 "$SOURCE_DIR"/*.md | xargs -n1 basename
else
  echo "[subagent-template] ✗ Failed to copy templates"
fi
