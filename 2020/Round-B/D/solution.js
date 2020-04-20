const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let test = 1
let testCases 

function invalidSquare(pos, L, U, R, D) {
  const [row, col] = pos 
  return row >= U && row <= D && col >= L && col <= R
}

function getValue(pos, memo, W, H, L, U, R, D) {
  let up = 0, left = 0
  const [row, col] = pos
  if ((row - 1) > 0 && !invalidSquare([row-1, col], L, U, R, D)) {
    let factor = col === W ? 1 : 0.5
    if (typeof memo[`${row-1}-${col}`] !== 'undefined') {
      up = memo[`${row-1}-${col}`] * factor
    }
  }
  if ((col - 1) > 0 && !invalidSquare([row, col-1], L, U, R, D)) {
    let factor = row === H ? 1 : 0.5
    if (typeof memo[`${row}-${col-1}`] !== 'undefined') { 
      left = memo[`${row}-${col-1}`] * factor
    }
  }
  if (left === 0 && up === 0 && row !== H && col !== W) {
    return
  }
  memo[`${row}-${col}`] = up + left
}

function solve(W, H, L, U, R, D) {
  let memo = {'1-1': 1}
  for (let row = 1; row <= H; row++) {
    for (let col = 1; col <= W; col++) {
      if (row === 1 && col === 1) {
        continue
      }
      if (invalidSquare([row, col], L, U, R, D)) {
        continue
      }
      getValue([row, col], memo, W, H, L, U, R, D)
    }
  }
  return memo[`${H}-${W}`]
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  const [W, H, L, U, R, D] = line.split(' ').map(l => parseInt(l))
  const ans = solve(W, H, L, U, R, D)
  console.log(`Case #${test}: ${ans}`)
  test++
  if (test > testCases) {
    process.exit()
  }
})