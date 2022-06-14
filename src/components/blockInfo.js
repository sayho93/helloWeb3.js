export function BlockInfo({$app, initialState, onClick}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'mt-2'

    this.$display = document.createElement('div')
    this.$display.className = 'blockInfo'
    this.$target.appendChild(this.$display)

    this.$button = document.createElement('a')
    this.$button.className = 'btn btn-primary'
    this.$button.innerText = 'Get Blocks'
    this.$target.appendChild(this.$button)

    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$display.innerHTML = /*html*/ `
            <ul class="list-group">
                ${this.state.map(
                    value => /*html*/ `
                    <li class="list-group-item"><pre>${JSON.stringify(value, undefined, 2)}</pre></li>
                `
                )}
            </ul>
        `
    }

    this.$button.addEventListener('click', event => {
        onClick()
    })

    this.render()
}
