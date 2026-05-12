# Sistema de Auto RU

Este projeto utiliza um banco de dados relacional MySQL.

## Tecnologias

- MySQL
- DBeaver

## Banco de Dados

O banco é composto pelas seguintes entidades:

- Usuario
- Aluno
- Professor
- Funcionario
- Produto
- Pedido
- Item_Pedido

## Relacionamentos

- Usuario 1:1 Aluno/Funcionario/Professor
- Usuario 1:1..N Pedido
- Forma_de_Pagamento 1:1..N Pedido
- Pedido 1:1..N Item_Pedido
- Item_Pedido 1..N:1 Produto
- Produto 1..N:0..1 Fornecedor
