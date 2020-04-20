const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases 
let test = 1

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }

  console.log(`Case #${test}: ${ans}`)

  test++
  if (test > testCases) {
    process.exit()
  }
})