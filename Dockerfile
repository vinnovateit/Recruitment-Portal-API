FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

#Expose port and start application
EXPOSE 3002
CMD [ "node", "app.js" ]