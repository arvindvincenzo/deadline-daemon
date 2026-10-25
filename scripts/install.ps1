# Deadline Engine — Automated Installer for Windows / Antigravity / Claude Code

param(
    [string]$TargetDir = "$HOME\.gemini\config\skills"
)

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Installing Deadline Engine & Skill Matrix  " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$SourceSkillsDir = Join-Path (Split-Path -Parent $ScriptRoot) "skills"

if (-not (Test-Path $SourceSkillsDir)) {
    Write-Error "Source skills directory not found at $SourceSkillsDir"
    exit 1
}

if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

$skills = Get-ChildItem -Path $SourceSkillsDir -Directory

foreach ($skill in $skills) {
    $dest = Join-Path $TargetDir $skill.Name
    if (-not (Test-Path $dest)) {
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
    }
    Copy-Item -Path (Join-Path $skill.FullName "SKILL.md") -Destination (Join-Path $dest "SKILL.md") -Force
    Write-Host "  [+] Installed skill: $($skill.Name)" -ForegroundColor Green
}

Write-Host "`nAll 12 skills successfully installed into $TargetDir!" -ForegroundColor Cyan
Write-Host "To use, run: 'use the deadline skill' or type '/plan' in Antigravity or Claude Code." -ForegroundColor Yellow
