function removeDuplicates(list) {
  return [...new Set(list)];
}

module.exports = function getCategories(list) {
  return removeDuplicates(list.flatMap(({ tags }) => tags)).map(tag => tag.toUpperCase());
}