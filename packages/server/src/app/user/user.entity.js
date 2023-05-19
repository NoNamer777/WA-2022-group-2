import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../core/services/index.js';

export class UserEntity extends Model {
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  async setPassword(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    this.setDataValue('password', hashedPassword);
  }

  toJSON() {
    const value = super.toJSON();

    delete value.password;
    delete value.email;

    return value;
  }
}

/** @type {import('sequelize').ModelAttributes<UserEntity>} */
export const UserModelDefinition = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notNull: true,
      isInt: true,
      min: 0
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'unique_user_username_idx',
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 80]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
      len: [3, 80]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 124],
      is: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/g
    }
  }
};

/** @return {void} */
export function initializeUserEntity() {
  UserEntity.init(UserModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user',
    tableName: 'user',
    createdAt: false,
    updatedAt: false
  });
}
