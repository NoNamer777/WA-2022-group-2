import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../../core/services/index.js';

export class UserEntity extends Model {
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
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
    type: DataTypes.INTEGER(11),
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
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: 'unique_user_username_idx',
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 80]
    }
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
      len: [3, 80]
    }
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 128],
      is: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/g
    },
    set(password) {
      this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(15)));
    }
  },
  profile_image_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true
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
