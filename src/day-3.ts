const file = Bun.file(`${import.meta.dir}/input-3.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

const SYMBOL_PATTERN = /[^\w\d\s.]/

function solve1() {
  const grid = lines.map((line) => line.split(''))
  let total = 0

  lines.forEach((line, y) => {
    const matches = [...line.matchAll(/\d+/g)]
    matches.forEach((match) => {
      let isPart = false
      if (match.index === undefined) return
      for (let x = match.index; x < match.index + match[0].length; x++) {
        if (
          SYMBOL_PATTERN.test(grid[y][x - 1] || '') ||
          SYMBOL_PATTERN.test(grid[y][x + 1] || '') ||
          SYMBOL_PATTERN.test(grid[y - 1]?.[x] || '') ||
          SYMBOL_PATTERN.test(grid[y - 1]?.[x - 1] || '') ||
          SYMBOL_PATTERN.test(grid[y - 1]?.[x + 1] || '') ||
          SYMBOL_PATTERN.test(grid[y + 1]?.[x] || '') ||
          SYMBOL_PATTERN.test(grid[y + 1]?.[x - 1] || '') ||
          SYMBOL_PATTERN.test(grid[y + 1]?.[x + 1] || '')
        ) {
          isPart = true
        }
      }
      if (isPart) {
        total += parseInt(match[0], 10)
      }
    })
  })

  return total
}

console.log('Part 1', solve1())

function solve2() {
  let total = 0

  lines.forEach((line, y) => {
    const matches = [...line.matchAll(/\*/g)]
    matches.forEach((match) => {
      const parts: number[] = []
      const gearStart = Math.max((match.index ?? 0) - 1, 0)
      const gearEnd = gearStart + 2

      for (let index = y - 1; index <= y + 1; index++) {
        const numberMatches = [...lines[index].matchAll(/\d+/g)]
        numberMatches.forEach((numberMatch) => {
          const numberStart = numberMatch.index ?? 0
          const numberEnd = numberStart + numberMatch[0].length - 1

          if (numberEnd >= gearStart && numberStart <= gearEnd) {
            parts.push(parseInt(numberMatch[0], 10))
          }
        })
      }

      if (parts.length === 2) {
        total += parts[0] * parts[1]
      }
    })
  })

  return total
}

console.log('Part 2', solve2())
