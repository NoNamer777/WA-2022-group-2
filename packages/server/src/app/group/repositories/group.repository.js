import { UserEntity } from '../../user/index.js';
import { GroupEntity } from '../entities/group.entity.js';

class GroupRepository {
  /**
   * @return {Promise<GroupEntity[]>}
   */
  async findAll() {
    return await GroupEntity.findAll();
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

  /**
   * @param whereClaus
   * @param includeClause
   * @return {Promise<GroupEntity[]>}
   */
  async findAllBy(whereClaus, includeClause) {
    return await GroupEntity.findAll({
      include: includeClause,
      where: { ...whereClaus },
      rejectOnEmpty: false
    });
  }
}

export const groupRepository = new GroupRepository();
