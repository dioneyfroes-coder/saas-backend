import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import routes from './routes/index';

dotenv.config();

const prisma = new PrismaClient(); // Instância do Prisma Client
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

// Middleware para rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware para tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

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