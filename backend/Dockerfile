# Use Node.js image
FROM node:22

# Create working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose backend port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]