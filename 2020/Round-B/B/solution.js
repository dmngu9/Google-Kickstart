const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let test = 1
let testCases 
let N, D

function solve(D, X) {
  let max = D
  for (let i = X.length - 1; i >= 0; i--) {
    const potentialMax = parseInt(max / X[i]) * X[i]
    max = potentialMax
  }
  return max
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined' && typeof D === 'undefined') {
    const [x, y] = line.split(' ').map(l => parseInt(l))
    N = x
    D = y
    return
  }

  const X = line.split(' ').map(l => parseInt(l))
  const ans = solve(D, X)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  D = undefined
  if (test > testCases) {
    process.exit()
  }
})