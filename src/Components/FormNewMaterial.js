import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function FormNewMaterial({ show, hide }) {
  const createMat = () => {
    Swal.fire({
    title: 'Estás seguro que deseas crear este nuevo insumo?',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    denyButtonText: `Volver`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Insumo creado exitosamente!', '', 'success')
      hide()
    }
  })
  }
  
  return ( 
    <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Crear un nuevo insumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre del insumo:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>SKU:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Unidad:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="unidades">Unidades</option>
              <option value="litros">Litros</option>
            </Form.Select>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={createMat}>
            Cargar
          </Button>
        </Modal.Footer>
      </Modal>
   );
}

export default FormNewMaterial;