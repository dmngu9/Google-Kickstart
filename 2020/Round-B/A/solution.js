const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let test = 1
let testCases 
let N 

function solve(C) {
  let count = 0
  for (let i = 0; i < C.length; i++) {
    if (i === 0 || i === C.length - 1) {
      continue
    }
    if (C[i] > C[i-1] && C[i] > C[i+1]) {
      count++
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

  const c = line.split(' ').map(l => parseInt(l))
  const ans = solve(c)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  if (test > testCases) {
    process.exit()
  }
})