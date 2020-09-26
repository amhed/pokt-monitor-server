import BigNumber from 'bignumber.js'

const nodeList = require('./node_list.json').result

const total = nodeList.length
const jailed = nodeList.filter((n: any) => n.jailed)
const working = nodeList.filter((n: any) => !n.jailed).map((n: any) => ({
  ...n,
  tokens: new BigNumber(n.tokens).dividedBy(10**6)
}))

console.log(`Total nodes: ${total}`)
console.log(`Total jailed: ${jailed.length}`)
console.log(`Total online: ${working.length}`)

working.sort((a: any, b: any) => b.tokens.minus(a.tokens))
working.forEach((n: any) => {
  console.log(n.tokens.toFormat(2), n.service_url)
})