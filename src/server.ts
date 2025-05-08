import dotenv from 'dotenv';
dotenv.config();

import prisma from './prisma';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';

export const app: Application = express(); // Instância do Express
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler); // Sempre depois das rotas

// Função para criar um usuário super_admin caso ainda não exista
async function seedSuperAdmin(): Promise<void> {
  const superAdminEmail = 'admin@example.com';

  const exists = await prisma.employees.findUnique({
    where: { email: superAdminEmail },
  });

  if (!exists) {
    // Crie a senha padrão conforme necessário (ex.: hash com bcrypt)
    // Aqui usamos apenas um exemplo simples
    const defaultPasswordHash = 'hash_da_senha_padrão';

    await prisma.employees.create({
      data: {
        name: 'Super Admin',
        email: superAdminEmail,
        role: 'super_admin', // Ajuste para respeitar o tipo da role no seu schema
        passwordHash: defaultPasswordHash,
      },
    });

    console.log('Usuário super_admin criado com senha padrão. ATENÇÃO: altere a senha imediatamente!');
  }
}

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Testa a conexão com o banco de dados
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Executa o seed do super_admin
    await seedSuperAdmin();

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`); // Atualizado para incluir o localhost

      console.log('Servidor iniciado com sucesso!');
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer();