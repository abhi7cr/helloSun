# Create image based on the official Node 6 image from dockerhub
FROM node:7.6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

#Generate SSL certificate for Https connection
RUN openssl genrsa -out key.pem && \
    openssl req -new -key key.pem -out csr.pem \
      -subj "/C=US/ST=Illinois/L=Chicago/O=DragonSpears/OU=IT Department/CN=ec2-34-201-30-180.compute-1.amazonaws.com" && \
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -sha256 -extfile v3.ext -out appcert.pem  && \
    rm csr.pem

# Expose the port the app runs in
EXPOSE 443 80 1234


# Serve the app
CMD ["npm", "start"]
