Here’s a more user-friendly and modern version of your README snippet, with clear steps, formatting, and tips:

---

## 🚀 Getting Started

### 1. Build the Docker Image

Open your terminal, navigate to the root directory of your project (where the `Dockerfile` is located), and run:

```bash
docker build -t codebase-to-pdf-app .
```

This command creates a Docker image named `codebase-to-pdf-app`.

---

### 2. Run the Docker Container

Once the image has been built, start the application with:

```bash
docker run -p 5173:5173 codebase-to-pdf-app
```

- The flag `-p 5173:5173` maps port **5173** of your computer to the container, so you can access the app in your browser.
- By default, Vite runs on port 5173.

---

### 3. Access the App

Open your browser and go to:

```
http://localhost:5173
```

You should now see the app running!

---

#### 💡 Tips

- Make sure Docker is installed and running on your machine.
- If port 5173 is already in use, you can change it by modifying the run command, e.g., `-p 8080:5173`.
- For troubleshooting, check Docker logs with `docker logs <container_id>`.

---


