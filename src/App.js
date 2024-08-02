import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Navbar from '../src/pages/Navbar';
import Register from '../src/pages/Register';
import Forgot from './pages/ForgotPassword';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import FlightCard from './pages/FlightCard';
import ResetPassword from './pages/ResetPassword';
import Admin from './pages/Admin';
import { FlightProvider } from './pages/Context/FlightContextProvide';
import Results from './pages/Results';
import Details from './pages/Details';
import Add from './pages/Add';
import { AuthProvider } from './pages/Context/Auth';
import Booking from './pages/Booking';
import Bookinddetails from './pages/Bookinddetails';

function App() {
  return (
    <AuthProvider>
    <FlightProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgotPassword' element={<Forgot/>}/>
          <Route path="/searchPage" element={<SearchPage/>} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/results1" element={<Results />} />
          <Route path="/flight/:flightNumber" element={<FlightCard />} />
          <Route path="resetPassword/:email" element={<ResetPassword />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/details" element={<Details/>}/>
          <Route path="/add" element={<Add/>}/>
          {/* <Route path="/book" element={<Booking/>}/> */}
          <Route path="/Book" element={<Bookinddetails/>}/>
        </Routes>
      </Router>
    </FlightProvider>
    </AuthProvider>
  );
}

export default App;
