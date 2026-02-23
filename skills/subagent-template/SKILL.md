---
name: subagent-template
description: Auto-initialize sub-agent workspaces with custom files (BOOTSTRAP, IDENTITY, SOUL, etc.)
homepage: https://docs.openclaw.ai
metadata:
  openclaw:
    emoji: 🧬
---

# Sub-Agent Template Skill

This skill automatically copies template files to new sub-agent workspaces.

## When to Use

Spawn a sub-agent with this skill when you want the sub-agent to:
- Have a custom personality (SOUL.md)
- Use specific onboarding (BOOTSTRAP.md)
- Follow custom rules (AGENTS.md)
- Have predefined tools/notes (TOOLS.md)

## Template Files Location

Source files are stored at:
```
/root/.openclaw/skills/subagent-template/templates/
├── BOOTSTRAP.md
├── IDENTITY.md
├── SOUL.md
├── USER.md
├── AGENTS.md
├── TOOLS.md
├── OPENCLAW_SYSTEM_PROMPT_STUDY.md
└── README.md
```

## Usage

### Method 1: Spawn with skill reference
```javascript
sessions_spawn({
  task: "Your task here",
  skill: "subagent-template"  // Auto-copies templates
})
```

### Method 2: Manual copy in task
```javascript
sessions_spawn({
  task: `
    First, copy template files:
    cp /root/.openclaw/skills/subagent-template/templates/*.md /root/.openclaw/workspace/
    
    Then do your work...
  `
})
```

## Template Variables

These placeholders get replaced when copying:
- `{{AGENT_NAME}}` → Sub-agent's assigned name
- `{{TIMESTAMP}}` → Creation time
- `{{PARENT_SESSION}}` → Parent session key

## Customizing Templates

Edit files in `/templates/` directory. Changes apply to all future sub-agents.

## Files Included

| File | Purpose |
|------|---------|
| BOOTSTRAP.md | First-run onboarding ritual |
| IDENTITY.md | Agent name, creature, emoji |
| SOUL.md | Personality, values, tone |
| USER.md | User profile & preferences |
| AGENTS.md | Workspace rules & conventions |
| TOOLS.md | Tool notes & environment |
| OPENCLAW_SYSTEM_PROMPT_STUDY.md | System documentation |
| README.md | Project overview |
