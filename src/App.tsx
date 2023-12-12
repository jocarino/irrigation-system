import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/"
            element={<MainDashboard />} />
          {/* <Route path="/login"
            element={<Login />} />
          <Route path="/createAccountWithEmailAndPassword"
            element={<CreateAccountWithEmail />} />
          <Route path="/profile"
            element={<Profile />} />
          <Route path="/posters"
            element={<PosterFeed />} />
          <Route path='/poster/:name'
            element={<PosterPage />} />
          <Route path="/posters-collection"
            element={<PosterCollection />} />
          <Route path='/admin/poster/location'
            element={<UploadPosterLocation />} />
          <Route path="/admin/poster"
            element={<PosterCMSPage />} />
          <Route path="/admin/poster/new"
            element={<CreatePosterPage />} /> */}
        </Routes>
        {/* <BottomNavigationBar /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
