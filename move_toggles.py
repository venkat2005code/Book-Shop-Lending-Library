import os
import glob

html_files = ["about.html", "catalog.html", "contact.html", "events.html", "home2.html", "index.html", "services.html"]

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r') as f:
        content = f.read()
    
    header_controls_block = """            <div class="header-controls">
                <button id="themeToggle" class="toggle-btn" aria-label="Toggle Dark Mode">
                    <i class="fa-solid fa-moon"></i>
                </button>
                <button id="dirToggle" class="btn btn-outline lang-toggle" aria-label="Toggle Text Direction">
                    LTR
                </button>
            </div>"""
    
    if header_controls_block in content:
        content = content.replace(header_controls_block + "\n", "")
        content = content.replace(header_controls_block, "")
        
        insert_target = "                </ul>\n            </nav>"
        
        li_wrapper = """                    <li class="nav-toggles-item">
                        <div class="header-controls">
                            <button id="themeToggle" class="toggle-btn" aria-label="Toggle Dark Mode">
                                <i class="fa-solid fa-moon"></i>
                            </button>
                            <button id="dirToggle" class="btn btn-outline lang-toggle" aria-label="Toggle Text Direction">
                                LTR
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>"""
        
        if insert_target in content:
            content = content.replace(insert_target, li_wrapper)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Moved controls in {file}")
        else:
            print(f"Could not find insert target in {file}")
    else:
        print(f"Could not find header controls block in {file}")

