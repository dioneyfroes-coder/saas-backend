import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER,
    logging: false, // Desativa logs de SQL
  }
);

// Sincroniza o banco de dados apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Banco de dados sincronizado em ambiente de desenvolvimento.');
    })
    .catch((error) => {
      console.error('Erro ao sincronizar o banco de dados:', error);
    });
} else {
  console.warn('Sincronização automática desativada. Use migrações para gerenciar o banco de dados.');
}

export default sequelize;