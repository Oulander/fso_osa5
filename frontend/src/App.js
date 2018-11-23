import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      successMessage: null,
      failureMessage: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user})
    } catch(exception){
      this.setFailureMessage('Incorrect username or password')
    }
  }

  setSuccessMessage = (message) => {
    this.setState({successMessage: message})

    setTimeout(() => {
      this.setState({successMessage: null})
    }, 5000)
  }

  setFailureMessage = (message) => {
    this.setState({failureMessage: message})
    setTimeout(() => {
      this.setState({failureMessage: null})
    }, 5000)
  }

  render() {
    if (this.state.user === null){
      return (
          <div>
            <h2>Log in</h2>
            <Login
              username={this.state.username}
              password={this.state.password}
              onChange={this.handleLoginFieldChange}
              login={this.login}
              failureMessageState = {this.state.failureMessage}
            />
          </div>
      );
    }
    return (
        <div>
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
    );
  }
}

export default App;
