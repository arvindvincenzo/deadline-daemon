---
name: gstack-qa
description: Live runtime visual QA and physical ergonomics auditor. Drives real browser (Playwright) or mobile ADB hardware screen inspection to verify zero RenderFlex stripes, zero clipped text, and >=48x48dp touch targets.
---

# Runtime Visual QA — Live Ergonomics & Screen Auditor

The **gstack-qa** skill performs black-box and visual verification on real executing runtimes (web browsers, mobile hardware, desktop instances).

Passing unit tests only prove that code runs; **this skill proves that the software looks right, feels right, and functions reliably for real users.**

---

## When to Use
- Before marking any front-end milestone complete in `projectdeadline.md`.
- After deploying an app build to a live mobile device (e.g. via wireless ADB) or web server.
- To detect `RenderFlex` overflows, truncated text, or broken interactive touch targets.

---

## Runtime Verification Modes

### Mode A: Mobile ADB Hardware Screen Inspection
Used when targeting Android/Flutter hardware (e.g. connected via `adb connect <device-ip>`):
1. **Dump UI Hierarchy**:
   ```bash
   adb exec-out uiautomator dump /dev/tty
   ```
2. **Parse XML Node Bounds `[x1,y1][x2,y2]`**:
   - Calculate width $W = x_2 - x_1$ and height $H = y_2 - y_1$.
   - Confirm all clickable elements satisfy $W \ge 48\text{dp}$ and $H \ge 48\text{dp}$.
3. **Scan Logcat for Layout Hazards**:
   ```bash
   adb logcat -d | grep -E "(RenderFlex overflowed|A RenderFlex overflowed by)"
   ```
   - Must report **ZERO occurrences**.
4. **Scan for Clipped Text**:
   - Ensure text nodes do not end with truncated ellipsis (`...`) due to missing `Expanded` or `SingleChildScrollView`.

### Mode B: Real Browser / Playwright Web QA
Used when targeting web applications:
1. Navigate to target URL and capture full-page screenshot.
2. Check browser console logs for uncaught JavaScript exceptions or 404/500 network failures.
3. Verify Cumulative Layout Shift (CLS) is $< 0.1$.
4. Test active click handlers, input focus states, and responsive breakpoints (mobile, tablet, desktop).

---

## Output Report Format: Runtime QA Certification

```markdown
### 📱 Live Runtime QA Certification

- **Target Runtime**: [Mobile ADB Device (192.168.1.2:38337) / Web Browser (Playwright)]
- **RenderFlex Hazard Stripes**: 0 (CLEAN)
- **Clipped / Truncated Text**: 0 (CLEAN)
- **Minimum Touch Bounds**: All interactive elements >= 48x48dp (PASSED)
- **Console / Logcat Errors**: 0 unhandled exceptions

#### Runtime QA Verdict
- [ ] **CERTIFIED**: Visual hierarchy, physical ergonomics, and interaction flows verified on real device.
- [ ] **DEFECT DETECTED**: Layout overflow, broken touch target, or crash detected (remediation required).
```
