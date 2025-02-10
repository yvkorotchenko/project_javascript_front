# Використовуємо офіційний образ для node.js
FROM node:latest AS builder

# Встановлюємо версію npm, яку ви хочете використовувати
RUN npm install -g npm@8.11.0

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install --legacy-peer-deps

# Копіюємо всі інші файли
COPY . ./

# Виконуємо команду для запуску збірки
RUN npm run build

# Використовуємо легкий образ для другого етапу
FROM node:alpine AS deployer

# Створюємо каталог та копіюємо файли з першого образу
RUN mkdir -p /html
RUN ls -la /app
COPY --from=builder /app/build /html


# Тест виводимо вміст скопійованого каталогу
RUN ls -la /html


# Виконуємо команду для запуску сервера розробки
ENTRYPOINT ["npm", "run", "dev"]

