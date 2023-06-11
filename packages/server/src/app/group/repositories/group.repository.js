import { Op } from 'sequelize';
import { GroupEntity } from '../entities/group.entity.js';
import { UserGroupEntity } from '../entities/user-group.entity.js';

class GroupRepository {
  /**
   * @return {Promise<GroupEntity[]>}
   */
  async findAll(userId) {
    return await GroupEntity.findAll({
      include: {
        model: UserGroupEntity,
        where: {
          userId: {
            [Op.eq]: userId
          }
        }
      }
    });
  }
}

export const groupRepository = new GroupRepository();
