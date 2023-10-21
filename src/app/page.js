'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Table, Button, Radio, Card, Avatar, Checkbox, Form, Input } from 'antd';
const { Meta } = Card;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const usuario = {
  nome: 'Fulano de tal 1',
  idade: 19,
  sexo: 'Masculino',
  image: 'https://www.w3schools.com/howto/img_avatar.png',
  imageWidth: 90
}

const produtos = [
  {
    titulo: "Maçã",
    id: 1,
    fruta: true
  },
  {
    titulo: "Couve",
    id: 2,
    fruta: false
  },
  {
    titulo: "Mamão",
    id: 3,
    fruta: true
  },
  {
    titulo: "Alface",
    id: 4,
    fruta: false
  }
];

const listaProdutos = produtos.map((produto) => {
  return (
    <li style={{
      color: produto.fruta ? 'red' : 'blue',
    }} key={produto.id}>
      {produto.titulo}
    </li>
  )
})

function MeuBotao() {
  return (
    <button>meu botão como componente</button>
  )
}

function Login() {
  return (
    <h1>Por favor, faça login</h1>
  )
}



const App = () => {
  const [isPerfil, setIsPerfil] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [selectedClient, setSelectedClient] = useState({});

  const clearSelected = () => {
    setSelectedClient({});
  }

  const selectCliente = (cliente) => {
    setSelectedClient(cliente);
  }

  function Formulario(){
    return (
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        value={selectedClient.nome}
        label="Nome"
        name="nome"
        rules={[
          {
            required: true,
            message: 'Por favor indique um nome!',
          },
        ]}
      >
      <Input value={selectedClient.nome} />
      </Form.Item>
  
      <Form.Item
        label="Sobrenome"
        name="sobrenome"
        rules={[
          {
            required: true,
            message: 'Por favor digite um sobrenome!',
          },
        ]}
      >
      <Input value={selectedClient.sobrenome} />
      </Form.Item>
  
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Por favor digite um email!',
          },
        ]}
      >
      <Input value={selectedClient.email} />
      </Form.Item>
  
      <Form.Item
        label="Salario"
        name="salario"
        rules={[
          {
            required: true,
            message: 'Por favor digite o salário!',
          },
        ]}
      >
      <Input value={selectedClient.salario} />
      </Form.Item>
  
      <Form.Item
        label="Senha"
        name="senha"
        rules={[
          {
            required: true,
            message: 'Por favor digite uma senha!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
  
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
  
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }

  function Perfil() {
    var [curtidas, setCurtidas] = useState(0);
    function curtir() {
      console.log('Curtiu o perfil');
      setCurtidas(curtidas + 1);
    }
  
    return (
      <>
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
        >
          <Meta
            avatar={<Avatar src={selectedClient.avatar} />}
            title={selectedClient.nome + ' ' + selectedClient.sobrenome}
            description={`Data de Cadastro: ${selectedClient.stringData}`}
          />
          <Meta 
            description={`E-mail: ${selectedClient.email}`}
          />
          <Meta 
            description={`Salário: ${selectedClient.salario}`}
          />
        </Card>
        {/* <h1>{cliente.nome} {cliente.sobrenome}</h1>
        <img
          className='avatar'
          src={cliente.avatar}
          alt={`Imagem de ${cliente.nome}`}
          title={`Imagem de ${cliente.nome}`}
          width={90}
        />
        <button onClick={curtir}>Curtir</button>
        <ul>
          {listaProdutos}
        </ul>
        <h3>Curtidas: {curtidas}</h3> */}
      </>
    )
  }

  const columns = [
    {
      title: 'ID',
      width: 20,
      dataIndex: 'id_cliente',
      key: 'id_cliente',
      fixed: 'left',
      sorter: (a, b) => a.id_cliente - b.id_cliente,
    },
    {
      title: 'Nome',
      width: 40,
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => ('' + a.nome).localeCompare(b.nome)
    },
    {
      title: 'Sobrenome',
      width: 50,
      dataIndex: 'sobrenome',
      key: 'sobrenome',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      width: 70,
    },
    {
      title: 'Data de Cadastro',
      dataIndex: 'stringData',
      key: 'stringData',
      width: 50,
      sorter: (a, b) => {
        var aData = new Date(a.data);
        var bData = new Date(b.data);
  
        return aData > bData ? -1 : aData < bData ? 1 : 0;
      }
    },
    {
      title: 'Salário',
      dataIndex: 'salario',
      key: 'salario',
      width: 50,
      sorter: (a, b) => a.salario - b.salario
    },
    {
      title: 'Ações',
      key: 'operacao',
      width: 60,
      render: (record) =>{
        return (
          <Radio.Group value='large'>
            <Radio.Button value="perfil" onClick={() => {
              selectCliente(record);
              setIsPerfil(true);
            }}>Perfil</Radio.Button>
            <Radio.Button value="atualizar" onClick={() => {
              selectCliente(record);
              setIsPerfil(false);
            }}>Atualizar</Radio.Button>
          </Radio.Group>
        )
      }
    },
  ];
  
  const [data, setData] = useState([
    {
      id_cliente: 1,
      nome: 'Guilherme',
      sobrenome: 'Alvarenga',
      email: 'teste',
      stringData: new Date().toLocaleDateString(),
      salario: 1500
    },
    {
      id_cliente: 2,
      nome: 'Fulano',
      sobrenome: 'de Tal 1',
      email: 'fulanodetal1@gmail.com',
      stringData: new Date().toLocaleDateString(),
      salario: 5000
    },
    {
      id_cliente: 3,
      nome: 'Fulano',
      sobrenome: 'de Tal 2',
      email: 'fulanodetal2@gmail.com',
      stringData: new Date().toLocaleDateString(),
      salario: 50000
    },
    {
      id_cliente: 4,
      nome: 'Fulano',
      sobrenome: 'de Tal 3',
      email: 'fulanodetal3@gmail.com',
      stringData: new Date().toLocaleDateString(),
      salario: 50000
    },
  ]);

  const start = () => {
    setLoading(true);
  
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const onChange = (pagination, filters, sorter, extra) => { };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <main>
      <Button title='Cadastrar' type="primary" onClick={clearSelected} />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          borderRadius: 5,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          scroll={{
            x: 1500,
            y: 450,
          }}
        />
        <div
          style={{
            marginTop: 2,
          }}
        >
        </div>
      </div>
      <>
        {isPerfil ? <Perfil /> : <Formulario />}
      </>
    </main>
  );
};
export default App;