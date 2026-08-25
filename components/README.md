# Components

Each file here is a small, standalone, valid HTML5 document that isolates
one reusable pattern from the dashboard so it can be reviewed (and
validated) on its own. The real pages (`index.html`,
`pages/users.html`, `pages/reports.html`) compose these same patterns
together.

| File | Pattern | Key accessibility features |
|------|---------|----------------------------|
| `header-nav.html` | Page header + primary nav + user menu | `role="banner"`, `aria-current="page"`, disclosure widget (`aria-haspopup`, `aria-expanded`, `aria-controls`) |
| `sidebar-nav.html` | Section sidebar navigation | `<aside>` landmark, grouped `<h2>` headings, `aria-current="page"` (not color alone) |
| `data-table.html` | Data table | `<caption>`, `<th scope="col">` / `<th scope="row">`, `aria-sort`, status shown with text + color |
| `accessible-form.html` | Form controls | `<label for>` on every control, `<fieldset>`/`<legend>` grouping, `required` + `aria-required`, `pattern`/`minlength`, hints wired with `aria-describedby` |
| `modal-dialog.html` | Modal dialog | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap + Escape-to-close + focus return (`js/modal.js`) |

## Design tokens

Shared visual language lives in `css/main.css`: an ink/paper color system,
a "status rail" (colored left border) used consistently on stat cards,
table status pills, and sidebar highlighting to signal
good/watch/risk states with both color and text, and a visible
`:focus-visible` outline (`--focus-ring`) applied globally rather than
suppressed.

## Validating

Each component file and each page is a complete, standalone HTML5
document, so any of them can be pasted directly into
[the W3C Nu HTML Checker](https://validator.w3.org/nu/) or checked with
`npx html-validate index.html pages/*.html components/*.html` (see the
root `README.md` for the exact command).
