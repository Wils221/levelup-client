import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { UpdateEvent } from "../../managers/EventManager.js"
import { useParams } from "react-router-dom"
import { getSingleEvent } from "../../managers/EventManager.js"
import { getGames } from "../../managers/GameManager.js"
import "./event.css"

export const EditEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const {eventId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        organizer: 0,
        name: "",
        date: "",
        location: "",
        game: ""
    })

    useEffect(() => {
        // TODO: Get the event types, then set the state
        getGames().then(res => setGames(res))
    }, [])

    useEffect(() => {
        getSingleEvent(eventId).then(res => {
            setCurrentEvent({
                organizer: res.organizer,
                        name: res.name,
                        date: res.date,
                        location: res.location,
                        game: res.game.name
            })
        })
    }, [eventId])

    const changeEventState = (event) => {
        const copy = { ...currentEvent }
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Event Location: </label>
                    <input type="text" name="location" required className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label">Game: </label>
                <select
                        name="game"
                        className="form-control"
                        value={currentEvent.game.id}
                        onChange={(event) => {
                            const copy = { ...currentEvent }
                            copy.game.id = parseInt(event.target.value)
                            setCurrentEvent(copy)
                        }}>
                        <option value="0">Choose:</option>
                        {games.map(game => ( 
                                    <option key={`game--${game.id}`} value={game.id} name={game.name}>{game.name}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: currentEvent.organizer,
                        name: currentEvent.name,
                        date: currentEvent.date,
                        location: currentEvent.location,
                        game: currentEvent.game.id
                    }

                    // Send POST request to your API
                    UpdateEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}