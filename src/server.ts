import dotenv from 'dotenv';
dotenv.config();

import prisma from './prisma';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express(); // Instância do Express
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

app.use(errorHandler); // Sempre depois das rotas

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Testa a conexão com o banco de dados
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer();