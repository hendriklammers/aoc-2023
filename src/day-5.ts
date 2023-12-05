const file = Bun.file(`${import.meta.dir}/input-5.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

function createMaps() {
  const map: Record<string, number[][]> = {}

  const regex = /(\w+-to-\w+) map:\n((\d+(\s\d+){2}\n)+)/g

  let match
  while ((match = regex.exec(input)) !== null) {
    const key = match[1]
    const values = match[2]
      .trim()
      .split('\n')
      .map((line) => line.split(' ').map(Number))
      .sort((a, b) => a[1] - b[1])
    map[key] = values
  }

  return map
}

const map = createMaps()

function getLocation(seed: number) {
  let seedValue = seed
  Object.values(map).forEach((values) => {
    for (let i = 0; i < values.length; i++) {
      const [destination, source, range] = values[i]
      if (seedValue < source + range && seedValue >= source) {
        seedValue = destination + (seedValue - source)
        break
      }
    }
  })
  return seedValue
}

function solve1() {
  const seeds = lines[0].split(':')[1].trim().split(' ').map(Number)

  return Math.min(...seeds.map(getLocation))
}

console.log('Part 1', solve1())

function solve2() {
  const seedRanges = lines[0].split(':')[1].trim().split(' ').map(Number)

  let min
  for (let i = 0; i < seedRanges.length; i += 2) {
    // Bruteforcing it for now, might come up with a smarter solution later
    for (let j = seedRanges[i]; j <= seedRanges[i] + seedRanges[i + 1]; j++) {
      const location = getLocation(j)
      if (min === undefined || location < min) {
        min = location
      }
    }
  }

  return min
}

console.log('Part 2', solve2())
