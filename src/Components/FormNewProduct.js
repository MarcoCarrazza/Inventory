import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function FormNewProduct({ show, hide }) {
  const [type, setType] = useState('MP');
  const [inputFields, setInputFields] = useState([
    { material: '', unit: '', qty: 1 }
  ])

  const addFields = () => {
    let newfield = { name: '', age: '' }
    setInputFields([...inputFields, newfield])
  }

  const createProd = () => {
    Swal.fire({
    title: 'Estás seguro que deseas crear este nuevo producto?',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    denyButtonText: `Volver`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Producto creado exitosamente!', '', 'success')
      hide()
    }
  })
  }
  
  return ( 
    <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Crear un nuevo producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre del producto:</Form.Label>
              <Form.Control type='text' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSku">
              <Form.Label>SKU:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicType">
              <Form.Label>Unidad de medida:</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="unidades">Unidades</option>
                <option value="litros">Litros</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicType">
              <Form.Label>Tipo de producto:</Form.Label>
              <Form.Select aria-label="Default select example" onChange={e => setType(e.target.value)}>
                <option value="MP">Materia Prima</option>
                <option value="MPI">Producto intermedio</option>
                <option value="PT">Producto final</option>
              </Form.Select>
            </Form.Group>


              {type != 'MP' && inputFields.map((input, index) => {
                return (
                  <Form.Group controlId="formBasicRemito">
                    <Row className='align-items-end'>
                      <Col>
                        <Form.Label>Insumo p/ fabricar:</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option value="1">Insumo 1</option>
                          <option value="2">Insumo 2</option>
                          <option value="3">Insumo 3</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Label>Cantidad:</Form.Label>
                        <Form.Control type="number" />
                      </Col>
                      <Col>
                        <Button onClick={addFields}>+</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                )
              })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={createProd}>
            Cargar
          </Button>
        </Modal.Footer>
      </Modal>
   );
}

export default FormNewProduct;