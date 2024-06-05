# Use official Node.js image as the base image
FROM node:14

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the application using serve
CMD ["serve", "-s", ".", "-l", "8080"]
