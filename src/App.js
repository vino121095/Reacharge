import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Login from './components/Admin Panel/Login';
import UserList from './components/Admin Panel/UserList';
import PlanList from './components/Admin Panel/PlanList';
import OperatorList from './components/Admin Panel/OperatorList';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
        case 'signin':
          return <SignIn />;
          case 'signup':
            return <SignUp />;
            case 'login':
            return <Login />;
            case 'userlist':
              return <UserList />;
              case 'planlist':
                return <PlanList />;
                case 'operatorlist':
                  return <OperatorList />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('about')}>About</button>
        <button onClick={() => setCurrentPage('signin')}>Sign In</button>
        <button onClick={() => setCurrentPage('signup')}>Sign Up</button>
        <button onClick={() => setCurrentPage('login')}>Login</button>
        <button onClick={() => setCurrentPage('userlist')}>User List</button>
        <button onClick={() => setCurrentPage('planlist')}>Plan List</button>
        <button onClick={() => setCurrentPage('operatorlist')}>Operator List</button>





      </nav>
      <div>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
