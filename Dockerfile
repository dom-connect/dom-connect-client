# Stage 1: Сборка приложения
FROM node:22-bullseye AS builder
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимостии
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем проект
RUN yarn build

# Stage 2: Продакшен-образ
FROM node:22-alpine
WORKDIR /app

# Создаем непривилегированного пользователя
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Копируем собранное приложение
COPY --from=builder /app/.output ./

# Настройка переменных окружения
ENV NODE_ENV=production

# Устанавливаем только production зависимости
RUN yarn install --production --frozen-lockfile

# Настройка прав доступа
RUN chown -R appuser:appgroup /app
USER appuser

# Открываем порт
EXPOSE 3000

# Запуск сервера
CMD ["node", "server/index.mjs"]
