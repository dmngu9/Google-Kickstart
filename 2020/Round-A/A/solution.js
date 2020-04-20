const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases 
let test = 1

let N, B

function solve (N, B, costs) {
  costs.sort((a, b) => a - b)
  let count = 0
  let budget = B
  for (const c of costs) {
    if (budget - c >= 0) {
      count++
      budget = budget - c
    } else {
      break
    }
  }
  return count
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined' && typeof B === 'undefined') {
    const secondLine = line.split(' ').map(l => parseInt(l))
    N = secondLine[0]
    B = secondLine[1]
    return
  }
  const costs = line.split(' ').map(l => parseInt(l))
  const ans = solve(N, B, costs)

  console.log(`Case #${test}: ${ans}`)
  N = undefined
  B = undefined
  test++
  if (test > testCases) {
    process.exit()
  }
})