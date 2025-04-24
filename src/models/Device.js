import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Device = sequelize.define('Device', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('estoque', 'pdv', 'admin', 'outro'),
    defaultValue: 'outro'
  },
  identificador: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  chaveSecreta: {
    type: DataTypes.STRING,
    allowNull: true // pode ser null, mas se existir será validada
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tenants',
      key: 'id',
    },
  },  
});

// (Opcional) Associação com usuário
Device.belongsTo(User, { foreignKey: 'userId', as: 'usuarioResponsavel' });

export default Device;
