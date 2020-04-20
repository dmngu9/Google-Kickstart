const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let test = 1
let testCases 

const mod = 1e9

function distance(command) {
  let S = []
  let dx = 0, dy = 0
  for (let i = 0; i < command.length; i++) {
    if (command[i] === '(') {
      S.push([dx, dy, command[i-1]])
      dx = dy = 0
    } else if (command[i] === ')') {
      const [x, y, n] = S.pop()
      dx = (x + dx * n) % mod
      dy = (y + dy * n) % mod
    } else if (command[i] === 'N') {
      dy = (dy - 1) % mod
    } else if (command[i] === 'S') {
      dy = (dy + 1) % mod
    } else if (command[i] === 'W') {
      dx = (dx - 1) % mod
    } else if (command[i] === 'E') {
      dx = (dx + 1) % mod
    }
  }
  return [dx, dy]
}

function solve(command) {
  const [dx, dy] = distance(command)
  let x = (1 + dx) % mod
  let y = (1 + dy) % mod
  if (x < 0) {
    x = mod + x
  } else if (x === 0) {
    x = mod
  }
  if (y < 0) {
    y = mod + y
  } else if (y === 0) {
    y = mod
  }
  return [x , y]
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  const command = line
  const [x, y] = solve(command)
  const ans = `Case #${test}: ${x} ${y}`
  console.log(ans)
  test++
  if (test > testCases) {
    process.exit()
  }
})