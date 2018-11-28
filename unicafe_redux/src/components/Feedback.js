import React from 'react'
import PropTypes from 'prop-types'

const Feedback = (props) => {
  const buttons = []
  for (let fb in props.classes) {
    buttons.push(<Button key={props.classes[fb].text} text={props.classes[fb].text} clickHandler={props.classes[fb].clickHandler} />)
  }

  return (
    <div>
      <h1>{props.title}</h1>
      {buttons}
    </div>
  )
}

Feedback.propTypes = {
  classes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}



Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Feedback
