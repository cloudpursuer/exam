import React from 'react';
import { Routes, Route} from 'react-router-dom'
import SignIn from './pages';
import Exam from './pages/exam';
import Examing from './pages/examing';
import Management from './pages/management';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<SignIn />} path='/' />
        <Route element={<Exam />} path='/exam' />
        <Route element={<Examing />} path='/examing' />
        <Route element={<Management />} path='/management' />
      </Routes>
    </div>
  );
}

export default App;
