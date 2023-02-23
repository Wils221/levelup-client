import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, leaveEvent,joinEvent } from "../../managers/EventManager.js"
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

    const handleJoinEvent = (eventId) => {
        joinEvent(eventId).then(() => {
    const updatedEvents = events.map((event) => {
            if (event.id === eventId) {
            return { ...event, joined: true };
            }
            return event;
        });
        setEvents(updatedEvents);
        });
    };
    
    const handleLeaveEvent = (eventId) => {
        leaveEvent(eventId).then(() => {
    const updatedEvents = events.map((event) => {
            if (event.id === eventId) {
            return { ...event, joined: false };
            }
            return event;
        });
        setEvents(updatedEvents);
        });
    };

    const handleClick = (id) => {
        deleteEvent(id).then(refreshPage)
    }
    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">{event.name} by {event?.organizer?.full_name}</div>
                        <div className="event__date">on {event.date}</div>
                        <div className="event__location">at {event.location}</div>
                        <div className="event__game">game played {event.game.name}</div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    navigate({ pathname: `editevent/${event.id}`})
                                }}>Edit</button>
                        </div>
                        <div className="event__footer">
                        {event.joined ? (
            <button onClick={() => handleLeaveEvent(event.id)}>Leave</button>
            ) : (
            <button onClick={() => handleJoinEvent(event.id)}>Join</button>
            )}
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