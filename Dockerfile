# Use a Node.js image as the base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on (if it's a dev server, Vite typically uses 5173)
EXPOSE 5173

# Command to run the application (for development, you'd use 'npm run dev')
CMD ["npm", "run", "dev"]