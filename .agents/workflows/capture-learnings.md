---
description: Capture lessons learned and update system memory after major work
---

# Capture Learnings & Evolve System

This workflow is used to extract lessons learned, design patterns, and bugs fixed from a recent task, and formally store them in our memory system to make the agent smarter and more efficient in the future.

## Prerequisites
- A major piece of work, feature, or bugfix has just been completed.
- The user has requested to capture learnings.

## Steps

### 1. Analyze the Completed Work
- Review the recent changes made in the codebase.
- Identify the core problems that were solved.
- Identify any rendering bugs, layout distortions, or framework-specific nuances that were encountered and fixed.

### 2. Extract Key Learnings
Categorize the findings into:
- **Design/Component Patterns**: Reusable UI patterns, accessibility fixes, CSS tricks (e.g., using `aspect-square` for reliable icon sizing).
- **Architecture Decisions**: Component extraction, state management, API integration strategies.
- **Workflow & Tooling**: Vercel deployment quirks, Next.js hydration issues, or package conflicts.

### 3. Update the Memory File
// turbo
```
view_file d:\Website Developer\.agents\memory.md
```
- Evaluate if the learnings are already present in `memory.md`.
- Use the `replace_file_content` or `multi_replace_file_content` tool to append or update sections in `memory.md`.
- Keep the `memory.md` clear, organized, and searchable.

### 4. Update Relevant Workflows/Skills (If Applicable)
- If a finding changes how we should execute future tasks (e.g., a new mandatory check before committing), propose an update to `d:\Website Developer\AGENTS.md`, or relevant workflows in `.agents/workflows/` and `.agents/skills/`.

### 5. Commit & Push to Repository
- If any updates were made to `.agents/memory.md`, `AGENTS.md`, or workflows, use the `run_command` tool to immediately stage, commit, and push the documents to GitHub.
- Example message: `docs: capture recent project learnings and patterns`

### 6. Summarize the Evolved State
- Inform the user of what specific knowledge was logged, that it has been safely synced to GitHub, and how it will improve future interactions.
