import os
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
    
    if '<a href="#" class="logo">' in content:
        content = content.replace('<a href="#" class="logo">', '<a href="index.html" class="logo">')
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
    elif '<a href="index.html" class="logo">' in content:
        print(f"Already correct in {file}")
    else:
        print(f"Logo pattern not found in {file}")

