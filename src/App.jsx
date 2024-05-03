import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListBilling from './pages/billing/Index.tsx';
import ListIncoming from './pages/billing/incoming.tsx';
import ListCopy from './pages/billing/copy.tsx';
import DeveloperMode from './pages/billing/developer.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListBilling/>} />
        <Route exact path="/dashboard" element={<ListBilling/>} />
        <Route exact path="/incoming" element={<ListIncoming/>} />
        <Route exact path="/copy" element={<ListCopy/>} />
        <Route exact path="/developer" element={<DeveloperMode/>} />
      </Routes>
    </Router>
  )
}

export default App
