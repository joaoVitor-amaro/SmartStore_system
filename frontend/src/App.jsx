import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login"/>
        <Route path="/cadastro"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
