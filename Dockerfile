# Stage 1: Build the Angular static application
FROM node:22-alpine AS build
WORKDIR /app
COPY ["ui/package.json", "ui/package-lock.json*", "./"]
RUN npm ci --no-audit --fund=false
COPY ui/ .
RUN npm run build

# Stage 2: Nginx static file server
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/aws-speed-test/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
