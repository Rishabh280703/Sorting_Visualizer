export const heapSort = (array) => {
    const animations = [];
    const arr = array.slice();
    const n = arr.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, animations);
    }
  
    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i, true]); // swap root with end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0, animations);
    }
  
    return animations;
  };
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n) animations.push([i, left, false]);
    if (right < n) animations.push([i, right, false]);
  
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
  
    if (largest !== i) {
      animations.push([i, largest, true]); // actual swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest, animations);
    }
  }
  