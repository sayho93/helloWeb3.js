import Web3 from 'web3'
import fs from 'fs/promises'

const web3 = new Web3('http://127.0.0.1:8545')

async function getBlocks() {
    const currentBlockNumber = await web3.eth.getBlockNumber()
    console.log('currentBlockNum: ', currentBlockNumber)

    const blocks = new Map()
    for (let i = 0; i <= currentBlockNumber; i++) {
        try {
            const block = await web3.eth.getBlock(i)
            blocks.set(i, block)
        } catch (error) {
            console.log(`error occurred reading block ${i}`)
            console.log(error)
        }
    }

    console.log(blocks)
    return blocks
}

async function getAccounts() {
    const accounts = await web3.eth.getAccounts()
    for (const account of accounts) {
        console.log(await web3.eth.getBalance(account))
    }
    return accounts
}

async function deploy(candidates, from, gas, gasPrice) {
    const byteCode = (await fs.readFile('voting_sol_Voting.bin')).toString()
    const abi = JSON.parse((await fs.readFile('voting_sol_Voting.abi')).toString())

    const deployedContract = new web3.eth.Contract(abi)

    const newContractInstance = await deployedContract
        .deploy({
            data: byteCode,
            arguments: [candidates.map(name => web3.utils.asciiToHex(name))],
        })
        .send({
            from,
            gas,
            gasPrice,
        })

    deployedContract.options.address = newContractInstance.options.address
    console.log(newContractInstance.options.address)

    return {
        deployedContract,
        newContractInstance,
    }
}

await getBlocks()
const accounts = await getAccounts()

const candidates = ['Rama', 'Nick', 'Jose']
const res = await deploy(candidates, accounts[0], 1500000, web3.utils.toWei('0.00003', 'ether'))

let totalVotesForRama = await res.deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Rama')).call()
console.log('totalVotesForRama: ', totalVotesForRama)

const f = await res.deployedContract.methods.voteForCandidate(web3.utils.asciiToHex('Rama')).send({from: accounts[0]})
console.log(f)

totalVotesForRama = await res.deployedContract.methods.totalVotesFor(web3.utils.asciiToHex('Rama')).call()
console.log('totalVotesForRama: ', totalVotesForRama)

await getBlocks()
await getAccounts()
