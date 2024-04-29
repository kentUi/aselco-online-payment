import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListBilling from './pages/billing/Index.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListBilling/>} />
      </Routes>
    </Router>
  )
}

export default App
