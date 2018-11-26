import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: "jou",
      successMessage: null,
      failureMessage: null
    }
  }

  async componentDidMount() {
    let blogs = await blogService.getAll()

    this.setState({ blogs })

    this.setState({user: "moi"})

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
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

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(user)
      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)

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

  logout = () => {
    return () => {
      window.localStorage.removeItem('loggedBlogAppUser')
      this.setState({ user: null })
    }
  }

  addBlog = async (title, author, url) => {

    if(title.length===0||author.length===0||url.length===0){
      this.setFailureMessage('Title, author & url needed!')
      return
    }

    const addedBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })

    this.setState({blogs: this.state.blogs.concat(addedBlog)})

    this.setSuccessMessage('Blog successfully created!')

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
          <h2>Blog App</h2>
          <p><span>{this.state.user.name} logged in</span><button onClick={this.logout()}>Logout</button></p>
          <Togglable
            showButtonLabel = "Show new blog form"
            hideButtonLabel = "Hide new blog form"
            >
            <AddBlogForm onSubmit={this.addBlog}/>
          </Togglable>
          <Notification message={this.state.failureMessage} notifType="failure"/>
          <Notification message={this.state.successMessage} notifType="success"/>
          <h2>List of blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
    );
  }
}

export default App;
