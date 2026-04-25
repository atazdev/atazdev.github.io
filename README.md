# atazdev.github.io

Personal website and technical journal built with Jekyll, based on the Beautiful Jekyll theme, with a separate Vite dashboard prototype.

## About

- Cybersecurity professional with leadership experience across technical, operational, and strategic environments.
- Certified Information Systems Security Professional (CISSP).

For the full bio and details, see [aboutme.md](aboutme.md).

## Project Structure

```text
.
|-- _config.yml                  # Main Jekyll site configuration
|-- index.html                   # Home page entry point
|-- aboutme.md                   # About page content
|-- tags.html                    # Tag index page
|-- 404.html                     # Not-found page
|-- feed.xml                     # RSS feed template
|-- CNAME                        # Custom domain configuration
|
|-- _posts/                      # Blog post Markdown files
|-- _layouts/                    # Jekyll page, post, and home layouts
|-- _includes/                   # Shared HTML partials such as nav and footer
|-- _data/                       # Theme/site data files
|
|-- assets/                      # Site CSS, images, JavaScript, and static assets
|   `-- css/                     # Beautiful Jekyll and custom styling
|
|-- dashboard/                   # Separate Vite-based dashboard prototype
|   |-- src/                     # Dashboard source files
|   |-- vite.config.js           # Dashboard Vite config
|   `-- package.json             # Dashboard dependencies and scripts
|
|-- .stitch/                     # Stitch design-system source of truth
|-- DESIGN.md                    # Design notes and direction
|
|-- .github/workflows/           # GitHub Actions deployment workflows
|-- Dockerfile                   # Container build for local/server deployment
|-- docker-compose.yml           # Docker Compose setup
|-- nginx.conf                   # Nginx configuration
|-- DOCKER.md                    # Docker usage notes
|-- Gemfile                      # Ruby/Jekyll dependencies
|-- beautiful-jekyll-theme.gemspec
|-- staticman.yml                # Staticman comment configuration
|-- CHANGELOG.md
|-- LICENSE
`-- README.md
```

## Blog Posts

Blog posts live in `_posts/` and follow Jekyll's date-prefixed filename convention:

```text
YYYY-MM-DD-post-title.md
```

Featured examples:

- `2021-09-11-market toolkit.md` - curated investing and market research resources.
- `2025-10-12-System design101.md` - system design guides and architecture case studies.
- `2026-01-27-gitops-modern-age.md` - GitOps and modern delivery practices.

## Design System

The current visual direction is documented in [.stitch/DESIGN.md](.stitch/DESIGN.md): a quiet technical journal with dark surfaces, restrained accents, and readable editorial hierarchy.
