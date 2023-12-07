const file = Bun.file(`${import.meta.dir}/input-7.txt`)

const input = await file.text()
const lines = input.split('\n').filter((line) => line)

function solve1() {
  const hands = lines.map((line) => {
    const [hand, bid] = line.split(' ')
    const cards = hand.split('').map((card) => {
      switch (card) {
        case 'T':
          return 10
        case 'J':
          return 11
        case 'Q':
          return 12
        case 'K':
          return 13
        case 'A':
          return 14
        default:
          return Number(card)
      }
    })

    const map: Record<string, number> = {}
    for (let i = 0; i < cards.length; i++) {
      map[cards[i]] = (map[cards[i]] || 0) + 1
    }

    let strength = 1
    const counts = Object.values(map)
    if (counts.length === 1) {
      strength = 7
    } else if (counts.length === 2 && counts.includes(4)) {
      strength = 6
    } else if (counts.length === 2 && counts.includes(3)) {
      strength = 5
    } else if (counts.includes(3)) {
      strength = 4
    } else if (counts.length === 3) {
      strength = 3
    } else if (counts.length === 4) {
      strength = 2
    }

    return {
      cards,
      bid: Number(bid),
      strength,
    }
  })

  const sorted = hands.sort((a, b) => {
    if (a.strength === b.strength) {
      for (let i = 0; i < 5; i++) {
        if (a.cards[i] === b.cards[i]) {
          continue
        }
        return a.cards[i] - b.cards[i]
      }
    }
    return a.strength - b.strength
  })

  return sorted.reduce((total, { bid }, index) => {
    return total + bid * (index + 1)
  }, 0)
}

console.log('Part 1', solve1())

function solve2() {
  const hands = lines.map((line) => {
    const [hand, bid] = line.split(' ')
    const cards = hand.split('').map((card) => {
      switch (card) {
        case 'T':
          return 10
        case 'J':
          return 1
        case 'Q':
          return 12
        case 'K':
          return 13
        case 'A':
          return 14
        default:
          return Number(card)
      }
    })

    const map: Record<string, number> = {}
    for (let i = 0; i < cards.length; i++) {
      map[cards[i]] = (map[cards[i]] || 0) + 1
    }

    if (map[1]) {
      const key = Object.keys(map).reduce((a, b) => {
        if (a === '1') return b
        return map[a] > map[b] ? a : b
      })
      map[key] = map[key] + map[1]
      // Make sure to only delete the J's when it's not five of a kind
      if (Object.keys(map).length !== 1) {
        delete map[1]
      }
    }

    let strength = 1
    const counts = Object.values(map)
    if (counts.length === 1) {
      strength = 7
    } else if (counts.length === 2 && counts.includes(4)) {
      strength = 6
    } else if (counts.length === 2 && counts.includes(3)) {
      strength = 5
    } else if (counts.includes(3)) {
      strength = 4
    } else if (counts.length === 3) {
      strength = 3
    } else if (counts.length === 4) {
      strength = 2
    }

    return {
      cards,
      bid: Number(bid),
      strength,
    }
  })

  const sorted = hands.sort((a, b) => {
    if (a.strength === b.strength) {
      for (let i = 0; i < 5; i++) {
        if (a.cards[i] === b.cards[i]) {
          continue
        }
        return a.cards[i] - b.cards[i]
      }
    }
    return a.strength - b.strength
  })

  return sorted.reduce((total, { bid }, index) => {
    return total + bid * (index + 1)
  }, 0)
}

console.log('Part 2', solve2())
