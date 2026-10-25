#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="${1:-$HOME/.gemini/config/skills}"

echo "============================================="
echo "  Installing Deadline Engine & Skill Matrix  "
echo "============================================="

SOURCE_SKILLS_DIR="$PROJECT_ROOT/skills"

if [ ! -d "$SOURCE_SKILLS_DIR" ]; then
    echo "Error: Source skills directory not found at $SOURCE_SKILLS_DIR" >&2
    exit 1
fi

mkdir -p "$TARGET_DIR"

for skill_dir in "$SOURCE_SKILLS_DIR"/*/; do
    skill_name="$(basename "$skill_dir")"
    dest="$TARGET_DIR/$skill_name"
    mkdir -p "$dest"
    cp -f "$skill_dir/SKILL.md" "$dest/SKILL.md"
    echo "  [+] Installed skill: $skill_name"
done

echo -e "\nAll 12 skills successfully installed into $TARGET_DIR!"
echo "To use, activate the 'deadline' skill or run '/plan'."
