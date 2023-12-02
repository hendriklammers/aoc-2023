const file = Bun.file(`${import.meta.dir}/input-2.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

type Color = 'red' | 'green' | 'blue'

function getMaxColor(str: string, color: Color) {
  const regex = new RegExp(`(\\d+) ${color}`, 'g')
  const colorMatch = str.match(regex)
  let maxValue = 0
  if (colorMatch && colorMatch?.length) {
    maxValue = colorMatch.reduce((max, match) => {
      if (parseInt(match, 10) > max) {
        return parseInt(match, 10)
      }
      return max
    }, 0)
  }
  return maxValue
}

const POSSIBLE_RED = 12
const POSSIBLE_GREEN = 13
const POSSIBLE_BLUE = 14

function solve1() {
  let total = 0

  lines.forEach((line, index) => {
    const id = index + 1
    if (
      getMaxColor(line, 'red') <= POSSIBLE_RED &&
      getMaxColor(line, 'green') <= POSSIBLE_GREEN &&
      getMaxColor(line, 'blue') <= POSSIBLE_BLUE
    ) {
      total += id
    }
  })

  return total
}

console.log('Part 1', solve1())

function solve2() {
  let total = 0

  lines.forEach((line) => {
    total +=
      getMaxColor(line, 'red') *
      getMaxColor(line, 'green') *
      getMaxColor(line, 'blue')
  })

  return total
}

console.log('Part 2', solve2())
