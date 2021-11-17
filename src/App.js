import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signuppage from "./components/signup/index"
import Login from './components/login';
import Startup from './components/backlog/startuppage';
import Completed from './components/backlog/completed/index';
import Ongoing from './components/backlog/ongoing/ongoing';

function App() {
  return (<div>
    
      <Router>
       <Routes>
       <Route exact path="/" element={<Signuppage/>}/>
       <Route exact path="/todo" element={<Startup/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/complete" element={<Completed/>}/>
       <Route exact path="/ongoing" element={<Ongoing/>}/>


       




      </Routes>
      </Router>


    </div>);
}

export default App;
