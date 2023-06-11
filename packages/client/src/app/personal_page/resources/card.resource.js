/**
 * @returns {Array}
 * @param groups
 */
export function cardResource(groups) {
  return groups.map((group) => {
    return {
      id: group.id,
      title: group.name,
      text: 'Code: ' + group.code
    };
  });
}
