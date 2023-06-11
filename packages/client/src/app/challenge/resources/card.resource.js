/**
 * @param challenges {Challenge[]}
 * @returns {Array<{ id: number, title: string, text: string }>}
 */
export function cardResource(challenges) {
  return challenges.map((challenge) => {
    const text = challenge?.group?.name || challenge.userChallenges[0].user.username;

    return {
      id: challenge.id,
      title: challenge.name,
      text: text
    };
  });
}
