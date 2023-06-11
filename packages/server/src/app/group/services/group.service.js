import { Op } from 'sequelize';
import { NotFoundException } from '../../core/models/index.js';
import { UserGroupEntity } from '../entities/user-group.entity.js';
import { groupRepository } from '../repositories/group.repository.js';

export class GroupService {
  /** @return {GroupService} */
  static instance() {
    if (GroupService.#instance) return GroupService.#instance;

    GroupService.#instance = new GroupService();
    return GroupService.#instance;
  }

  /** @type {GroupService} */
  static #instance;

  /** @return {Promise<GroupEntity[]>} */
  async getAll() {
    return await groupRepository.findAll();
  }

  /**
   * @param groupId {number}
   * @param throwsError {boolean}
   * @return {Promise<GroupEntity>}
   */
  async getById(groupId, throwsError = true) {
    const groupById = await groupRepository.findOneBy({ id: groupId });

    if (!groupById && throwsError) {
      throw new NotFoundException(`Er is geen group gevonden met het ID: '${groupId}'.`);
    }
    return groupById;
  }

  /**
   * @param groupData {GroupEntity}
   * @return {Promise<GroupEntity>}
   */
  async update(groupData) {
    const groupId = groupData.id;

    if (!(await this.getById(groupId, false))) {
      throw new NotFoundException(
        `Het wijzigen van group met ID: '${groupId}' was niet succesvol omdat de group niet bestaat.`
      );
    }
    await groupRepository.update(groupData);
    return await this.getById(groupId);
  }

  /**
   * @param groupData {Omit<GroupEntity, 'id'>}
   * @return {Promise<GroupEntity>}
   */
  async create(groupData) {
    return groupRepository.create(groupData);
  }

  /**
   * @param groupId {number}
   * @return {Promise<void>}
   */
  async deleteById(groupId) {
    if (!(await this.getById(groupId, false))) {
      throw new NotFoundException(
        `Het verwijderen van Group met ID: '${groupId}' is mislukt omdat het niet bestaat.`
      );
    }
    await groupRepository.deleteById(groupId);
  }

  /** @return {Promise<GroupEntity[]>} */
  async getForUser(userId) {
    return await groupRepository.findAllBy(
      {},
      {
        model: UserGroupEntity,
        where: {
          user_id: {
            [Op.eq]: userId
          }
        },
        attributes: []
      }
    );
  }

  /**
   * @param code {string}
   * @param throwsError {boolean}
   * @return {Promise<GroupEntity>}
   */
  async getByCode(code, throwsError = true) {
    const groupByCode = await groupRepository.findOneBy({ code: code });

    if (!groupByCode && throwsError) {
      throw new NotFoundException(`Er is geen groep gevonden met de code: '${code}'.`);
    }
    return groupByCode;
  }
}
