import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalExcluirFornecedor from './modalExcluirFornecedor';

export default function ListaFornecedores(){

    const [modalExcluirShow, setModalExcluirShow] = useState(false);
    const [selectedFornecedor, setSelectedFornecedor] = useState(null);
    const [lista, setLista] = useState([]);

    function fetchListaFornecedores(){
        axios.get('http://localhost:3005/fornecedores_all')
        .then(response => {
            var tipo = true;

            var listaGroup = response.data.map(e => {
                tipo = !tipo;

                return (    
                    <ListGroup.Item style={{fontWeight: 'bold'}} variant={tipo ? 'light' : 'dark'} key={e.id_fornecedor}>
                        {e.razao + ' - ' + e.cpf_cnpj}
                        <div style={{float: 'right', display: 'inline'}}>
                            <ButtonGroup>
                                <Button variant="warning">Alterar</Button>{' '}
                                <Button variant="danger" 
                                    onClick={() => {
                                        setModalExcluirShow(true)
                                        setSelectedFornecedor(e)
                                    }}
                                >Excluir</Button>{' '}
                            </ButtonGroup>
                        </div>
                    </ListGroup.Item>
                )}
            )
            setLista(listaGroup)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchListaFornecedores();
    })

    return (
        <>  
            <ListGroup>
                {lista}
            </ListGroup>
            <ModalExcluirFornecedor
                show={modalExcluirShow}
                onHide={() => setModalExcluirShow(false)}
                fornecedor={selectedFornecedor}
            />
        </>
    )
}