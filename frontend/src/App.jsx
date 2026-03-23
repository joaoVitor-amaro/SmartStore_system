import { useState } from 'react'
import './App.css'
import TelaLogin from "./pages/tela_login/TelaLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/cadastro" element={<div>Cadastro</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
