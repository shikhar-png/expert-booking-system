import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ExpertList() {
  const [experts, setExperts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchExperts()
  }, [search, category])

  const fetchExperts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/experts?search=${search}&category=${category}`)
      setExperts(res.data.experts)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>Expert Booking System</h1>
      <input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} style={{marginRight: '10px', padding: '8px'}}/>
      <select value={category} onChange={e => setCategory(e.target.value)} style={{padding: '8px'}}>
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Health">Health</option>
        <option value="Legal">Legal</option>
      </select>
      {loading ? <p>Loading...</p> : (
        <div style={{display:'flex', flexWrap:'wrap', gap:'20px', marginTop:'20px'}}>
          {experts.map(expert => (
            <div key={expert._id} style={{border:'1px solid #ccc', padding:'15px', borderRadius:'8px', width:'250px'}}>
              <h3>{expert.name}</h3>
              <p>Category: {expert.category}</p>
              <p>Experience: {expert.experience} years</p>
              <p>Rating: {expert.rating}/5</p>
              <button onClick={() => navigate(`/expert/${expert._id}`)} style={{padding:'8px 16px', background:'blue', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
                View Details
              </button>
            </div>
          ))}
          {experts.length === 0 && <p>No experts found!</p>}
        </div>
      )}
      <button onClick={() => navigate('/my-bookings')} style={{marginTop:'20px', padding:'8px 16px', background:'green', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
        My Bookings
      </button>
    </div>
  )
}