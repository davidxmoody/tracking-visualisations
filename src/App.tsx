import * as React from "react"
import "./App.css"
import Calendar from "./components/Calendar"
import * as moment from "moment"

const EVENTS_URL = "http://localhost:8114/scrubbed-data/atracker/events.json"

function makeDays(startDate: string, endDate?: string): string[] {
  let day = moment(startDate)
  const days = []
  while (day.isBefore(moment(endDate))) {
    days.push(day.format("YYYY-MM-DD"))
    day = day.add(1, "day")
  }
  return days
}

interface State {
  events: null | Array<{
    name: string
    start: number
    end: number
    color: null | string
  }>
  days: null | string[]
}

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      events: null,
      days: null,
    }
  }

  async componentDidMount() {
    try {
      const events = await fetch(EVENTS_URL).then(res => res.json())
      const days = makeDays(moment(events[0].start * 1000).format("YYYY-MM-DD"))
      this.setState({events, days})
    } catch (e) {
      window.alert(e)
    }
  }

  render() {
    if (!this.state.events || !this.state.days) {
      return <em style={{opacity: 0.5}}>Loading...</em>
    }

    return (
      <div className="App">
        <Calendar days={this.state.days} events={this.state.events} />
      </div>
    )
  }
}
