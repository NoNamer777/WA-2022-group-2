import { Op } from 'sequelize';
import { UserEntity } from '../../user/index.js';
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
          user_id: {
            [Op.eq]: userId
          }
        },
        attributes: []
      }
    });
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<GroupEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await GroupEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
  }

  /**
   * @param updatedGroupData {GroupEntity}
   * @return {Promise<void>}
   */
  async update(updatedGroupData) {
    await GroupEntity.update(updatedGroupData, { where: { id: updatedGroupData.id } });
  }

  /**
   * @param groupData {Omit<GroupEntity, 'id'>}
   * @return {Promise<GroupEntity>}
   */
  create(groupData) {
    return GroupEntity.create(groupData, { include: [UserEntity] });
  }

  /**
   * @param groupId {number}
   * @return {Promise<void>}
   */
  async deleteById(groupId) {
    await GroupEntity.destroy({ where: { id: groupId } });
  }
}

export const groupRepository = new GroupRepository();
