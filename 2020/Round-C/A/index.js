const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1
let N, K
let A

function solve(N, K, A) {
  let count = 0
  let res = 0
  for (let i = 0; i < A.length; i++) {
    if (count === 0) {
      if (A[i] === K) {
        count++
        if (count === K && A[i] === 1) {
          res++
          count = 0
        } 
      }
    } else {
      if ((A[i-1] - 1) === A[i]) {
        count++
        if (count === K && A[i] === 1) {
          res++
          count = 0
        } 
      } else {
        count = 0
        if (A[i] === K) {
          count = 1
        }
      }
    }
  }
  return res
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined' && typeof K === 'undefined') {
    const [n, k] = line.split(' ').map(l => parseInt(l))
    N = n
    K = k
    return
  }
  A = line.split(' ').map(l => parseInt(l))
  const ans = solve(N, K, A)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  K = undefined
  A = undefined
  if (test > testCases) {
    process.exit()
  }
})