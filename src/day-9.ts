const file = Bun.file(`${import.meta.dir}/input-9.txt`)

const input = await file.text()
const lines = input
  .split('\n')
  .filter((line) => line)
  .map((line) => line.split(' ').map(Number))

function solve1() {
  function findNextValue(numbers: number[]): number {
    if (numbers.every((num: number) => num === 0)) {
      return 0
    }

    const differences = numbers
      .map((x, i) => x - (numbers[i - 1] || 0))
      .slice(1)

    return (numbers.at(-1) || 0) + findNextValue(differences)
  }

  return lines.map(findNextValue).reduce((sum, value) => sum + value)
}

console.log('Part 1', solve1())

function solve2() {
  function findPrevValue(numbers: number[]): number {
    if (numbers.every((num: number) => num === 0)) {
      return 0
    }

    const differences = numbers
      .map((x, i) => x - (numbers[i - 1] || 0))
      .slice(1)

    return (numbers[0] || 0) - findPrevValue(differences)
  }

  return lines.map(findPrevValue).reduce((sum, value) => sum + value)
}

console.log('Part 2', solve2())
