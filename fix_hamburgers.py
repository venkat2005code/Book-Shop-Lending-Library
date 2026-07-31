import os
import glob

html_files = ["about.html", "catalog.html", "contact.html", "events.html", "home2.html", "index.html", "services.html"]

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r') as f:
            content = f.read()
        
        # Check if already added
        if 'id="mobileToggle"' not in content:
            # We look for the closing of header-controls and insert it there.
            # In index.html, it looks like:
            #             </div>
            #         </div>
            #     </header>
            
            # A safer string to replace:
            #             </div>
            #         </div>
            #     </header>
            
            # Let's find:
            #             <div class="header-controls">
            # and append the button next to it? No, it's safer to append it after header-controls.
            
            # Let's just find `</header>` and replace it with:
            #     <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu" style="position: absolute; right: 2rem; top: 1.5rem;"><i class="fa-solid fa-bars"></i></button>
            #     </header>
            # But wait, we can just replace:
            #     </header>
            # with
            #             <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
            #         </div>
            #     </header>
            # wait, that's brittle.
            
            # Let's just insert it right after `<div class="header-controls"> ... </div>` inside `.nav-container`.
            search_str = '            </div>\n        </div>\n    </header>'
            replace_str = '            </div>\n            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>\n        </div>\n    </header>'
            
            if search_str in content:
                content = content.replace(search_str, replace_str)
                with open(file, 'w') as f:
                    f.write(content)
                print(f"Fixed {file}")
            else:
                print(f"Could not find exact match in {file}")

