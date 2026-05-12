# Modelo de Banco de Dados

## Visão Geral

O banco foi modelado para um sistema de gestão com usuários, pedidos e produtos.

---

## Entidades

### Usuario

- id (PK)
- nome
- email
- senha

### Aluno

- id_usuario (PK, FK → Usuario.id)
- ra

### Professor

- id_usuario (PK, FK → Usuario.id)
- cod_prof

### Funcionario

- id_usuario (PK, FK → Usuario.id)

### Produto

- id_produto (PK)
- nome
- descricao
- preco_unitario
- quantidade_estoque
- id_fornecedor (FK)

### Pedido

- id_pedido (PK)
- id_usuario (FK)
- id_forma_pagamento (FK)
- data
- preco_total

### Item_Pedido

- id_item_pedido (PK)
- id_pedido (FK)
- id_produto (FK)
- quantidade
- preco_unitario

---

## Relacionamentos

- Usuario 1:1 Aluno/Funcionario/Professor
- Usuario 1:1..N Pedido
- Forma_de_Pagamento 1:1..N Pedido
- Pedido 1:1..N Item_Pedido
- Item_Pedido 1..N:1 Produto
- Produto 1..N:0..1 Fornecedor
