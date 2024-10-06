# Stage 1: Build the UI
FROM node:20-alpine AS ui-build
WORKDIR /app

# Copy package.json and package-lock.json files for better caching
COPY package*.json ./

# Install npm packages
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Set up Nginx to serve the UI
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# Copy production bundle from Stage 1
COPY --from=ui-build /app/dist/aws-speed-test/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
