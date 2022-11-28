import React, { useState, useEffect } from 'react';
import salidas from '../data/salidas.json'
import { Container, Table, ListGroup, ListGroupItem, InputGroup, Form } from 'react-bootstrap';


function Production() {
  const [product, setProduct] = useState();
  const [search, setSearch] = useState('');
  const handleHide = () => setProduct()

  const searchText = (text) => {
    console.log('texto', text);
    if (text.product.toLowerCase().includes(search.toLowerCase()) || text.PO.toLowerCase().includes(search.toLowerCase())) return text
  }
  
  return ( 
      <>
      <Container>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">QR</InputGroup.Text>
          <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
          <Form.Control
            onChange={e => setSearch(e.target.value)}
            aria-label="search"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </Container>
        <Container fluid>
        <Table striped>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Orden de producción</th>
              <th>Responsable</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {salidas.records.filter(text => searchText(text)).map((item, i) => <tr>
                <td><img src={item.picture} style={{width: 70}}></img></td>
                <td>{item.product}</td>
                <td>{item.date}</td>
                <td>{item.PO}</td>
                <td>{item.responsable}</td>
                <td>{item.qty} {item.unit}</td>
              </tr>
            )}
          </tbody>
        </Table>

      </Container>
      </>
   );
}

export default Production;