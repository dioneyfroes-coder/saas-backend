import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Desativa logs de SQL
  }
);

// Removido o uso de sequelize.sync({ alter: true })
// O gerenciamento do banco de dados será feito exclusivamente por migrações

export default sequelize;