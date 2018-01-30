import { Link } from 'react-router-dom'

class Signin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      pwd: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleError (res) {
    if (res.message === 'required field is not filled') {
      this.setState({ error: 'Required field is not filled' })
      return
    }

    this.setState({ error: res })
  }

  handleChange (event) {
    let target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ error: '' })

    if (!this.state.name ||
    !this.state.pwd
    ) {
      this.handleError({message: 'required field is not filled'})
      return
    }

    let reqData = {
      username: this.state.name,
      password: this.state.pwd
    }

    fetch('/api/auth/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: 'same-origin',
      body: JSON.stringify(reqData)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.type === 'ok') this.props.channgeUser(res.arg.username)
        if (res.type === 'error') this.handleError(res.message)
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div>
        <h2>Singnin form</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
            Name:
              <br/><input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
            </label><br/>
            <label>
            Password:
              <br/><input type="text" value={this.state.pwd} onChange={this.handleChange} name="pwd" />
            </label><br/>
            <label>
              <br/><input type="submit"/>
            </label>
          </p>
          {this.state.error
            ? <p class="form-error">{this.state.error}</p>
            : null
          }
        </form>
        <p>New user? <Link to="/signup">Create an account</Link></p>
      </div>
    )
  }
}

export default Signin
