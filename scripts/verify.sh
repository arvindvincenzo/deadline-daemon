#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "================================================="
echo "   Deadline Daemon Verification & Quality Gate   "
echo "================================================="

echo -e "\n[1/3] Auditing 12 Specialized Agent Skills..."
SKILLS_DIR="$PROJECT_ROOT/skills"
EXPECTED_SKILLS=(
    "deadline" "gsd-planner" "gstack-qa" "plan-ceo-review" 
    "plan-eng-review" "plan-design-review" "verification-loop" 
    "cso" "ship" "change-impact" "contract-first" "database-migrations"
)

for skill in "${EXPECTED_SKILLS[@]}"; do
    skill_path="$SKILLS_DIR/$skill/SKILL.md"
    if [ ! -f "$skill_path" ]; then
        echo "Missing skill: $skill at $skill_path" >&2
        exit 1
    fi
    echo "  ✔ Skill verified: $skill"
done

echo -e "\n[2/3] Auditing Templates..."
TEMPLATES_DIR="$PROJECT_ROOT/templates"
for tmpl in "project.md.tmpl" "projectdeadline.md.tmpl" "walkthrough.md.tmpl"; do
    tmpl_path="$TEMPLATES_DIR/$tmpl"
    if [ ! -f "$tmpl_path" ]; then
        echo "Missing template: $tmpl at $tmpl_path" >&2
        exit 1
    fi
    echo "  ✔ Template verified: $tmpl"
done

echo -e "\n[3/3] Running Codebase Omni-Scanner Tests..."
cd "$PROJECT_ROOT/packages/scanner"
node --experimental-strip-types --loader ./scripts/ts-loader.mjs scripts/verify_codebase_scanner.ts

echo -e "\n================================================="
echo "   ALL VERIFICATION GATES PASSED (100% CLEAN)   "
echo "================================================="
