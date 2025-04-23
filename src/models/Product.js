import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config.js'; // Certifique-se de que está importando a instância correta

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigobarras: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    fornecedor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    validade: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    precoCusto: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    precoVenda: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    precoPromocao: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estoque_rastreado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    estoque_minimo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estoque_maximo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estoque_atual: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estoque_reservado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tenants',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Certifique-se de que a instância está sendo passada aqui
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product;