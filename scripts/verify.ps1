# Deadline Daemon — Complete System Verification Harness

$ErrorActionPreference = "Stop"
$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptRoot

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   Deadline Daemon Verification & Quality Gate   " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# 1. Skill Suite Verification
Write-Host "`n[1/3] Auditing 12 Specialized Agent Skills..." -ForegroundColor Yellow
$skillsDir = Join-Path $ProjectRoot "skills"
$expectedSkills = @(
    "deadline", "gsd-planner", "gstack-qa", "plan-ceo-review", 
    "plan-eng-review", "plan-design-review", "verification-loop", 
    "cso", "ship", "change-impact", "contract-first", "database-migrations"
)

foreach ($skill in $expectedSkills) {
    $skillPath = Join-Path $skillsDir (Join-Path $skill "SKILL.md")
    if (-not (Test-Path $skillPath)) {
        Write-Error "Missing skill: $skill at $skillPath"
        exit 1
    }
    $content = Get-Content $skillPath -Raw
    if ($content -notmatch "(?m)^---[\r\n]+name:\s*$skill") {
        Write-Error "Skill $skill has invalid frontmatter"
        exit 1
    }
    Write-Host "  [+] Skill verified: $skill" -ForegroundColor Green
}

# 2. Template Verification
Write-Host "`n[2/3] Auditing Templates..." -ForegroundColor Yellow
$templatesDir = Join-Path $ProjectRoot "templates"
$expectedTemplates = @("project.md.tmpl", "projectdeadline.md.tmpl", "walkthrough.md.tmpl")

foreach ($tmpl in $expectedTemplates) {
    $tmplPath = Join-Path $templatesDir $tmpl
    if (-not (Test-Path $tmplPath)) {
        Write-Error "Missing template: $tmpl at $tmplPath"
        exit 1
    }
    Write-Host "  [+] Template verified: $tmpl" -ForegroundColor Green
}

# 3. Codebase Omni-Scanner Engine Verification
Write-Host "`n[3/3] Running Codebase Omni-Scanner Tests..." -ForegroundColor Yellow
$scannerDir = Join-Path $ProjectRoot "packages\scanner"
Push-Location $scannerDir
try {
    node --experimental-strip-types --loader ./scripts/ts-loader.mjs scripts/verify_codebase_scanner.ts
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Codebase Scanner tests failed with exit code $LASTEXITCODE"
        exit 1
    }
} finally {
    Pop-Location
}

Write-Host "`n=================================================" -ForegroundColor Cyan
Write-Host "   ALL VERIFICATION GATES PASSED (100% CLEAN)   " -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
