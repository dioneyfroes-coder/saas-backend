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
import bcrypt from 'bcrypt';
import { AuthService } from './services/AuthService';

export const app: Application = express(); // Instância do Express
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo, Você está conectado!');
});

// Rotas
app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler); // Sempre depois das rotas

// Função para criar um usuário super_admin caso ainda não exista
async function seedSuperAdmin(): Promise<void> {
  const superAdminEmail = 'admin@example.com';

  const exists = await prisma.employees.findUnique({
    where: { email: superAdminEmail },
  });

  if (!exists) {
    // Composição da senha: 01 (super_admin) + 4 dígitos (ex. 1234)
    const defaultPassword = '011234';

    // Faz o hash da senha, neste caso com custo de 10 rounds
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await prisma.employees.create({
      data: {
        name: 'Super Admin',
        email: superAdminEmail,
        role: 'super_admin', // Ajuste para respeitar o tipo da role no seu schema
        passwordHash: hashedPassword,
      },
    });

    console.log('Usuário super_admin criado com senha padrão: 011234 (já encriptada no BD). ATENÇÃO: altere a senha imediatamente!');
  }
}

// Criação do dispositivo principal do super_admin
async function seedSuperAdminDevice(): Promise<void> {
  const superAdminEmail = 'admin@example.com';
  const superAdmin = await prisma.employees.findUnique({
    where: { email: superAdminEmail },
  });

  // Se não encontrou o usuário, apenas exibe mensagem e não cria dispositivo
  if (!superAdmin) {
    console.log('Usuário super_admin não encontrado. Dispositivo não será criado.');
    return;
  }

  const existingDevice = await prisma.devices.findUnique({
    where: { identificador: 'super_admin_base' },
  });

  if (!existingDevice) {
// Gera o token para o dispositivo super_admin
    const token = AuthService.generateToken({
      role: 'super_admin',
      employeesId: superAdmin.id
    });


    await prisma.devices.create({
      data: {
        nome: 'Computador Base do Super Admin',
        tipo: 'super_admin',
        identificador: 'super_admin_base',
        chaveSecreta: '4f8e7d6c5b9a2c3d1e0f6a8b7c9d4e2f1a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
        ativo: true,
        employeesId: superAdmin.id,
        token: token,
      },
    });

    console.log('Dispositivo do super_admin criado com identificador: super_admin_base');
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
    await seedSuperAdminDevice();

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