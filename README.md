# EmpowerLife4U — Free Static Deployment

This version is prepared for free static hosting.

## What was fixed
- Removed Manus-only runtime and storage dependencies.
- Removed the Node/Express/database requirement for the public website.
- Replaced missing `/manus-storage/...` images with bundled local assets.
- Contact form now opens WhatsApp with the enquiry pre-filled.
- Added Netlify SPA fallback for workout detail URLs.
- Simplified the project to plain JavaScript + Vite.
- Removed unused backend/database files and dependencies.

## Local setup

Requirements: Node.js 20.19+ (or a current supported Node.js release).

```bash
npm install
npm run dev
```

Open the URL shown by Vite.

## Netlify

1. Upload this project to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Select the GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

Netlify will provide a free `*.netlify.app` URL. A custom domain can be connected later.

## Important

The old private owner inquiry dashboard depended on the original Manus backend/database and has intentionally been removed from this free static version. Public enquiries are sent through WhatsApp instead.
