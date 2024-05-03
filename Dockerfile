# base image to use
FROM node:20
RUN apt-get update

# set the base directory for the rest of the dockerfile
WORKDIR /app

# install & cache dependencies first
COPY package*.json ./
RUN npm install
# dependencies cached as layer

# copy all files except stated in .dockerignore
COPY . .

# set env vars to process.env.PORT
# port IN docker
ENV PORT=8080

# port forwarding to expose to outside container, but need run 8081:8080 to expose 8081 to outside
EXPOSE 8080

# only one in each dockerfile
# in exec form
CMD ["npm", "start"]