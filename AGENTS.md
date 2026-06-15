# Permanent Asset Protection Rules

You MUST strictly adhere to the following file preservation and lock policies:

## ⚠️ Favicon and PWA Asset Lock
The favicon and PWA brand configuration files have been finalized as frozen, manually-refined production assets. Under NO circumstances are you to delete, replace, regenerate, overwrite, rename, move, edit, or modify any of the following files:

- `/public/favicon.ico`
- `/public/favicon-16x16.png`
- `/public/favicon-32x32.png`
- `/public/apple-touch-icon.png`
- `/public/android-chrome-192x192.png`
- `/public/android-chrome-512x512.png`
- `/public/site.webmanifest`

## Guidelines for Future Updates
When modifying any part of the repository (including movies, web series, download handlers, stream/detail/watch components, SEO modules, ads, search systems, category logic, layout, routing, headers/footers, or analytics):
1. **Never Touch Favicon Files**: Leave the physical files listed above completely untouched.
2. **Leave Head References Intact**: Keep all favicon, Web Manifest, PWA, and metadata tags in `/index.html` exactly as they are.
3. **No Automated Script Overwrites**: Never invoke or create script pipelines (e.g., in `/scripts/` or elsewhere) that rebuild or override these locked files.
