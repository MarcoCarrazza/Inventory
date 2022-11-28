import React, { useState } from 'react';
import FormStock from './FormMovements';
import { Container, Button, ListGroup, ListGroupItem, InputGroup, Form } from 'react-bootstrap';
import data from '../data/data.json'

function Enter() {
  const [product, setProduct] = useState();
  const [search, setSearch] = useState('');
  const handleHide = () => setProduct()

  const searchText = (text) => {
    console.log('texto', text);
    if (text.name.toLowerCase().includes(search.toLowerCase()) || text.sku.toLowerCase().includes(search.toLowerCase())) return text
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
      {product && <FormStock show={product ? true : false} product={product} hide={handleHide}/>}
      <ListGroup variant="flush">
        {data.filter(text => searchText(text)).map((item, i) => <>
          <ListGroupItem key={i} className='d-flex justify-content-between'>
            <img src={item.picture} style={{width: 70}}></img>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.stock} {item.unit} - SKU: {item.sku}
            </div>
            <>
              <Button variant="primary" onClick={() => setProduct(item)}>Cargar</Button>
              <Button variant="primary">Ajustar</Button>
            </>
          </ListGroupItem>
          </>
        )}

      </ListGroup>
    </Container>
    </>
   );
}

export default Enter;