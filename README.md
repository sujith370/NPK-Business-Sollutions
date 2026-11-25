# NPK Business Solutions Pvt Ltd — Company Management Workspace

A responsive front-end prototype for an internal company management platform. It includes dashboard navigation, sample employee/project/task/leave records, interactive task checkboxes, add-record dialogs, table filtering, CSV export, and responsive layouts.

## Run locally
No build step is required:
1. Extract this folder.
2. Open `index.html` in a browser, or run a local server from this folder:
   - Python: `python -m http.server 8000`
   - Visit `http://localhost:8000`

## Important: prototype vs production
This is a front-end prototype using sample data. It does **not** yet provide real user accounts, server-side authorization, a shared database, live attendance, email notifications, or secure company document storage. Do not enter real employee or confidential company data until a production backend and security review are implemented.

## Deployment: static preview
You can publish this prototype as a preview using Netlify Drop:
1. Visit https://app.netlify.com/drop
2. Sign in to your Netlify account.
3. Upload the extracted `npk-business-management` folder (or a ZIP containing `index.html`, `styles.css`, `app.js`, and `assets/` at the root).
4. Netlify will provide a public preview URL.

A static host publishes the prototype only. For a real internal company platform, use a private deployment with HTTPS, a configured backend, PostgreSQL, secure authentication, backups, and restricted access. Do not publicly expose sensitive employee data.

## Production starter
The `backend/` directory includes a minimal FastAPI health-check starter and requirements. It is not yet a complete production API and should not be exposed with employee data before authentication, authorization, database migrations, audit logging, validation, and deployment hardening are implemented.

## Branding
The supplied company logo is included at `assets/npk-logo.jpg` and displayed in the sidebar and top navigation. The same logo is used as the browser favicon. The logo image is kept in its original aspect ratio.
