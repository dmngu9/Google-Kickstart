const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1
let N, Q
let A
let O = []

function buildTree(segmentTree, index, ss, se, A) {
  if (ss === se) {
    segmentTree[index] = A[ss]
    return
  }
  const mid = Math.floor((se - ss) / 2) + ss
  buildTree(segmentTree, 2*index+1, ss, mid, A)
  buildTree(segmentTree, 2*index+2, mid+1, se, A)
  segmentTree[index] = segmentTree[2*index+1] + segmentTree[2*index+2]
}

function query(segmentTree, index, ss, se, qs, qe) {
  // out of range
  if (qe < ss || qs > se) {
    return 0
  }
  // segment interval within query range
  if (ss >= qs && se <= qe) {
    return segmentTree[index]
  }
  const mid = Math.floor((se - ss) / 2) + ss
  const left = query(segmentTree, 2*index+1, ss, mid, qs, qe)
  const right = query(segmentTree, 2*index+2, mid+1, se, qs, qe)
  return left + right
}

function update(segmentTree, index, ss, se, qi, val) {
  if (ss === se) {
    segmentTree[index] = val
    return
  }
  const mid = Math.floor((se - ss) / 2) + ss
  if (qi <= mid) {
    update(segmentTree, 2*index+1, ss, mid, qi, val)
  } else {
    update(segmentTree, 2*index+2, mid + 1, se, qi, val)
  }
  segmentTree[index] = segmentTree[2*index+1] + segmentTree[2*index+2]
}

function solve(N, Q, A, O) {
  let S = new Array(N)
  let MS = new Array(N)
  for (let i = 0; i < A.length; i++) {
    S[i] = Math.pow(-1, i) * A[i]
    MS[i] = Math.pow(-1, i) * A[i] * (i+1)
  }
  const treeSize = 2 * Math.pow(2, Math.ceil(Math.log2(N))) - 1
  let T = new Array(treeSize).fill(0)
  let MT = new Array(treeSize).fill(0)
  buildTree(T, 0, 0, N - 1, S)
  buildTree(MT, 0, 0, N - 1, MS)

  // process operations
  let ans = 0
  for (const q of O) {
    let [ops, n1, n2] = q
    n1 = parseInt(n1, 10)
    n2 = parseInt(n2, 10)
    if (ops === 'Q') {
      const rangeSumT = query(T, 0, 0, N - 1, n1 - 1, n2 - 1)
      const rangeSumMT = query(MT, 0, 0, N - 1, n1 - 1, n2 - 1)
      const sum = Math.pow(-1, n1 - 1) * (rangeSumMT - (n1-1) * rangeSumT)
      ans += sum
    } else {
      const updateValT = Math.pow(-1, n1 - 1) * n2
      const updateValMT = Math.pow(-1, n1 - 1) * n1 * n2
      update(T, 0, 0, N - 1, n1 - 1, updateValT)
      update(MT, 0, 0, N - 1, n1 - 1, updateValMT)
    }
  }
  return ans
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined' && typeof Q === 'undefined') {
    const [n, q] = line.split(' ').map(l => parseInt(l))
    N = n,
    Q = q
    return
  }
  if (typeof A === 'undefined') {
    A = line.split(' ').map(l => parseInt(l))
    return
  }
  O.push(line.split(' '))
  if (O.length !== Q) {
    return
  }
  const ans = solve(N, Q, A, O)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  Q = undefined
  A = undefined
  O = []
  if (test > testCases) {
    process.exit()
  }
})