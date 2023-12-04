const file = Bun.file(`${import.meta.dir}/input-4.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

function getCardNumbers(line: string) {
  const [cardString, myNumbersString] = line.split('|')
  const [, winningNumbersString] = cardString.split(':')

  const winningNumbers = winningNumbersString
    .trim()
    .split(/\s+/)
    .map((num) => parseInt(num, 10))
  const myNumbers = myNumbersString
    .trim()
    .split(/\s+/)
    .map((num) => parseInt(num, 10))

  return [winningNumbers, myNumbers]
}

function solve1() {
  return lines.reduce((total, line) => {
    const [winningNumbers, myNumbers] = getCardNumbers(line)

    const cardScore = myNumbers.reduce((score, num) => {
      if (winningNumbers.includes(num)) {
        if (score < 1) {
          return 1
        } else {
          return score * 2
        }
      }
      return score
    }, 0)

    if (cardScore) {
      return (total += cardScore)
    }
    return total
  }, 0)
}

console.log('Part 1', solve1())

function solve2() {
  const totalCards: Record<number, number> = {}

  lines.forEach((line, index) => {
    const [winningNumbers, myNumbers] = getCardNumbers(line)

    const cardScore = myNumbers.reduce(
      (score, num) => (winningNumbers.includes(num) ? score + 1 : score),
      0
    )

    totalCards[index] = (totalCards[index] || 0) + 1
    for (let j = 0; j < totalCards[index]; j++) {
      for (let i = 1; i <= cardScore; i++) {
        totalCards[index + i] = (totalCards[index + i] || 0) + 1
      }
    }
  })

  return Object.values(totalCards).reduce((sum, value) => sum + value, 0)
}

console.log('Part 2', solve2())
