import * as React from "react"
import "./Calendar.css"
import * as moment from "moment"
import { Event } from "../App"

interface Props {
  days: string[]
  events: Event[]
}

export default function Calendar(props: Props) {
  return (
    <div className="calendar">
      {props.days.map(day => {
        const weekday = moment(day).format("ddd")
        const isWeekend =  weekday === "Sat" || weekday === "Sun"
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
          <div
            key={day}
            className={`day ${isWeekend ? "day--weekend" : ""}`}
          >
            {eventsWithPercentages.map(event => (
              <div
                key={event.start}
                className="event"
                style={{
                  top: event.startPercentage,
                  bottom: event.endPercentage,
                  background: event.color || "grey",
                }}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
