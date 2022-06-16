import App from './App.js'
import Web3 from 'web3'

import './assets/styles/style.css'
import 'bootstrap-dark-5/dist/css/bootstrap-dark.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import('bootstrap/dist/js/bootstrap.bundle.js')

if (!process.env.ADDRESS) {
    alert('Please set the ADDRESS environment variable')
}

export const test = new App({
    $app: document.querySelector('#App'),
    $web3: new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
})
