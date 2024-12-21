# Stage 1: Build the UI
FROM node:20-alpine AS ui-build
WORKDIR /app
COPY ["ui/package.json", "ui/package-lock.json*", "./"]
RUN npm install
COPY ui/ .
RUN npm run build

# Stage 2: Set up Nginx to serve the UI
FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# Copy production bundle from Stage 1
COPY --from=ui-build /app/dist/aws-speed-test/browser /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
