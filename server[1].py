#!/usr/bin/env python3
"""
HerHub - Intelligent Opportunity-Discovery Platform
Local Web Server & REST API Provider
Built with Python standard library (zero external dependencies).
"""

import os
import sys
import json
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Set directory to this script's directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

# Fix Windows console UTF-8 output if possible
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Data files
DATA_FILE = os.path.join(BASE_DIR, 'data.js')
STORAGE_FILE = os.path.join(BASE_DIR, 'user_state.json')

class HerHubHTTPHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for live development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/' or path == '':
            self.path = '/index.html'
            return super().do_GET()

        if path == '/api/health':
            self.send_json_response({"status": "healthy", "service": "HerHub API", "version": "1.0.0"})
            return

        if path == '/api/profile':
            profile = self.load_user_profile()
            self.send_json_response(profile)
            return

        # Serve static files
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/profile':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                self.save_user_profile(data)
                self.send_json_response({"status": "success", "profile": data})
            except Exception as e:
                self.send_json_response({"status": "error", "message": str(e)}, code=400)
            return

        self.send_json_response({"error": "Endpoint not found"}, code=404)

    def send_json_response(self, data, code=200):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode('utf-8'))

    def load_user_profile(self):
        default_profile = {
            "name": "Bhumika",
            "education": "Engineering",
            "branch": "Computer Science",
            "year": "2nd Year",
            "college": "National Institute of Technology",
            "location": "India",
            "cgpa": 8.1,
            "skills": ["C", "Python"],
            "interests": ["AI", "Technology"],
            "goals": ["Internship", "Hackathon", "Learning"],
            "budgetPreference": "Free / ₹0"
        }
        if os.path.exists(STORAGE_FILE):
            try:
                with open(STORAGE_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                pass
        return default_profile

    def save_user_profile(self, profile):
        with open(STORAGE_FILE, 'w', encoding='utf-8') as f:
            json.dump(profile, f, indent=2)

def run_server(port=8080):
    server_address = ('127.0.0.1', port)
    
    # Try preferred port, fallback if in use
    for test_port in [port, 8081, 8082, 3000, 5000]:
        try:
            httpd = HTTPServer(('127.0.0.1', test_port), HerHubHTTPHandler)
            print(f"==================================================")
            print(f"✨ HerHub Web Application Server Running!")
            print(f"🌐 Local URL: http://127.0.0.1:{test_port}")
            print(f"📁 Serving: {BASE_DIR}")
            print(f"==================================================")
            sys.stdout.flush()
            httpd.serve_forever()
            return
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 10048:
                continue
            raise

if __name__ == '__main__':
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port)
