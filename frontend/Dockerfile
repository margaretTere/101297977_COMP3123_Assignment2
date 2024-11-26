# Step 1: Use Node.js image as base
FROM node:14

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all other files
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Serve the React app using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Step 7: Expose the port
EXPOSE 3000
