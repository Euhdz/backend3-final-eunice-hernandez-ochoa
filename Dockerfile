FROM node

WORKDIR /app

COPY package.json . 

RUN npm install 

COPY . . 

EXPOSE 8080

CMD [ "npm", "start" ]


#Después en la console escribimos: docker build -t dockeroperations .

