export function VoteInfo({$app, initialState}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'table-responsive'

    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const template = /*html*/ `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.state.candidates
                        .map((candidate, idx) => {
                            return /*html*/ `
                            <tr>
                                <td>${candidate}</td>
                                <td>${this.state.votes[idx]}</td>
                            </tr>        
                        `
                        })
                        .join('')}
                </tbody>
            </table>
        `
        this.$target.innerHTML = template
    }

    this.render()
}
