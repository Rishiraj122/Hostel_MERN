import React from "react";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header.js'
import RoomStatus from './RoomStatus'


function RoomAllotment() {
	const history = useHistory()
 //the first value is current state and second value is function used to update our state
	const [roll, setRoll] = useState('')
    const [room, setRoom] = useState('')
	const [block, setBlock] = useState('')
	const [occupancy, setOccupancy] = useState('')
	const item=[];
	
	async function registerUser(event) {
		event.preventDefault()
		//Update in Room database
		const response2 = await fetch('http://localhost:1337/api/room',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				room,
				block,
				roll
			})
		})

		const response = await fetch('http://localhost:1337/api/allotroom', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                roll,
				block,
				room
			}),
		})

		const data2 = await response2.json()
		const data = await response.json()

		if (data.status && data2.status === 'ok') {
			window.location.reload() // if registration is successfull 
		}
	}
	

	return (
		<div>
		<Header/>
		<RoomStatus></RoomStatus>
			<h1>Room Allotment</h1>
			<form onSubmit={registerUser}>
                <input
					value={roll}
					onChange={(e) => setRoll(e.target.value)}
					type="number"
					placeholder="Roll Number"
					class="input-control" 
				/>
				<br />
                <input
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					type="number"
					placeholder="Room"
					class="input-control" 
				/>
				<br />
				<input
					value={block}
					onChange={(e) => setBlock(e.target.value)}
					type="text"
					placeholder="Block"
					class="input-control" 
				/>
				<br />
				<input class="input-control btn btn-dark" type="submit" value="Allot"/>
			</form>
		</div>
	)
}

export default RoomAllotment
