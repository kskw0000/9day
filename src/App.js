import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Nursery from './components/NurseryList';
import ReviewForm from './components/ReviewForm';
import Admin from './components/Admin';
import AdminReview from './components/AdminReview';
import NurseryDeep from './components/Nuserydeep';  
import Header from './components/parts/Header';

function App() {
  const [nurseries, setNurseries] = useState([]);
  const [selectedNursery, setSelectedNursery] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3001/nurseries')
        .then(response => {
          setNurseries(response.data);
        });
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const selectNursery = (nursery) => {
    setSelectedNursery(nursery);
  };

  return (
    <Router>
      <Header />
      <nav>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/admin">保育園管理</Link></li>
          <li><Link to="/admin/reviews">口コミ管理</Link></li> 
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Nursery nurseries={nurseries} selectNursery={selectNursery} />} />
        <Route path="/nursery/:id" element={<NurseryDeep />} />  
        <Route path="/review" element={<ReviewForm nursery={selectedNursery} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/reviews" element={<AdminReview />} /> 
      </Routes>
    </Router>
  );
}

export default App;
