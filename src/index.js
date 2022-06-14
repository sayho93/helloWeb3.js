import App from './App.js'

export const test = new App({
    $app: document.querySelector('#App'),
    $web3: new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
})
