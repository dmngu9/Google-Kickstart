const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1
let N
let A

function solve(N, A) {
  let range = 0
  for (const a of A) {
    if (a > 0) {
      range += a
    }
  }
  let sum = 0
  let map = new Map
  map.set(0, 1)
  let count = 0
  for (const a of A) {
    sum += a
    for (let i = 0; i*i <= range; i++) {
      const need = sum - i*i
      if (map.has(need)) {
        count += map.get(need)
      }
    }
    if (map.has(sum)) {
      map.set(sum, map.get(sum) + 1)
    } else {
      map.set(sum, 1)
    }
  }
  return count
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined') {
    N = parseInt(line)
    return
  }
  A = line.split(' ').map(l => parseInt(l))
  const ans = solve(N, A)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  A = undefined
  if (test > testCases) {
    process.exit()
  }
})