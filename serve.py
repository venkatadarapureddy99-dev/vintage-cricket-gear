"""serve.py - a tiny local web server so you can preview the site.

Why do we need a server at all? Browsers can open index.html directly, but
real websites are always delivered over HTTP. Previewing through a server
behaves like production (paths, caching, fonts) and avoids odd browser
restrictions on local files.

Run it with:   python3 serve.py
Then open:     http://localhost:8000
Stop it with:  Ctrl + C
"""

import http.server      # Python's built-in web server tools (no installs needed)
import socketserver     # lets the server handle requests over a TCP port
import os               # used to make sure we serve THIS folder

PORT = 8000  # the "door number" the server listens on; change it if 8000 is busy

# Serve files from the folder this script lives in, regardless of where you ran it from
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    """Same as the default handler, but tells the browser not to cache files,
    so every edit you make in VS Code shows up on refresh."""

    def end_headers(self):
        # Headers are instructions sent along with each file; this one disables caching
        self.send_header("Cache-Control", "no-store")
        super().end_headers()  # then let the parent class finish the response normally


socketserver.TCPServer.allow_reuse_address = True  # lets you restart quickly without "address in use" errors

with socketserver.TCPServer(("", PORT), NoCacheHandler) as server:
    print(f"Vintage Cricket Gear preview running at http://localhost:{PORT}  (Ctrl+C to stop)")
    try:
        server.serve_forever()  # keep handling requests until you stop it
    except KeyboardInterrupt:
        print("\nServer stopped.")
