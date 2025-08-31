function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function quickSort({
  array,
  setArray,
  speed,
  setLog,
  setHighlight,
  setSorted,
}) {
  const arr = [...array];
  const log = (msg) => setLog((prev) => [...prev, msg]);

  async function partition(low, high) {
    const pivot = arr[high];
    log(`Pivot chosen: ${pivot}`);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlight([j, high]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        log(`Swapped ${arr[i]} and ${arr[j]}`);
        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    log(`Placed pivot ${pivot} at index ${i + 1}`);
    await sleep(speed);
    return i + 1;
  }

  async function quickSortRecursive(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortRecursive(low, pi - 1);
      await quickSortRecursive(pi + 1, high);
    }
  }

  await quickSortRecursive(0, arr.length - 1);
  setSorted(arr.map((_, idx) => idx));
}
