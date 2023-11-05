import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalExcluirCliente from './modalExcluirCliente';
import ModalPerfilCliente from './modalPerfilCliente';

export default function ListaClientes(){
    
    const [modalPerfilShow, setModalPerfilShow] = useState(false);
    const [modalExcluirShow, setModalExcluirShow] = useState(false);

    const [lista, setLista] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    function fetchListaClientes(){
        axios.get('http://localhost:3005/clientes_all')
        .then(response => {
            var tipo = true;
            if(response.data){
                var listaGroup = response.data.map(e => {
                    tipo = !tipo;

                    return(
                        <ListGroup.Item style={{fontWeight: 'bold'}} variant={tipo ? 'light' : 'dark'} key={e.id_cliente}>
                            {e.nome + ' ' + e.sobrenome}
                            <div style={{float: 'right', display: 'inline'}}>
                                <ButtonGroup>
                                    <Button variant="success" onClick={() => {
                                        setModalPerfilShow(true)
                                        setSelectedClient(e)
                                        }}>Perfil</Button>{' '}
                                    <Button variant="warning">Alterar</Button>{' '}
                                    <Button variant="danger" onClick={() => {
                                        setModalExcluirShow(true)
                                        setSelectedClient(e)
                                    }}>Excluir</Button>{' '}
                                </ButtonGroup>
                            </div>
                        </ListGroup.Item>
                    )}
                )
                setLista(listaGroup)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchListaClientes();
    }, [])

    return (
        <>  
            <ListGroup>
                {lista}
            </ListGroup>

            <ModalPerfilCliente 
                client={selectedClient}
                show={modalPerfilShow}
                onHide={() => setModalPerfilShow(false)} 
            />
            <ModalExcluirCliente 
                client={selectedClient}
                show={modalExcluirShow}
                onHide={() => setModalExcluirShow(false)}
            />
        </>
    )
}