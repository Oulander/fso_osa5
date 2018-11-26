import React from 'react'
export default class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }


  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  setVisible = () => {
    this.setState({ visible: true })
  }

  clickTest = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const cssWhenContentShown = { display: this.state.visible ? '' : 'none' }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div onClick={ this.toggleVisibility } style={blogStyle}>
        <div>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style = {cssWhenContentShown}>
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          <div>{`${this.props.blog.likes} likes`}<button onClick={this.clickTest}>like</button></div>
          <div>{`Added by ${this.props.blog.user.name}`}</div>
        </div>
      </div>
    )}
}
