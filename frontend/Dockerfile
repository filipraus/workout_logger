FROM node:14.18.1
WORKDIR /app/backend/frontend

COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts@4.0.3 -g

COPY . ./

EXPOSE 3000