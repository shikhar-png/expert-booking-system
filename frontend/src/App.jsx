import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpertList from './pages/Expertlist'
import ExpertDetail from './pages/Expertdetail'
import BookingForm from './pages/Bookingform'
import MyBookings from './pages/Mybookings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App