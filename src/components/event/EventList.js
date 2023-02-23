import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"
import "./event.css"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate()

    function refreshPage(){
        window.location.reload(false)
    }
    
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleClick = (id) => {
        deleteEvent(id).then(refreshPage)
    }
    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">{event.name} by {event?.organizer?.full_name}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__location">{event.location} at {event.location}</div>
                        <div className="event__game">{event.game.name}</div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    navigate({ pathname: `editevent/${event.id}`})
                                }}>Edit</button>
                        </div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    handleClick(event.id)
                                }}>Delete</button>
                        </div>
                        
                        </section>
                })
            }
        </article>
    )
}