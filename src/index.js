import App from './App.js'
import Web3 from 'web3'

import './assets/styles/style.css'
import 'bootstrap-dark-5/dist/css/bootstrap-dark.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import('bootstrap/dist/js/bootstrap.bundle.js')

import Img from './assets/imgs/971.jpeg'
// dotenv.config()

if (!process.env.ADDRESS) {
    alert('Please set the ADDRESS environment variable')
}

const $test = document.createElement('div')
$test.innerHTML = /*html*/ `
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="${Img}" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="${Img}" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="${Img}" class="d-block w-100">
        </div>
    </div>
    </div>
    <i class="bi bi-link"></i>
`
document.querySelector('#App').appendChild($test)

export const test = new App({
    $app: document.querySelector('#App'),
    $web3: new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
})
