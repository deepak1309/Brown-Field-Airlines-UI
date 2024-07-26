
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
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
<<<<<<< HEAD
import Results from './pages/Results';
=======
import PageNotFound from './pages/PageNotFound';
>>>>>>> 29403fd5c9d7764ab90bdd56e646b4760447c131

function App() {
  return (
    <div className=""  >
      <FlightProvider>
<<<<<<< HEAD
       <Navbar/>
       <Router>
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
        </Routes>
       </Router>
       </FlightProvider>
=======
        <Navbar />
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotPassword' element={<Forgot />} />
            <Route path="/searchPage" element={<SearchPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/flight/:id" element={<FlightCard />} />
            <Route path="resetPassword/:email" element={<ResetPassword />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </FlightProvider>
>>>>>>> 29403fd5c9d7764ab90bdd56e646b4760447c131
    </div>
  );
}

export default App;
