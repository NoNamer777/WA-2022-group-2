export class UserChallenge {
  /** @type {number} */
  id;

  /** @type {boolean} */
  completed;

  /** @type {User} */
  user;

  /** @type {Challenge} */
  challenge;

  /** @type {ChallengeDay[]} */
  days;
}
