# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Copy static asset (portfolio.json) into the dist folder
RUN mkdir -p dist/api/data && cp src/api/data/portfolio.json dist/api/data/

# Expose port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
