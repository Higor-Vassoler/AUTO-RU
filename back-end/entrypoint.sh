#!/bin/sh

echo "Executando migrations"

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

echo "Iniciando servidor"

npm run dev