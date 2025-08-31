async function mergeSort({ array, setArray, setHighlight, setSorted, speed }) {
  let arr = [...array];
  let n = arr.length;

  async function merge(start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      await new Promise((resolve) =>
        setTimeout(() => {
          requestAnimationFrame(() => {
            setHighlight([k]);
            setArray([...arr]);
            resolve();
          });
        }, speed)
      );

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }

    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];

    setArray([...arr]);
  }

  async function mergeSortHelper(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }

  await mergeSortHelper(0, n - 1);

  setSorted(Array.from({ length: n }, (_, i) => i));
  setHighlight([]);
  setArray([...arr]);
}
export default mergeSort;
