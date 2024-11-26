# Step 1: Use Node.js image as base
FROM node:18

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all other files
COPY . .

# Step 5: Expose the port
EXPOSE 5000

# Step 6: Run the server
CMD ["node", "server.js"]
