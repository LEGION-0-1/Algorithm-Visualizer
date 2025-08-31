async function heapSort({ array, setArray, setHighlight, setSorted, speed }) {
  let arr = [...array];
  let n = arr.length;

  async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      await new Promise((resolve) =>
        setTimeout(() => {
          requestAnimationFrame(() => {
            setHighlight([i, largest]);
            setArray([...arr]);
            resolve();
          });
        }, speed)
      );

      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setSorted((prev) => [...prev, i]);

    await new Promise((resolve) =>
      setTimeout(() => {
        requestAnimationFrame(() => {
          setHighlight([0, i]);
          setArray([...arr]);
          resolve();
        });
      }, speed)
    );

    await heapify(i, 0);
  }

  setSorted((prev) => [...prev, 0]);
  setHighlight([]);
  setArray([...arr]);
}
export default heapSort;
