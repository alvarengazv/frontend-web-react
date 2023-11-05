import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default function ModalExcluirCliente(props) {
    if(props.client){
        var id = props.client.id_cliente;
        const [matches, setMatches] = useState(
            window.matchMedia("(min-width: 768px)").matches
        )

        function deleteCliente(){
            axios.post('http://localhost:3005/clientes_del/' + id)
            .then(response => {
                alert('Cliente excluído com sucesso!');
                props.onHide();
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
                alert('Erro ao excluir cliente!');
            })
        }

        useEffect(() => {
            window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches( e.matches ));
        }, [props.client]);

        if (props.client) {
            return (
                <>
                    <Modal
                        show={props.show}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={props.onHide}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <MDBTypography tag="h5">Você tem certeza?</MDBTypography>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.onHide}>Cancelar</Button>
                            <Button variant="danger" onClick={deleteCliente}>Excluir</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }
    }
}