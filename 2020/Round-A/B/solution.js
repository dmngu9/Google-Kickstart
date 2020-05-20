const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases 
let test = 1
let N, P, K
let S = []

function beauty(N, P, S, index) {
  if (P === 0 || index >= N) {
    return 0
  }
}

function solve (N, K, P, S) {
  
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined') {
    const [n, k, p] = line.split(' ').map(l => parseInt(l))
    N = n
    K = k
    P = p
    return
  }
  S.push(line.split(' ').map(l => parseInt(l)))
  if (S.length < N) {
    return
  }
  const ans = solve(N, K, P, S)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = K = P = undefined
  S = []
  if (test > testCases) {
    process.exit()
  }
})