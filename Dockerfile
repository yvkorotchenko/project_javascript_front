# Використовуємо офіційний образ для node.js
FROM node:latest AS builder

# Встановлюємо версію npm, яку ви хочете використовувати
RUN npm install -g npm@8.11.0

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci --legacy-peer-deps

# Копіюємо всі інші файли
COPY . ./

# Виконуємо команду для запуску збірки
RUN npm run build

# Використовуємо легкий образ для другого етапу
FROM nginx:alpine AS deployer

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

