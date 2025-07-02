Build the Docker Image:
Open your terminal or command prompt, navigate to your project's root directory (where Dockerfile is located), and run the following command:



docker build -t codebase-to-pdf-app 

This command builds a Docker image and tags it as codebase-to-pdf-app.

Run the Docker Container:
Once the image is built, you can run it as a container:

Bash

docker run -p 5173:5173 codebase-to-pdf-app

-p 5173:5173: This maps port 5173 on your host machine to port 5173 inside the Docker container. Since Vite runs on port 5173, this allows you to access the app from your browser.
