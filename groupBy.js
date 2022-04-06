const areArraysEqual = function (array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0) {
    return true;
  }
  if (!isEqual(array1[0], array2[0])) {
    return false;
  }
  return isEqual(array1.slice(1), array2.slice(1));
};

const isEqual = function (element1, element2) {
  if (Array.isArray(element1) && Array.isArray(element2)) {
    return areArraysEqual(element1, element2);
  }
  return element1 === element2;
};

const indexOfSimilar = function (element, array) {
  for (let index = 0; index < array.length; index++) {
    const groupElement = array[index];
    if (isEqual(element, groupElement[0])) {
      return index;
    }
  }
  return -1;
};

const groupBy = function (elements) {
  const groupedElements = [];
  if (elements.length === 0) {
    return [];
  }
  for (let index = 0; index < elements.length; index++) {
    let matchedIndex = indexOfSimilar(elements[index], groupedElements);
    if (matchedIndex === -1) {
      matchedIndex = groupedElements.length;
      groupedElements.push([]);
    }
    groupedElements[matchedIndex].push(elements[index]);
  }
  return groupedElements;
};

const main = function () {
  console.log(groupBy([1, 2, 1])); // [[1, 1], [2]]
  console.log(groupBy([1, 2, 3, 1, 2, 4])); // [[1, 1], [2, 2], [3], [4]]
  console.log(groupBy([[1, 1], 1, [1, 1], 1])); // [[[1, 1], [1, 1]], [1, 1]]
  console.log(groupBy([[2, 1], 1, [1, 2], 1, [1, 2, 3], [1]])); // [[[2, 1]], [1, 1], [[1, 2]], [[1, 2, 3]], [[1]]]
  console.log(groupBy([1, [1, 2], 1, [1, 2, 3], [1], [1, 2, 3], [1]])); // [[1, 1], [[1, 2]], [[1, 2, 3], [1, 2, 3]], [[1], [1]]]
  console.log(groupBy([[2, 1], [1, 2], [[1], [2]], [[1], [2]]])); // [[[2, 1]], [[1, 2]], [[[1], [2]], [[1], [2]]]]
};

main();
