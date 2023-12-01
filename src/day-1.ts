const file = Bun.file(`${import.meta.dir}/input-1.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

function solve1() {
  return lines.reduce((total, line) => {
    const first = line
      .split('')
      .find((char) => !Number.isNaN(parseInt(char, 10)))
    const last = line
      .split('')
      .toReversed()
      .find((char) => !Number.isNaN(parseInt(char, 10)))
    const value = parseInt(`${first}${last}`, 10)
    return total + value
  }, 0)
}

console.log('Part 1', solve1())

const NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function solve2() {
  return lines.reduce((total, line) => {
    const pattern = /(one|two|three|four|five|six|seven|eight|nine|[1-9])/gi
    const numbersInLine = []

    let match
    while ((match = pattern.exec(line)) !== null) {
      pattern.lastIndex -= match[0].length - 1
      numbersInLine.push(match[0])
    }

    const first = NUMBERS[numbersInLine[0]] || parseInt(numbersInLine[0], 10)
    const last =
      NUMBERS[numbersInLine[numbersInLine.length - 1]] ||
      parseInt(numbersInLine[numbersInLine.length - 1], 10)
    const value = parseInt(`${first}${last}`, 10)
    return total + value
  }, 0)
}

console.log('Part 2', solve2())
