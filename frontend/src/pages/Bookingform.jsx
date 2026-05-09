import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: searchParams.get('date') || '',
    timeSlot: searchParams.get('time') || '',
    notes: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/bookings', {
        ...form,
        expertId: id
      })
      setMessage('Booking Successful!')
      setTimeout(() => navigate('/my-bookings'), 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error!')
    }
  }

  return (
    <div style={{padding: '20px', maxWidth: '500px'}}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>Book a Session</h1>
      {message && <p style={{color: message.includes('Success') ? 'green' : 'red'}}>{message}</p>}
      <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{padding:'8px'}}/>
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{padding:'8px'}}/>
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{padding:'8px'}}/>
        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{padding:'8px'}}/>
        <input placeholder="Time Slot (e.g. 10:00 AM)" value={form.timeSlot} onChange={e => setForm({...form, timeSlot: e.target.value})} style={{padding:'8px'}}/>
        <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{padding:'8px'}}/>
        <button onClick={handleSubmit} style={{padding:'10px', background:'blue', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
          Confirm Booking
        </button>
      </div>
    </div>
  )
}