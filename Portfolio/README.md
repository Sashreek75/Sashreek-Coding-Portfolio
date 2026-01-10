# sashreek — Neuro-AI Portfolio

A minimal Python + Tailwind portfolio built with Flask.

Quick start

1. Create a virtual environment and activate it (Windows PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the app:

```powershell
python app.py
```

Open http://127.0.0.1:5000 in your browser.

Files of interest

- `app.py` — Flask application
- `templates/` — Jinja2 templates using Tailwind CDN
- `data/projects.json` — sample project entries

Next steps

- Replace sample projects with real projects and links.
- Optionally build Tailwind locally for production.
- Add tests and CI for deployment.
