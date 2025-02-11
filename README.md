# Restaurant management API

This is my implementation of the Goomer backend challenge from [Github](https://github.com/goomerdev/job-dev-backend-interview)

## Motivation

As a frontend developer, I haven't really worked on server side code and want to change that.
Since I already work with JavaScript / TypeScript on a daily basis, using a
Node.js solution to get my feet wet seems like a good choice

I'm trying to implemement this repo using Clean Architecture

## Base Stack

- Node.js
- TypeScript
- express.js
- MySQL

## TODO

- [x] CRUD for Restaurants
- [ ] CRUD for Products
- [ ] Ability to add discounts to products
- [ ] Add automated tests with Jest or Vitest
- [ ] Validate date and time for restaurant business hours
- [ ] Documentation in Portuguese
- [ ] Deployment to cloud solution
- [ ] CI/CD using Github actions

## Challenge description - PT_BR

Desafio
A sua API deverá ser capaz de:

- Listar todos os restaurantes
- Cadastrar novos restaurantes
- Listar os dados de um restaurante
- Alterar os dados um restaurante
- Excluir um restaurante
- Listar todos os produtos de um restautante
- Criar um produto de um restaurante
- Alterar um produto de um restaurante
- Excluir um produto de um restaurante
- O cadastro do restaurante precisa ter os seguintes campos:

  - Foto do restaurante
  - Nome do restaurante
  - Endereço do restaurante
  - Horários de funcionamento do restaurante (ex.: De Segunda à Sexta das 09h as 18h e de Sabado à Domingo das 11h as 20h).
  - O cadastro de produtos do restaurante precisa ter os seguintes campos:

- Foto do produto
- Nome do produto
- Preço do produto
- Categoria do produto (ex.: Doce, Salgados, Sucos...)

Quando o Produto for colocado em promoção, precisa ter os seguintes campos:

- Descrição para a promoção do produto (ex.: Chopp pela metade do preço)
- Preço promocional
- Dias da semana e o horário em que o produto deve estar em promoção

Formato de horários

É necessário tratar os campos que indicam horários de funcionamento e horário para as promoções dos produtos.
Os campos devem possuir o formato HH:mm.
Os horários devem possuir intervalo mínimo de 15 minutos.
