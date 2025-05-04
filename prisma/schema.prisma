generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model stock {
  id          Int          @id @default(autoincrement())
  name        String       @db.VarChar(255) // Nome do produto
  barcode     String?      @unique @db.VarChar(255) // Código de barras (opcional)
  quantity    Int          @default(0) // Quantidade em estoque
  price       Decimal      @db.Decimal(10, 2) // Preço unitário
  description String?      @db.Text // Descrição opcional
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @default(now()) @updatedAt
  saleItems   sale_items[]
}

model sales {
  id          Int           @id @default(autoincrement())
  employeesId Int?
  total       Decimal       @db.Decimal(10, 2)
  status      sales_status? @default(pendente)
  createdAt   DateTime      @default(now()) @db.DateTime(0)
  updatedAt   DateTime      @default(now()) @updatedAt @db.DateTime(0)
  saleItems   sale_items[]
  employees   employees?    @relation(fields: [employeesId], references: [id], map: "sales_ibfk_2")

  @@index([employeesId], map: "employeesId")
}

model sale_items {
  id       Int     @id @default(autoincrement())
  saleId   Int
  stockId  Int // Adicionado para corrigir o erro
  quantity Int
  price    Decimal @db.Decimal(10, 2)
  sale     sales   @relation(fields: [saleId], references: [id], onDelete: Cascade, map: "sale_items_ibfk_1")
  stock    stock   @relation(fields: [stockId], references: [id], onDelete: Cascade, map: "sale_items_ibfk_2")

  @@index([stockId], map: "stockId")
  @@index([saleId], map: "saleId")
}

model devices {
  id               Int                  @id @default(autoincrement())
  nome             String               @db.VarChar(255)
  tipo             DeviceType?          @default(outro)
  identificador    String               @unique(map: "identificador") @db.VarChar(255)
  chaveSecreta     String?              @db.VarChar(255)
  ativo            Boolean?             @default(true)
  employeesId      Int?
  createdAt        DateTime             @default(now()) @db.DateTime(0)
  updatedAt        DateTime             @default(now()) @updatedAt @db.DateTime(0)
  employees        employees?           @relation(fields: [employeesId], references: [id], onUpdate: NoAction, map: "devices_ibfk_2")
  deviceAccessLogs device_access_logs[] // Relacionamento com device_access_logs

  @@index([employeesId], map: "employeesId")
}

model finance {
  id          Int             @id @default(autoincrement())
  description String          @db.VarChar(255) // Descrição do registro
  type        FinanceType // Tipo: entrada ou saída
  value       Decimal         @db.Decimal(10, 2) // Valor do registro
  date        DateTime        @db.Date // Data do registro
  category    FinanceCategory // Categoria do registro
  note        String?         @db.Text // Nota opcional
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @default(now()) @updatedAt
}

enum FinanceType {
  income // Entrada
  expense // Saída
}

enum FinanceCategory {
  rent // Aluguel
  sales // Vendas
  marketing // Marketing
  other // Outros
}

model device_access_logs {
  id         Int      @id @default(autoincrement())
  deviceId   Int
  accessedAt DateTime @default(now())
  ip         String?  @db.VarChar(255)
  userAgent  String?  @db.VarChar(255)

  device devices @relation(fields: [deviceId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "device_access_logs_ibfk_1")

  @@index([deviceId], map: "deviceId")
}

model employees {
  id           Int      @id @default(autoincrement())
  name         String
  role         Role
  email        String?
  phone        String?
  address      String?
  passwordHash String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Tira o "document" antigo e cria uma relação 1:N com a tabela "employee_documents"
  // Cada funcionário pode ter vários documentos, cada um criptografado
  documents employee_documents[]
  sales     sales[]
  devices   devices[]
}

model employee_documents {
  id           Int          @id @default(autoincrement())
  employeeId   Int
  type         DocumentType // RG, CPF, CTPS etc.
  encryptedVal String // valor criptografado (pode conter RG, CPF, etc.)
  createdAt    DateTime     @default(now())

  // Relação com employees
  employees employees @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@index([employeeId])
}

enum DocumentType {
  RG
  CPF
  CTPS
  PIS
  OUTRO
}

model log {
  id        Int      @id @default(autoincrement())
  level     String
  message   String
  timestamp DateTime @default(now())
  stack     String?
}

enum Role {
  manager // Gerência, negocios
  hr // RH
  finance // Financeiro
  supervisor // Supervisor
  auditor // Fiscal
  store_operator // Operador de loja
  cashier // Caixa
  stock_clerk // Estoquista
  it // TI
  admin // Administrador, sistema, juridico,
  super_admin // Super administrador, acesso total
  operator // Operador de loja
}

enum DeviceType {
  estoque
  pdv
  admin
  financeiro
  rh
  totem
  terminal_preco
  pc_financeiro
  pc_rh
  pc_gerencia
  pc_atendimento
  outro
}

enum sales_status {
  pendente
  pago
  cancelado
}
