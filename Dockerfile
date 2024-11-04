# Stage 1: Build the Vite + React + TypeScript application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies, including TypeScript
COPY package.json package-lock.json ./
RUN npm install && npm install typescript -g

# Copy all other files and build the application
COPY . .
RUN npm run build  # This runs `vite build`, creating a production build in `dist/`

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy custom Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
