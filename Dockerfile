#How to run : docker build --build-arg envFile=.env.staging .

#Build Stage Start
FROM node:18-alpine as builder 

RUN apk update && apk upgrade && apk add --no-cache git

#Specify a working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN yarn install --production=true --silent

#Copy remaining files
COPY . .

#Build the project for production
RUN yarn run build 

# #Run Stage Start
FROM nginx:alpine

#Copy production build files from builder phase to nginx
COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
