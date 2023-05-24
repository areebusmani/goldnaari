import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import Plans from './components/plans';
import Collections from './components/collections';
import NotFound from './components/notfound';

import './App.css';

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Header/>

    <main className="flex-shrink-0">
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/plans" element={<Plans/>} />
          <Route path="/collections" element={<Collections/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </main>

    <Footer/>
  </BrowserRouter>
);

export default App;