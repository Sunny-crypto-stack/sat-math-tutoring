# sunnypreps. website

This repository contains the static assets for the sunnypreps. marketing site.

## Make the site accessible to everyone

Because the project is a static site (HTML, CSS, and JavaScript only), you can host it on any static web host. Below are two common options.

### Option 1: GitHub Pages (free)

1. Commit and push this repository to GitHub.
2. In the GitHub project, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch** and select the `main` (or default) branch, with the root directory (`/`).
4. Click **Save**. GitHub Pages will publish the site at `https://<your-account>.github.io/<repository-name>/`.
5. Update internal links if you want to point to the full GitHub Pages URL.

### Option 2: Netlify (free tier available)

1. Create a free account at [Netlify](https://www.netlify.com/).
2. In the Netlify dashboard, click **Add new site → Import an existing project**.
3. Connect to your Git provider and select this repository.
4. Leave the build command blank and set the publish directory to the repository root (`/`).
5. Deploy. Netlify assigns a public URL (e.g., `https://sunnypreps.netlify.app/`) that you can customize.

### Custom domain

Both GitHub Pages and Netlify let you add your own domain name. Follow their documentation to point a domain (such as `sunnypreps.com`) to the deployed site.

## Local development

To preview changes locally before deploying:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser and stop the server with `Ctrl+C` when finished.
