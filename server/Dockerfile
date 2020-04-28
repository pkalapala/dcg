FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#EXPOSE 3600
ENV env dev

CMD [ "npm", "start", "${env}" ]

# RUN the following command in the terminal
# docker run -it -p 9000:5000 -e env=env=development dcg-actual-server