import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    timeInMinutes: 25,
    timeInSeconds: '00',
    isStartButtonClicked: false,
  }

  onResetButton = () => {
    this.setState({
      timeInMinutes: 25,
      timeInSeconds: '00',
    })
  }

  onDecrement = () => {
    const {timeInMinutes, isStartButtonClicked} = this.state
    if (timeInMinutes > 25 && isStartButtonClicked === false) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isStartButtonClicked} = this.state
    if (isStartButtonClicked === false) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes + 1,
      }))
    }
  }

  startTheTime = () => {
    this.setState(prevState => ({
      timeInSeconds: prevState.timeInSeconds - 1,
    }))
  }

  elapsingTime = () => {
    this.intervalID = setInterval(this.startTheTime, 1000)
  }

  timeMethod = () => {
    const {isStartButtonClicked, timeInSeconds} = this.state
    if (isStartButtonClicked === true) {
      if (timeInSeconds === 0 || timeInSeconds === '00') {
        this.setState(prevState => ({
          timeInSeconds: 59,
          timeInMinutes: prevState.timeInMinutes - 1,
        }))
        this.elapsingTime()
      } else {
        clearInterval(this.intervalID)
      }
    } else {
      clearInterval(this.intervalID)
    }
  }

  startButtonClicked = () => {
    this.setState(prevState => ({
      isStartButtonClicked: !prevState.isStartButtonClicked,
    }))
    this.timeMethod()
  }

  render() {
    const {timeInMinutes, timeInSeconds, isStartButtonClicked} = this.state
    const url = isStartButtonClicked
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isStartButtonClicked ? 'pause icon' : 'play icon'

    const text = isStartButtonClicked ? 'Pause' : 'Start'
    const timerText = isStartButtonClicked ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="container">
          <div className="timer-container">
            <div className="timer-small-container">
              <div className="pause-para">
                <h1>
                  {timeInMinutes}:{timeInSeconds}
                </h1>
                <p>{timerText}</p>
              </div>
            </div>
          </div>
          <div className="buttons-container">
            <div className="pause-reset-button-container">
              <div className="pause-button-container">
                <button
                  onClick={this.startButtonClicked}
                  className="pause-play-buttons"
                  type="button"
                >
                  <div className="pause-botton-container">
                    <img className="pause-play-icons" alt={altText} src={url} />

                    <h1>{text}</h1>
                  </div>
                </button>
              </div>
              <div className="reset-button-container">
                <button
                  onClick={this.onResetButton}
                  className="pause-play-buttons"
                  type="button"
                >
                  <img
                    className="pause-play-icons"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                </button>

                <div>
                  <h1>Reset</h1>
                </div>
              </div>
            </div>
            <div className="plus-minus-container-1">
              <p>Set Timer limit</p>
              <div className="plus-minus-container-2">
                <button
                  onClick={this.onDecrement}
                  className="plus-minus-button"
                  type="button"
                >
                  -
                </button>
                <p className="twenty-five">{timeInMinutes}</p>
                <button
                  onClick={this.onIncrement}
                  className="plus-minus-button"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
