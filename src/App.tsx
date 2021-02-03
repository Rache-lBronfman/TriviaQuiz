import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './components/Loader';
import QuestionsList from './components/QuestionsList';


function App() {
  const [displayLoader,setDisplayLoader]=useState(true);
  
  useEffect(() => {
    setTimeout(() => {
            setDisplayLoader(false)
          }, 5000)
  });

  return (
    <div className="App">
      <header>
        {displayLoader&&<Loader />}
        {!displayLoader&&<QuestionsList />}
      </header>
    </div>
  );
}

export default App;
