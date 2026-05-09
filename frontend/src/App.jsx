import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpertList from './pages/ExpertList'
import ExpertDetail from './pages/ExpertDetail'
import BookingForm from './pages/BookingForm'
import MyBookings from './pages/MyBookings'

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