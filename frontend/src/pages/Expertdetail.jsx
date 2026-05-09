import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ExpertDetail() {
  const [expert, setExpert] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/experts/${id}`)
      .then(res => setExpert(res.data))
      .catch(err => console.log(err))
  }, [id])

  if (!expert) return <p>Loading...</p>

  const groupedSlots = expert.timeSlots?.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {})

  return (
    <div style={{padding: '20px'}}>
      <button onClick={() => navigate('/')}>← Back</button>
      <h1>{expert.name}</h1>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: {expert.rating}/5</p>
      <h2>Available Time Slots</h2>
      {groupedSlots && Object.keys(groupedSlots).map(date => (
        <div key={date}>
          <h3>{date}</h3>
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
            {groupedSlots[date].map((slot, i) => (
              <button key={i}
                disabled={slot.isBooked}
                onClick={() => navigate(`/book/${expert._id}?date=${slot.date}&time=${slot.time}`)}
                style={{padding:'8px', background: slot.isBooked ? 'gray' : 'green', color:'white', border:'none', borderRadius:'4px', cursor: slot.isBooked ? 'not-allowed' : 'pointer'}}>
                {slot.time} {slot.isBooked ? '(Booked)' : ''}
              </button>
            ))}
          </div>
        </div>
      ))}
      <br/>
      <button onClick={() => navigate(`/book/${expert._id}`)} style={{padding:'10px 20px', background:'blue', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
        Book Now
      </button>
    </div>
  )
}