import * as React from "react"
import Calendar from "./components/Calendar"
import * as moment from "moment"

const EVENTS_URL = "http://localhost:8114/events.json"

function makeDays(startDate: string, endDate?: string): string[] {
  let day = moment(startDate)
  const days = []
  while (day.isBefore(moment(endDate))) {
    days.push(day.format("YYYY-MM-DD"))
    day = day.add(1, "day")
  }
  return days
}

export interface Event {
  start: number
  end: number
  color: null | string
}

interface State {
  events: null | Event[]
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
      const startDate = moment(events[0].start * 1000).format("YYYY-MM-DD")
      const endDate = moment(events[events.length - 1].end * 1000).format("YYYY-MM-DD")
      const days = makeDays(startDate, endDate)
      this.setState({events, days})
    } catch (e) {
      window.alert(e)
    }
  }

  render() {
    if (!this.state.events || !this.state.days) {
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <em style={{opacity: 0.5}}>Loading...</em>
        </div>
      )
    }

    return (
      <Calendar
        days={this.state.days}
        events={this.state.events}
      />
    )
  }
}
