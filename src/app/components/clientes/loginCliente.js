
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import React, { useEffect, useState, useRef } from 'react';

const LoginCliente = (props) => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        nome: '',
        senha: ''
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const isFormValid = formRef.current.checkValidity();

        if(!isFormValid){
            return;
        }

        setFormData({
            nome: formData.nome.trim(),
            senha: formData.senha.trim()
        });

        console.log(formData);

        fetch('http://localhost:3005/clientes_all')
        .then(response => response.json())
        .then(data => {
            var validado = false;
            for (const element of data) {
                if (element.nome === formData.nome && element.email === formData.senha) {
                    alert('Logado com sucesso!');
                    validado = true;
                    props.onLogin(element);
                    break;
                }
            }
            if (!validado)
                alert('Login ou senha incorretos!');
        })
        .catch(erro => {
            console.log(erro)
            alert('Erro: ', erro);
        });
    };

    return (
        <MDBContainer className='p-lg-5'>
            <MDBValidation ref={formRef} onSubmit={e => handleLogin(e)} style={{ padding: '0 20% 0 20%' }}>
                <p className="h1 text-center mb-4">Login</p>
                <div className="grey-text">
                    <MDBValidationItem invalid feedback='Indique o nome!'>
                        <MDBInput className='mb-4' label="Seu nome" name='nome' id='nome' onChange={onChange} value={formData.nome} required type="text" />
                    </MDBValidationItem>
                    <MDBValidationItem invalid feedback='Indique a senha!'>
                        <MDBInput className='mb-4' label="Sua senha" name='senha' id='senha' onChange={onChange} value={formData.senha} required type="password" />
                    </MDBValidationItem>
                </div>
                <div className="text-center">
                    <MDBBtn type='submit' className='mb-4' block>
                        Login
                    </MDBBtn>
                </div>
            </MDBValidation>
        </MDBContainer>
    );
}

export default LoginCliente;
