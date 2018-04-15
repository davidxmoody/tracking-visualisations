import * as React from "react"
import "./Calendar.css"
import * as moment from "moment"

interface Props {
  days: string[]
  events: Array<{
    name: string
    start: number
    end: number
    color: null | string
  }>
}

export default function Calendar(props: Props) {
  return (
    <div className="calendar">
      {props.days.map(day => {
        const dayStartNum = parseFloat(moment(day).format("X"))
        const dayEndNum = parseFloat(moment(day).add(1, "day").format("X"))
        const eventsForDay = props.events.filter(({start}) => {
          return start >= dayStartNum && start < dayEndNum
        })

        const eventsWithPercentages = eventsForDay.map(event => {
          return {
            ...event,
            startPercentage: `${Math.max(0, (event.start - dayStartNum) / (dayEndNum - dayStartNum)) * 100}%`,
            endPercentage: `${100 - Math.min(1, (event.end - dayStartNum) / (dayEndNum - dayStartNum)) * 100}%`,
          }
        })

        return (
          <div key={day} className="day">
            {eventsWithPercentages.map(event => (
              <div
                className="event"
                style={{
                  top: event.startPercentage,
                  bottom: event.endPercentage,
                  background: event.color || "grey",
                }}
              >
                {event.name}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
