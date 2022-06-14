export function VoteForm({$app, initialState, textHandler, onClick}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'row'

    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const template = /*html*/ `
            <div class="col-auto">
                <input type="text" id="candidate" class="form-control" value="${this.state}" />
            </div>
            <div class="col-auto">
                <a href="#" class="btn btn-primary">Vote</a>
            </div>
        `
        this.$target.innerHTML = template

        const input = this.$target.querySelector('#candidate')

        input.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                onClick()
                return
            }

            textHandler(event.target.value)
        })

        const button = this.$target.querySelector('a')
        button.addEventListener('click', event => {
            event.preventDefault()
            onClick()
        })
    }

    this.render()
}
