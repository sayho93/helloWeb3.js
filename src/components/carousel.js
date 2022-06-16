import Img from '../assets/imgs/971.jpeg'

export function Carousel({$app}) {
    this.$target = document.createElement('div')

    this.$target.innerHTML = /*html*/ `
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
        <div class="text-center mb-2">
        <i class="bi bi-link big-icon"></i>
        </div>        
    `
    $app.appendChild(this.$target)
}
