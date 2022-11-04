import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BlogEdit from './Components/BlogEdit';
import BlogListing from './Components/BlogListing';
import HompageListing from './Components/HompageListing';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<BlogEdit />} />
      <Route path="/createBlog" element={<BlogEdit />} />
      <Route path="/blogListing" element={<BlogListing />} />
      <Route path="/home" element={<HompageListing />} />
      <Route exact element={Error} />
    </Routes>
  );
}

export default App;
