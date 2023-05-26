import bcrypt from 'bcryptjs';
import { Model } from 'sequelize';
import definition from '../../db/table-definitions/user.js';
import { DatabaseService } from '../core/services/index.js';

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

/** @return {void} */
export function initializeUserEntity() {
  UserEntity.init(definition.userTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user',
    tableName: 'user',
    createdAt: false,
    updatedAt: false
  });
}
