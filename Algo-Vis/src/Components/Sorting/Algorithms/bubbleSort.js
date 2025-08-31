async function bubbleSort({ array, setArray, setHighlight, setSorted, speed }) {
  let arr = [...array];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await new Promise((resolve) =>
        setTimeout(() => {
          requestAnimationFrame(() => {
            setHighlight([j, j + 1]);
            setArray([...arr]);
            resolve();
          });
        }, speed)
      );

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    setSorted((prev) => [...prev, n - i - 1]);
  }

  setHighlight([]);
  setArray([...arr]);
}
export default bubbleSort;
