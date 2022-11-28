import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import data from '../data/data.json'
import Products from './Inventory';

function FormMovements({ show, hide }) {
  const [typeProd, setTypeProd] = useState("MP");
  const [filter, setFilter] = useState();

  const addStock = () => {
    Swal.fire({
    title: 'Estás seguro de cargar este movimiento de stock del almacén?',
    showCancelButton: true,
    confirmButtonText: 'Cargar',
    denyButtonText: `Volver`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Movimiento registrado exitosamente!', '', 'success')
      hide()
    }
  })
  }

  useEffect(() => {
    if(!filter) return
    switch (filter) {
      case "1": setTypeProd("MP"); break;
      case "2": setTypeProd("MPI"); break;
      case "3": setTypeProd("PT"); break;
      case "4": setTypeProd("PT"); break;
    }
  }, [filter]);

  return ( 
    <Modal show={show} onHide={hide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Cargar nuevo movimiento de stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="movType">
            <Form.Label>Seleccione el tipo movimiento:</Form.Label>
              <Form.Select aria-label="Default select example" onChange={e => setFilter(e.target.value)}>
                <option value="1">Ingreso de MP</option>
                <option value="2">Fabricación de fragancia</option>
                <option value="3">Fabricación de PT</option>
                <option value="4">Despacho de PT</option>
              </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicQty">
            <Form.Label>Producto</Form.Label>
            <Form.Select aria-label="Default select example">
              {filter && data.filter(item => item.type === typeProd).map(item => <option value={item.sku}>{item.name}</option>)}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicQty">
            <Form.Label>Cantidad recibida/fabricada/despachada</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicRemito">
            <Form.Label>Remito/OP</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Fecha de movimiento</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={addStock}>
            Cargar
          </Button>
        </Modal.Footer>
      </Modal>
   );
}

export default FormMovements;