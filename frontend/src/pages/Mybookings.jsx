import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function MyBookings() {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/bookings?email=${email}`)
      setBookings(res.data)
      setSearched(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{padding: '20px'}}>
      <button onClick={() => navigate('/')}>← Back</button>
      <h1>My Bookings</h1>
      <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
        <input placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} style={{padding:'8px', width:'300px'}}/>
        <button onClick={fetchBookings} style={{padding:'8px 16px', background:'blue', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
          Search
        </button>
      </div>
      {searched && bookings.length === 0 && <p>No bookings found!</p>}
      {bookings.map(booking => (
        <div key={booking._id} style={{border:'1px solid #ccc', padding:'15px', borderRadius:'8px', marginBottom:'10px'}}>
          <h3>{booking.expertId?.name}</h3>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.timeSlot}</p>
          <p>Status: <span style={{color: booking.status === 'Confirmed' ? 'green' : booking.status === 'Completed' ? 'blue' : 'orange'}}>{booking.status}</span></p>
          <p>Notes: {booking.notes}</p>
        </div>
      ))}
    </div>
  )
}