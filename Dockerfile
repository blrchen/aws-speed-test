# Stage 1: Build the Angular SSR application
FROM node:22-alpine AS build
WORKDIR /app
COPY ["ui/package.json", "ui/package-lock.json*", "./"]
RUN npm ci
COPY ui/ .
RUN npm run build

# Stage 2: Production Node.js server for SSR
FROM node:22-alpine AS production
WORKDIR /app

# Copy the built application (both server and browser bundles)
COPY --from=build /app/dist/aws-speed-test ./dist/aws-speed-test

# Copy package files for production dependencies
COPY --from=build /app/package.json /app/package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Azure Web App uses PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Run the SSR server
CMD ["node", "dist/aws-speed-test/server/server.mjs"]
