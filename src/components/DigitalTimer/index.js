import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    timeInMinutes: 25,
    timeInSeconds: 0,
    isStartButtonClicked: true,
  }

  startButtonClicked = () => {
    const {isStartButtonClicked} = this.state
    this.setState(prevState => ({
      isStartButtonClicked: !prevState.isStartButtonClicked,
    }))

    if (isStartButtonClicked === true) {
      this.elapsingTime()
    } else if (isStartButtonClicked === false) {
      this.componentWillUnmount()
    }
  }

  elapsingTime = () => {
    this.intervalID = setInterval(this.startTheTime, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID)
  }

  startTheTime = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    if (timeInSeconds === 0) {
      this.setState(prevState => ({
        timeInSeconds: 59,
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1,
      }))
    }
    if (timeInSeconds === 0 && timeInMinutes === 0) {
      this.componentWillUnmount()

      this.setState(prevState => ({
        isStartButtonClicked: !prevState.isStartButtonClicked,
        timeInSeconds: 0,
        timeInMinutes: 25,
      }))
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1,
      }))
    }
  }

  onResetButton = () => {
    this.componentWillUnmount()

    this.setState({
      isStartButtonClicked: true,
      timeInMinutes: 25,
      timeInSeconds: 0,
    })
  }

  onDecrement = () => {
    const {timeInMinutes, isStartButtonClicked} = this.state
    if (timeInMinutes > 25 && isStartButtonClicked === true) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isStartButtonClicked} = this.state
    if (isStartButtonClicked === true) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes + 1,
      }))
    }
  }

  render() {
    const {timeInMinutes, timeInSeconds, isStartButtonClicked} = this.state
    const url = isStartButtonClicked
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const altText = isStartButtonClicked ? 'play icon' : 'pause icon'

    const text = isStartButtonClicked ? 'Start' : 'Pause'
    const timerText = isStartButtonClicked ? 'Paused' : 'Running'

    const seconds = timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`
    const minutes = timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="container">
          <div className="timer-container">
            <div className="timer-small-container">
              <div className="pause-para">
                <h1>
                  {minutes}:{seconds}
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


