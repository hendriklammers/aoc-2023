const file = Bun.file(`${import.meta.dir}/input-6.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

function getNumberOfWins(time: number, distance: number) {
  let wins = 0
  for (let speed = 1; speed < time; speed++) {
    const distanceTraveled = speed * (time - speed)
    if (distanceTraveled > distance) {
      wins += 1
    }
  }
  return wins
}

function solve1() {
  const races = lines[0]
    .split(/\s+/)
    .splice(1)
    .map((time, index) => ({
      time: Number(time),
      distance: Number(lines[1].split(/\s+/).splice(1)[index]),
    }))

  return races.reduce(
    (total, { time, distance }) => total * getNumberOfWins(time, distance),
    1
  )
}

console.log('Part 1', solve1())

function solve2() {
  const time = Number(lines[0].split(':')[1].replaceAll(' ', ''))
  const distance = Number(lines[1].split(':')[1].replaceAll(' ', ''))

  return getNumberOfWins(time, distance)
}

console.log('Part 2', solve2())
