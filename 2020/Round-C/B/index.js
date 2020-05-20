  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  let testCases
  let test = 1
  let R, C
  let A = []

  function topoSort(adj, incoming, nodes) {
    let s = Object.keys(nodes).filter(n => !incoming[n])
    if (!s.length) {
      return ''
    }
    let res = ''
    for (const ss of s) {
      let Q = [ss]
      while (Q.length) {
        const current = Q.shift()
        res += current
        const children = !!adj[current] ? adj[current] : []
        for (const child of children) {
          incoming[child]--
          if (incoming[child] === 0) {
            Q.push(child)
          }
        }
      }
    }
    
    const vals = Object.keys(incoming)
    for (const v of vals) {
      if (incoming[v] > 0) {
        return ''
      }
    }
    return res
  }

  function solve(R, C, A) {
    let adj = {}
    let incoming = {}
    let nodes = {}
    for (let i = (A.length-1); i >= 0; i--) {
      for (let j = 0; j < C; j++) {
        if (!nodes[A[i][j]]) {
          nodes[A[i][j]] = true
        }

        if ((i+1) < A.length && A[i][j] !== A[i+1][j]) {
          if (adj[A[i+1][j]]) {
            const found = adj[A[i+1][j]].findIndex(e => e === A[i][j])
            if (found === -1) {
              adj[A[i+1][j]].push(A[i][j])
              if (incoming[A[i][j]]) {
                incoming[A[i][j]]++
              } else {
                incoming[A[i][j]] = 1
              }
            }
          } else {
            adj[A[i+1][j]] = [A[i][j]]
            if (incoming[A[i][j]]) {
              incoming[A[i][j]]++
            } else {
              incoming[A[i][j]] = 1
            }
          }
        }
      }
    }
    const res = topoSort(adj, incoming, nodes)
    return res === '' ? -1 : res
  }

  rl.on('line', line => {
    if (typeof testCases === 'undefined') {
      testCases = parseInt(line)
      return
    }
    if (typeof R === 'undefined' && typeof C === 'undefined') {
      const [r, c] = line.split(' ').map(l => parseInt(l))
      R = r
      C = c
      return
    }
    A.push(line)
    if (A.length !== R) {
      return
    }
    const ans = solve(R, C, A)
    console.log(`Case #${test}: ${ans}`)
    test++
    R = undefined
    C = undefined
    A = []
    if (test > testCases) {
      process.exit()
    }
  })