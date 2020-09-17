// const arr = [6, 3, 2, 7, 1, 5, 8, 4];
const arr = [8, 7, 6, 5, 4, 3, 2, 1];

function mergeSotr(array) {
  if (array.length < 2) {
    return array;
  }
  const length = array.length;
  const middle = Math.floor(length >> 1);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSotr(left), mergeSotr(right))
}

function merge(left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
}

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let selectedIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        selectedIndex = j;
      }
    }

    if (selectedIndex != i) {
      const temp = array[i];
      array[i] = array[selectedIndex];
      array[selectedIndex] = temp;
    }
  }

  return array;
}


function insertionSort(array) {
  const length = array.length;
  for (let i = 1; i < array.length; i++) {
    const toInsertValue = array[i];
    let j = i;
    for (j; j > 0 && array[j - 1] > toInsertValue; j--) {
      array[j] = array[j - 1];
    }

    array[j] = toInsertValue;
  }

  return array;
}

console.log(insertionSort(arr))