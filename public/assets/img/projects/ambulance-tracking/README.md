# Ambulance Tracking — project photos

The Works section reads these three files (paths are defined in
`utils/projectsData.js` under the `ambulance-tracking` project):

| File                   | Photo                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| `rig-windshield.jpg`   | Portrait shot looking through the windshield, rig + its reflection |
| `rig-dashboard.jpg`    | Portrait shot with the Tesla display and Seaport Blvd nav visible  |
| `camera-closeup.jpg`   | Landscape close-up of the Pi Camera Module and 5MP CS lens         |

Drop the JPEGs in with exactly these names and the gallery picks them up — no
code change needed. Any file that is missing is skipped at render time, so the
modal never shows a broken image frame.

Keep them reasonably sized (≈1600px on the long edge, under ~400KB each) since
they are served straight from `public/` without optimization.
