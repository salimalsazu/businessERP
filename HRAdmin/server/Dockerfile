# Use an official Node.js runtime as a parent image
FROM node:20.11.1-alpine3.19

# Set the working directory
WORKDIR /app

# Copy dependency definitions
COPY package.json yarn.lock ./

# Copy Prisma directory
COPY prisma ./prisma/

# Copy environment variables
COPY .env ./

# Copy TypeScript config
COPY tsconfig.json ./

# Install dependencies
RUN yarn install

# Copy the entire project
COPY . .

# Expose port 7000
EXPOSE 7000

# Build the project
RUN yarn build

# Run Prisma migrations
CMD yarn startmigrate
