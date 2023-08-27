import React from 'react';
import ShowList from "./components/ShowList";
import ExpenseTracker from './components/ExpenseTracker';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const success = () => {
    return false;
  }

  const cancel = () => {
    return false;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={ShowList}></Route>
          <Route path='/add' element={<ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
