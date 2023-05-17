<h1  align="center">API - Credifit BackEnd</h1>

<h2 align="center">Introdução</h2>
   
   Este projeto é um API desenvolvida em Node.js, utilizando TypeScript, Express, TypeORM, PostgreSQL e Jest para testes. A API possui duas rotas principais: registro de transações e listagem de usuários! No processo de investigação para o desenvolvimento do projeto usei de base alguns dos meus projetos já finalizados, para configuração de banco de dados e testes, organização de pastas e arquivos, e bibliotecas utilizadas!
   
Deploy URL: https://credifit-api.onrender.com/

This is a challenge by Coodesh

##

<div align="center" style="display: inline_block">
 <h2  align="center">Rotas</h2>
</div>

<div align="center" style="display: inline_block"> 
  <h3>Registro de transações</h3>
</div>

<div align="left" style="display: inline_block">

Rota para recebimento e tratamento de dados sobre transações efetuadas e registro no banco de dados.

`POST / - Registrar transações - FORMATO DA REQUISIÇÃO`

> ```json
> {
>   "0": "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
>   "1": "22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA",
>   "2": "32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA",
>   "3": "42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS"
> }
> ```

`POST / - Registrar transações - FORMATO DA RESPOSTA - STATUS 201`

> ```json
> [
>   {
>     "id": "28e2bbc4-67d8-4d7e-a1ec-6724328ff9a1",
>     "transaction": "Creator Sale",
>     "date": "2022-01-15T19:20:30-03:00",
>     "user": "JOSE CARLOS",
>     "product": "CURSO DE BEM-ESTAR",
>     "value": 127.5,
>     "status": "Registration Completed!"
>   },
>   {
>     "id": "5da342e3-0d36-4af7-941b-b7bca06e2702",
>     "transaction": "Affiliated Sale",
>     "date": "2022-01-16T14:13:54-03:00",
>     "user": "THIAGO OLIVEIRA",
>     "product": "CURSO DE BEM-ESTAR",
>     "value": 127.5,
>     "status": "Registration Completed!"
>   },
>   {
>     "id": "177c0881-0f00-4980-a800-7ef4360698e7",
>     "transaction": "Commission Paid",
>     "date": "2022-01-16T14:13:54-03:00",
>     "user": "THIAGO OLIVEIRA",
>     "product": "CURSO DE BEM-ESTAR",
>     "value": 45,
>     "status": "Registration Completed!"
>   },
>   {
>     "id": "48c0eb9c-7976-46fd-a202-9cca84bb06fc",
>     "transaction": "Commission Received",
>     "date": "2022-01-16T14:13:54-03:00",
>     "user": "JOSE CARLOS",
>     "product": "CURSO DE BEM-ESTAR",
>     "value": 45,
>     "status": "Registration Completed!"
>   }
> ]
> ```

Nesta rota os dados são tratados e dependendo de seu primeiro valor (1,2,3,4) um tipo diferente de transação é registrada:

- Para os de tipo 1 é criado um registro de venda de criador de produto, caso o usuário ou o produto não existam eles são criados.
- Para os de tipo 2 é criado um registro de venda de um afiliado, caso o usuário não exista ele é criado e se o produto não existir o cadastro é invalidado.
- Para os de tipo 3 é criado um registro de pagamento de comissão, caso o usuário ou o produto não existam o cadastro é invalidado.
- Para os de tipo 4 é criado um registro de recebimento de comissão, caso o usuário ou o produto não existam o cadastro é invalidado.

`POST / - Registrar transações - FORMATO DA RESPOSTA DE ERRO`

> ```json
> [
>   {
>     "transaction": "Affiliated Sale",
>     "date": "2022-01-15T19:20:30-03:00",
>     "user": "THIAGO OLIVEIRA",
>     "product": "CURSO BEM-ESTAREI",
>     "value": 127.5,
>     "status": "Error 404",
>     "message": "Product not found!"
>   }
> ]
> ```

</div>

<div align="center" style="display: inline_block">
<h3>Listagem de Usuários</h3>
</div>

<div align="left" style="display: inline_block">

Rota para listar os usuários, com seus produtos criados e usuários afiliados.

`GET /users - Listar usuários - FORMATO DA REPOSTA - STATUS 200`

> ```json
> [
>   {
>     "id": "daa2282f-a5b2-4ffc-bb47-2d7ebb440413",
>     "name": "JOSE CARLOS",
>     "type": "creator",
>     "balance": "172,5",
>     "products": [
>       {
>         "id": "9dd23373-84b4-4e96-ae30-dd29020189b2",
>         "name": "CURSO DE BEM-ESTAR",
>         "value": "127.5",
>         "sum_of_sales": "255"
>       }
>     ],
>     "creatorAffiliates": [
>       {
>         "id": "81f69184-92b7-491e-be12-f00764d2f1c9",
>         "name": "THIAGO OLIVEIRA",
>         "type": "affiliated",
>         "balance": "82.5"
>       }
>     ]
>   }
> ]
> ```
