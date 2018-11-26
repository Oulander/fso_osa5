import React from 'react'
export default class Togglable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }

toggleVisibility = () => {
  this.setState({ visible: !this.state.visible })
}

render() {
  const cssWhenContentHidden = { display: this.state.visible ? 'none' : '' }
  const cssWhenContentShown = { display: this.state.visible ? '' : 'none' }

  return (
    <div>
      <div style = {cssWhenContentHidden}>
        <button onClick={ this.toggleVisibility }>{this.props.showButtonLabel}</button>
      </div>
      <div style = {cssWhenContentShown}>
        <button onClick={ this.toggleVisibility }>{this.props.hideButtonLabel}</button>
        { this.props.children }
      </div>
    </div>
  )}

}
