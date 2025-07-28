export const insertionSort = (array) => {
  const animations = [];
  const arr = array.slice();

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    animations.push([i, j, false]); // comparing

    while (j >= 0 && arr[j] > key) {
      animations.push([j + 1, arr[j], true]); // move
      arr[j + 1] = arr[j];
      j--;

      if (j >= 0) animations.push([j, j + 1, false]);
    }

    animations.push([j + 1, key, true]); // insert key
    arr[j + 1] = key;
  }

  return animations;
};
