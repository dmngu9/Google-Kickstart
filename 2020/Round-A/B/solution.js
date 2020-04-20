const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases 
let test = 1

let N, K, P // where N is number of stacks . K is stack size. P is number of plates need to choose. Each element in stack has a value
let stacks = 1
let S = []

function DFS (N, S, memo) {
  if (memo[`${N}-${S.toString()}`]) {
    console.log(N, S)
    return memo[`${N}-${S.toString()}`]
  }
  if (N === 0) {
    return 0
  }
  let max = -1
  for (let i = 0; i < S.length; i++) {
    if (!S[i].length) {
      continue
    }
    let tempS = [...S]
    tempS[i] = [...tempS[i].slice(1)]
    let sum = DFS(N - 1, tempS, memo)
    sum = sum + S[i][0]
    if (sum > max) {
      max = sum
    }
  }
  memo[`${N}-${S.toString()}`] = max
  return max
}

function solve (N, K, P, S) {
  let memo = {}
  return DFS(P, S, memo)
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined' && typeof K === 'undefined' && typeof P === 'undefined') {
    const [a, b, c] = line.split(' ').map(l => parseInt(l))
    N = a
    K = b
    P = c
    return
  }
  const stack = line.split(' ').map(l => parseInt(l))
  S.push(stack)
  stacks++
  if (stacks <= N) {
    return
  }

  const ans = solve(N, K, P, S)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  K = undefined
  P = undefined
  stacks = 1
  S = []
  if (test > testCases) {
    process.exit()
  }
})