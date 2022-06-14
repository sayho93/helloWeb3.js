import {VoteInfo} from './components/voteInfo.js'
import {VoteForm} from './components/voteForm.js'
import {AccountInfo} from './components/accountInfo.js'
import {BlockInfo} from './components/blockInfo.js'

export default function App({$app, $web3}) {
    this.$title = document.createElement('h1')
    this.$title.innerText = 'A Simple Hello World Voting Application'
    $app.appendChild(this.$title)

    this.state = {
        contract: null,
        account: null,

        candidates: [],
        votes: [],
        inputText: '',

        accounts: [],
        blocks: [],
    }

    const getAccounts = async () => {
        const accounts = await $web3.eth.getAccounts()
        for (const account of accounts) {
            console.log(await $web3.eth.getBalance(account))
        }

        const ret = []
        await Promise.all(
            accounts.map(async account => {
                const balance = await $web3.eth.getBalance(account)
                ret.push({
                    account,
                    balance,
                })
            })
        )
        console.log(ret)
        this.setState({
            ...this.state,
            accounts: ret,
        })
    }

    const getBlocks = async () => {
        const currentBlockNumber = await $web3.eth.getBlockNumber()
        console.log('currentBlockNum: ', currentBlockNumber)

        const blocks = []
        for (let i = 0; i <= currentBlockNumber; i++) {
            try {
                blocks.push(await $web3.eth.getBlock(i))
            } catch (error) {
                console.log(`error occurred reading block ${i}`)
                console.log(error)
            }
        }

        this.setState({
            ...this.state,
            blocks,
        })
    }

    const voteInfo = new VoteInfo({
        $app,
        initialState: {
            candidates: this.state.candidates,
            votes: this.state.votes,
        },
    })

    const voteForm = new VoteForm({
        $app,
        initialState: this.state.inputText,
        textHandler: text => {
            this.setState({
                ...this.state,
                inputText: text,
            })
        },
        onClick: async () => {
            const candidateName = this.state.inputText
            console.log(candidateName)

            await this.state.contract.methods.voteForCandidate($web3.utils.asciiToHex(candidateName)).send({from: this.state.account})
            const voteCnt = await this.state.contract.methods.totalVotesFor($web3.utils.asciiToHex(candidateName)).call()

            const idx = this.state.candidates.indexOf(candidateName)

            const votes = [...this.state.votes]
            votes[idx] = voteCnt

            this.setState({
                ...this.state,
                votes,
            })

            await Promise.all([getAccounts(), getBlocks()])
        },
    })

    const accountInfo = new AccountInfo({
        $app,
        initialState: this.state.accounts,
        onClick: getAccounts,
    })

    const blockInfo = new BlockInfo({
        $app,
        initialState: this.state.blocks,
        onClick: getBlocks,
    })

    this.setState = nextState => {
        this.state = nextState
        voteInfo.setState({
            candidates: this.state.candidates,
            votes: this.state.votes,
        })
        voteForm.setState(this.state.inputText)
        accountInfo.setState(this.state.accounts)
        blockInfo.setState(this.state.blocks)
    }

    const init = async () => {
        const abi = JSON.parse(
            '[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
        )

        const contract = new $web3.eth.Contract(abi)
        contract.options.address = '0x7A0C14b9bDEd496dc068Ea2C2E80Fa2Be84f50ea'

        const account = (await $web3.eth.getAccounts())[0]

        const candidates = {Rama: 'candidate-1', Nick: 'candidate-2', Jose: 'candidate-3'}
        const candidateNames = Object.keys(candidates)

        const votes = []

        for (var i = 0; i < candidateNames.length; i++) {
            const name = candidateNames[i]
            const voteCnt = await contract.methods.totalVotesFor($web3.utils.asciiToHex(name)).call()
            votes.push(voteCnt)
        }

        this.setState({
            ...this.state,
            contract,
            account,
            candidates: candidateNames,
            votes,
        })

        console.log(this.state)
    }

    init().then(() => console.log('initialized'))
}
