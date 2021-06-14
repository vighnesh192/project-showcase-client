# pull official base image
FROM node:12.22-alpine

# set working directory
WORKDIR /project-showcase-client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /project-showcase-client/node_modules/.bin:$PATH

# copy app dependencies
COPY package*.json ./

# install app dependencies
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]