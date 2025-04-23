🧰 O que é o Sequelize?
Sequelize é um ORM (Object-Relational Mapper) para Node.js. Ele serve como uma ponte entre o JavaScript e um banco de dados relacional, como:

PostgreSQL

MySQL

MariaDB

SQLite

MSSQL

🧠 O que significa "ORM"?
ORM = Object-Relational Mapping

Traduzindo:

Ele transforma dados do banco (linhas, colunas, tabelas) em objetos JS, e vice-versa.

📦 Exemplo prático:
Suponha que você tem uma tabela no banco chamada products.

Com Sequelize, você cria um modelo JS que representa essa tabela, tipo:

js
Copiar
Editar
const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
});
Depois, você pode trabalhar com os produtos assim:

js
Copiar
Editar
// Criar um novo produto
await Product.create({ name: 'Café', price: 9.99 });

// Buscar todos os produtos
const produtos = await Product.findAll();

// Atualizar um produto
const produto = await Product.findByPk(1);
produto.price = 8.99;
await produto.save();
Ou seja: sem precisar escrever SQL na mão.

🧩 O Sequelize ajuda com:
✅ Modelos e tabelas
✅ Validações
✅ Relacionamentos (hasMany, belongsTo...)
✅ Migrações de banco
✅ Sincronização automática
✅ Consultas com filtros (where, order, limit...)
✅ Segurança (evita SQL injection)
✅ Compatibilidade com vários bancos

✅ Vantagens de usar Sequelize:
🚀 Acelera o desenvolvimento

✨ Código mais limpo e organizado

🔒 Ajuda na segurança contra SQL injection

📄 Evita escrever SQL repetitivo