from pathlib import Path

root = Path(r"c:\Users\tyler_0f9umdz\zaukus-website")
replacements = [
    ('`n', '\n'),
    ('â€™', '’'),
    ('â€œ', '“'),
    ('â€', '”'),
    ('â€”', '—'),
    ('â€¹', '‹'),
    ('â€º', '›'),
    ('â†’', '→'),
    ('â˜…', '★'),
    ('Ã—', '×'),
    ('â€', '“'),
    ('ï»¿', ''),
    ('Â', ''),
]

for path in root.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in {'.html', '.css', '.js', '.txt', '.md'}:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    updated = text
    for old, new in replacements:
        updated = updated.replace(old, new)

    if path.suffix.lower() == '.html':
        if 'fieldd.me/lead-form' not in updated:
            updated = updated.replace('</title>', '</title>\n    <script type="text/javascript" src="https://fieldd.me/lead-form"></script>', 1)
        if 'fieldd-lead-form' not in updated and 'contact' in path.name.lower():
            marker = '    <main>'
            form_block = '''    <section class="section">
      <div class="container">
        <div class="card-grid">
          <article class="service-card">
            <h3>Book Online</h3>
            <p>Use the live Fieldd lead form below to request your appointment.</p>
            <fieldd-lead-form code="5Hx4Xp"></fieldd-lead-form>
          </article>
          <article class="service-card">
            <h3>Call or Message</h3>
            <p>Reach out directly at (615) 339-9763 or brianz@zaukusmobiledetailing.com.</p>
          </article>
          <article class="service-card">
            <h3>Service Area</h3>
            <p>We serve La Vergne and neighboring areas throughout Middle Tennessee.</p>
          </article>
        </div>
      </div>
    </section>

'''
            if marker in updated:
                updated = updated.replace(marker, form_block + marker, 1)

    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.relative_to(root)}')
