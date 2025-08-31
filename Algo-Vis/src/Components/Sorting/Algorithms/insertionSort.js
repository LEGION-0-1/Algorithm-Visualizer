function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function insertionSort({
  array,
  setArray,
  speed,
  setLog,
  setHighlight,
  setSorted,
}) {
  const arr = [...array];
  const log = (msg) => setLog((prev) => [...prev, msg]);

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      setHighlight([j, j + 1]);
      await sleep(speed);

      arr[j + 1] = arr[j];
      setArray([...arr]);
      log(`Moved ${arr[j]} to index ${j + 1}`);
      await sleep(speed);
      j--;
    }

    arr[j + 1] = key;
    setArray([...arr]);
    log(`Inserted ${key} at index ${j + 1}`);
    await sleep(speed);
  }

  setSorted(arr.map((_, idx) => idx));
}
