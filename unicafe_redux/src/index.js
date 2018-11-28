import React from 'react'
import ReactDOM from 'react-dom'
import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

class App extends React.Component {
  constructor(){
    super()

    this.fb_classes = {

    }

    this.state = {
      good: {text: 'Positive', value:0},
      neutral: {text: 'Neutral', value:0},
      bad: {text: 'Negative', value:0}
    }
  }


  render() {
    const castVote = (voteClass) => () => {
      this.setState({[voteClass]:
        {
          ...this.state[voteClass],
          value:this.state[voteClass].value + 1
        }
      })
    }

    const buttonValues = {}
    for (let value in this.state) {
      buttonValues[value] = {text: this.state[value].text, clickHandler: castVote(value)}
    }

    return (
      <div>
        <Feedback title="How was your experience?" classes={buttonValues}/>
        <Statistics title="Statistics" values={this.state}/>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
