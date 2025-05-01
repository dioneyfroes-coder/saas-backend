import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cadastrar empregados
  await prisma.employees.createMany({
    data: [
    {
      username: 'maria.gerente',
      fullName: 'Maria Souza',
      password: '$2b$10$A9eXlPZUvXqZruK8V/it7.h5hQZG7qOPsN1wTWR3tD9CMvmZT7a6i', // senha123
      role: 'manager',
      active: true,
    },
    {
      username: 'joao.rh',
      fullName: 'João Oliveira',
      password: '$2b$10$GJq6LZz7aRLu8xKY8vEkqOCUuYcY1EMcT7wnvEIxJHZ7MIQ5Btxo2', // 123senha
      role: 'hr',
      active: true,
    },
    {
      username: 'ana.finance',
      fullName: 'Ana Lima',
      password: '$2b$10$EdMw6Zn1kO7sCcA9czdc8.LnC1FtJZcTxobABsFjDADDrh0sm4ISe', // fin@123
      role: 'finance',
      active: true,
    },
    {
      username: 'carlos.sup',
      fullName: 'Carlos Martins',
      password: '$2b$10$RzGdydwKlY1Vrjq3qG/Pe.C1UeNHyHRRB.xEQXcPt4hQ4ro9L1S/S', // sup456
      role: 'supervisor',
      active: false,
    },
    {
      username: 'paula.aud',
      fullName: 'Paula Freitas',
      password: '$2b$10$V0KyrURVCsTSYZPslD2fAuCezI/m9o4mhKhzkNTA0czXmUQhPQ2bG', // audit@2023
      role: 'auditor',
      active: true,
    },
    {
      username: 'lucas.op1',
      fullName: 'Lucas Rocha',
      password: '$2b$10$YmY5UR/zO36sHx0i7M7L8OZp5zJTYfDnl7PbtpBoJLP3H8gwh2TPa', // op2023
      role: 'operator',
      active: true,
    },
    {
      username: 'jessica.op2',
      fullName: 'Jéssica Melo',
      password: '$2b$10$4LdWwFzU8cvF7V85fncHuOQ4q4eHeMKZmglFKFpWxE/fuUpZcZKzW', // op2023
      role: 'operator',
      active: false,
    },
    {
      username: 'eduardo.hr2',
      fullName: 'Eduardo Campos',
      password: '$2b$10$zvNz6HgAG5hCIMbsppC.4eakBDdnQF34pDsdAxuDhnWJgCeU2QINu', // rhEdu123
      role: 'hr',
      active: true,
    },
    {
      username: 'aline.finan',
      fullName: 'Aline Castro',
      password: '$2b$10$3fK7O7QZXUJ0MY4Us8Lzxu5ZkBGEBwO0ld8K6WTSmqR0PTGhvPBCK', // $fin2024
      role: 'finance',
      active: true,
    },
    {
      username: 'bruno.superv',
      fullName: 'Bruno Tavares',
      password: '$2b$10$6qN6s4WuOVYHjZWUc8XLX.mAMfA8ThxPA1zwUZscCwokKDB8yaK3W', // brSuper!
      role: 'supervisor',
      active: true,
    }
  ],
  });

  // Cadastrar produtos
  await prisma.stock.createMany({
    data: [
        {
            name: 'Sabonete Lux 85g',
            barcode: '7891234560011',
            quantity: 120,
            price: 2.5,
            description: 'Sabonete perfumado para uso diário. Aroma floral.',
          },
          {
            name: 'Arroz Tio João 5kg',
            barcode: '7896543210022',
            quantity: 60,
            price: 22.99,
            description: 'Arroz branco tipo 1, grãos longos e soltos.',
          },
          {
            name: 'Óleo de Soja Liza 900ml',
            barcode: '7893219870033',
            quantity: 80,
            price: 7.49,
            description: 'Óleo vegetal refinado ideal para frituras e receitas.',
          },
          {
            name: 'Leite Integral Italac 1L',
            barcode: '7891112220044',
            quantity: 100,
            price: 5.29,
            description: 'Leite UHT integral de alta qualidade.',
          },
          {
            name: 'Detergente Ypê Neutro 500ml',
            barcode: '7894445550055',
            quantity: 200,
            price: 2.89,
            description: 'Detergente neutro, limpa sem agredir as mãos.',
          },
          {
            name: 'Café Pilão Torrado 500g',
            barcode: '7897778880066',
            quantity: 90,
            price: 12.5,
            description: 'Café tradicional forte e encorpado.',
          },
          {
            name: 'Açúcar União Refinado 1kg',
            barcode: '7899990000077',
            quantity: 150,
            price: 4.75,
            description: 'Açúcar branco refinado, ideal para receitas.',
          },
          {
            name: 'Feijão Carioca Kicaldo 1kg',
            barcode: '7893336660088',
            quantity: 70,
            price: 9.89,
            description: 'Feijão carioca selecionado, sabor e rendimento.',
          },
          {
            name: 'Papel Higiênico Neve 12un',
            barcode: '7898887770099',
            quantity: 50,
            price: 23.49,
            description: 'Folhas duplas, maciez e resistência.',
          },
          {
            name: 'Shampoo Dove Nutritivo 400ml',
            barcode: '7895554440101',
            quantity: 40,
            price: 17.99,
            description: 'Shampoo para hidratação e brilho dos cabelos.',
          },
          {
            name: 'Creme Dental Colgate 90g',
            barcode: '7892221110112',
            quantity: 140,
            price: 3.99,
            description: 'Creme dental proteção cáries, uso diário.',
          },
          {
            name: 'Refrigerante Coca-Cola 2L',
            barcode: '7896665550123',
            quantity: 110,
            price: 8.49,
            description: 'Refrigerante sabor cola, embalagem 2 litros.',
          },
          {
            name: 'Macarrão Renata Espaguete 500g',
            barcode: '7891011120134',
            quantity: 95,
            price: 4.29,
            description: 'Massa de trigo tipo espaguete, cozimento rápido.',
          },
          {
            name: 'Desodorante Rexona Aerosol 150ml',
            barcode: '7891314150145',
            quantity: 65,
            price: 10.5,
            description: 'Antitranspirante com proteção por 48 horas.',
          },
          {
            name: 'Biscoito Oreo Recheado 90g',
            barcode: '7891617180156',
            quantity: 130,
            price: 3.59,
            description: 'Biscoito recheado com creme sabor baunilha.',
          }
    ],
  });

  // Cadastrar dispositivos
  await prisma.devices.createMany({
    data: [
        {
            nome: 'PDV 1 - Caixa Principal',
            tipo: 'pdv',
            identificador: 'PDV-001',
            chaveSecreta: 'a9f2c1d3e4',
            ativo: true,
          },
          {
            nome: 'PDV 2 - Caixa Principal',
            tipo: 'pdv',
            identificador: 'PDV-002',
            chaveSecreta: 'b8e3f2d1a5',
            ativo: true,
          },
          {
            nome: 'PDV 3 - Caixa Principal',
            tipo: 'pdv',
            identificador: 'PDV-003',
            chaveSecreta: 'c7d4e5f6a2',
            ativo: true,
          },
          {
            nome: 'Totem Autoatendimento 1',
            tipo: 'totem',
            identificador: 'TOTEM-001',
            chaveSecreta: 'b4e1f9c2a6',
            ativo: true,
          },
          {
            nome: 'Terminal de Consulta de Preço',
            tipo: 'terminal-preco',
            identificador: 'TERM-PRC-01',
            chaveSecreta: 'c7a2f5d1e3',
            ativo: true,
          },
          {
            nome: 'PC Financeiro',
            tipo: 'pc-financeiro',
            identificador: 'PC-FIN-01',
            chaveSecreta: 'd3f8c6a1b9',
            ativo: true,
          },
          {
            nome: 'PC Recursos Humanos',
            tipo: 'pc-rh',
            identificador: 'PC-RH-01',
            chaveSecreta: 'e1b5c3f9a7',
            ativo: true,
          },
          {
            nome: 'PC Gerência',
            tipo: 'pc-gerencia',
            identificador: 'PC-GER-01',
            chaveSecreta: 'f6c2e1b8d4',
            ativo: true,
          },
          {
            nome: 'PC Atendimento Fiscal',
            tipo: 'pc-atendimento',
            identificador: 'PC-ATD-01',
            chaveSecreta: 'a2d7f9c3e1',
            ativo: true,
          }
    ],
  });

  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });