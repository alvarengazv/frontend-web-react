'use client';

import React, { useState } from 'react';
import './globals.css';
import ListaClientes from './components/clientes/listaClientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFornecedores from './components/fornecedores/listaFornecedores';
import Nav from 'react-bootstrap/Nav';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [isCliente, setIsCliente] = useState(true);

  function BarraNavegacao(props) {
    const { setIsCliente } = props;
  
    const handleClienteClick = () => {
      setIsCliente(true);
    };
  
    const handleFornecedorClick = () => {
      setIsCliente(false);
    };
  
    return (
      <Nav variant="underline" className="justify-content-center" defaultActiveKey="clientes" activeKey={isCliente ? "clientes" : "fornecedores"} as="ul">
        <Nav.Item style={{color: 'grey'}} as="li">
          <Nav.Link style={{color: !isCliente ? '#85898d' : null}} eventKey="clientes" onClick={handleClienteClick}>Lista de Clientes</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{color: 'grey'}} as="li">
          <Nav.Link style={{color: isCliente ? '#85898d' : null}} eventKey="fornecedores" onClick={handleFornecedorClick}>Lista de Fornecedores</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
  
  return (
    <main>
      <>
        <BarraNavegacao setIsCliente={setIsCliente} />
        <div style={{margin: '2% 10% 2% 10%'}}>
          {isCliente ? <ListaClientes /> : <ListaFornecedores />}
        </div>
      </>     
    </main>
  );
  
};
export default App;