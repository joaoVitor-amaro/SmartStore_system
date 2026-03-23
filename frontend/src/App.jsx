import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from './pages/CadastroUsuario';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path='/usuario/cadastro' element={<CadastroUsuario/>}/>
        <Route path="/login"/>
        <Route path="/cadastro"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
