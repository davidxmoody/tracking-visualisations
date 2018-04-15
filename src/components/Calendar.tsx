import * as React from "react"
import "./Calendar.css"
import * as moment from "moment"
import {Event} from "../App"

interface Props {
  days: string[]
  events: Event[]
  hoveredDay: null | string
  hoveredEvent: null | Event
  setHoveredDay: (day: null | string) => void
  setHoveredEvent: (day: null | Event) => void
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
            className={`day ${isWeekend ? "day--weekend" : ""} ${props.hoveredDay === day ? "day--hovered" : ""}`}
            onMouseEnter={() => {
              props.setHoveredDay(day)
              props.setHoveredEvent(null)
            }}
          >
            {eventsWithPercentages.map(event => {
              const isHovered = props.hoveredEvent && props.hoveredEvent.start === event.start && props.hoveredEvent.end === event.end

              return (
                <div
                  className={`event ${isHovered ? "event--hovered" : ""}`}
                  style={{
                    top: event.startPercentage,
                    bottom: event.endPercentage,
                    background: event.color || "grey",
                  }}
                  onMouseEnter={() => props.setHoveredEvent(event)}
                >
                  {event.name}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
