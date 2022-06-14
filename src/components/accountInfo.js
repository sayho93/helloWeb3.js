export function AccountInfo({$app, initialState, onClick}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'mt-2'

    this.$display = document.createElement('div')
    this.$display.className = 'accountInfo'
    this.$target.appendChild(this.$display)

    this.$button = document.createElement('a')
    this.$button.className = 'btn btn-primary'
    this.$button.innerText = 'Get Accounts'
    this.$target.appendChild(this.$button)

    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$display.innerHTML = this.state.map(({account, balance}) => `<p>${account} - balance: ${balance}</p>`).join('')
        const template = /*html*/ `
            <div id="accountInfo"></div>
            <a href="#" onclick="getAccounts()" class="btn btn-primary mt-2">Account Info</a>
        `
    }

    this.$button.addEventListener('click', event => {
        event.preventDefault()
        onClick()
    })

    this.render()
}
