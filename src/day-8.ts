const file = Bun.file(`${import.meta.dir}/input-8.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

type NodesMap = Record<string, { left: string; right: string }>

const instructions = lines[0].split('')
const nodes: NodesMap = lines.slice(1).reduce((acc, line) => {
  const matches = [...line.matchAll(/[A-Z]{3}/g)].flat()
  acc[matches[0]] = {
    left: matches[1],
    right: matches[2],
  }
  return acc
}, {} as NodesMap)

function solve1() {
  let stepCount = 0
  let current = 'AAA'

  while (current !== 'ZZZ') {
    if (instructions[stepCount % instructions.length] === 'L') {
      current = nodes[current].left
    } else {
      current = nodes[current].right
    }
    stepCount++
  }

  return stepCount
}

console.log('Part 1', solve1())

// Greatest common divisor
const gcd = (a, b) => (!b ? a : gcd(b, a % b))

// Least common multiple
const lcm = (a, b) => (a * b) / gcd(a, b)

function solve2() {
  const startingNodes = Object.keys(nodes).filter((key) => key.endsWith('A'))

  const combinedSteps: number[] = []

  startingNodes.forEach((startNode) => {
    let stepCount = 0
    let current = startNode

    while (!current.endsWith('Z')) {
      if (instructions[stepCount % instructions.length] === 'L') {
        current = nodes[current].left
      } else {
        current = nodes[current].right
      }
      stepCount++
    }

    combinedSteps.push(stepCount)
  })

  return combinedSteps.reduce((acc, cycle) => lcm(acc, cycle), 1)
}

console.log('Part 2', solve2())
