Wrong Chat server upload package — #73

Contents:
- server73.js: self-contained Wrong Chat v4.2.7 server with the matching web bundle and APK embedded. Long strings are split into short literals for mobile GitHub upload compatibility.
- index.js: auto-loader that selects the highest-version server*.js file (server73.js wins at v4.2.7).
- package.json: npm start entry point and dependencies.

Place extracted files in the Render service's configured root directory, commit to GitHub, and verify /api/health reports version 4.2.7 and apkVersionCode 74. Uploading the ZIP as a single file does not deploy/extract its contents.
