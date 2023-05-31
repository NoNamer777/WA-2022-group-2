/**
 * @param challenges {Array}
 * @returns {Array}
 */
export function cardResource(challenges) {
  return challenges.map((challenge) => {
    const text = challenge?.group?.name || challenge.user_challenges[0].user.username;

    return {
      id: challenge.id,
      title: challenge.name,
      text: text
    };
  });
}
