async function selectionSort({ array, setArray, setHighlight, setSorted, speed }) {
  let arr = [...array];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      await new Promise((resolve) =>
        setTimeout(() => {
          requestAnimationFrame(() => {
            setHighlight([minIdx, j]);
            setArray([...arr]);
            resolve();
          });
        }, speed)
      );

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    setSorted((prev) => [...prev, i]);
  }

  setHighlight([]);
  setArray([...arr]);
}
export default selectionSort;
