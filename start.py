import subprocess
import sys
import time
import os

def main():
    print("=" * 60)
    print("Starting Angelo University Web Application & AI Chatbot")
    print("Powered by ReactJS, Django REST Framework, and Gemini 3.5 Flash")
    print("=" * 60)

    # 1. Run migrations and seed data
    print("\n[1/3] Ensuring database is up-to-date...")
    subprocess.run([sys.executable, "manage.py", "migrate"], check=True)
    subprocess.run([sys.executable, "manage.py", "seed_data"], check=True)

    # 2. Start Django backend server
    print("\n[2/3] Starting Django REST Backend on http://127.0.0.1:8000 ...")
    backend_proc = subprocess.Popen([sys.executable, "manage.py", "runserver", "8000"])

    # 3. Start Frontend dev server
    print("\n[3/3] Starting Vite React Frontend on http://localhost:3000 ...")
    frontend_proc = subprocess.Popen(
        ["npm.cmd", "run", "dev"],
        cwd=os.path.join(os.path.dirname(__file__), "frontend"),
        shell=True
    )

    print("\n" + "=" * 60)
    print("Application successfully launched!")
    print("Frontend URL: http://localhost:3000")
    print("Backend API:  http://127.0.0.1:8000/api/")
    print("Admin Portal: http://127.0.0.1:8000/admin/ (admin / angelo_admin_2026)")
    print("=" * 60)
    print("Press Ctrl+C to stop both servers.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Servers stopped.")

if __name__ == "__main__":
    main()
