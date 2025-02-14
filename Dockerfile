# Use Node.js 20 slim image as the base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
