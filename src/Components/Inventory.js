import React, { useState } from 'react';
import { Container, Stack, Badge, Tabs, Tab, Table, ListGroup, ListGroupItem, InputGroup, Form, Button } from 'react-bootstrap';
import FormMovements from './FormMovements';
import FormNewProduct from './FormNewProduct';
import movements from '../data/movements.json'
import inventory from '../data/inventory.json'

function Inventory() {
  const [formMov, setFormMov] = useState(false);
  const [formProd, setFormProd] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterType2, setFilterType2] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');
  
  const showFormMov = () => setFormMov(!formMov)
  const showFormProd = () => setFormProd(!formProd)

  const searchText = (text) => {
    if (text.product.toLowerCase().includes(search.toLowerCase()) || text.sku.toLowerCase().includes(search.toLowerCase()) || text.doc.toLowerCase().includes(search.toLowerCase())) return text
  }
  const searchText2 = (text) => {
    if (text.product.toLowerCase().includes(search2.toLowerCase()) || text.sku.toLowerCase().includes(search2.toLowerCase())) return text
  }

  function type (item) {
    return filterType === "all" ? item : item.type === filterType
  }
  function type2 (item) {
    return filterType2 === "all" ? item : item.type === filterType2
  }
  
  function states (item) {
    return filterState === "all" ? item : item.state === filterState
  }

  function dates (item) {
    if (!start || !end) return item
    return item.date > start && item.date < end
  }

  function clearDates (e) {
    e.target.form.elements.start.value = ""
    e.target.form.elements.end.value = ""
    setStart()
    setEnd()
  }

  return ( 
    <Container fluid>
      <FormNewProduct show={formProd} hide={showFormProd} />
      <Tabs
        defaultActiveKey="inputOutput"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="inputOutput" title="Ingresos/Egresos">
          <FormMovements show={formMov} hide={showFormMov} />
          <Container className='d-flex justify-content-center align-items-center' style={{marginBottom: 20}}>
            <h3 style={{fontSize: 20, margin: 10}}>Cargar nuevo movimiento:</h3>
            <Button variant='primary' onClick={showFormMov}>+</Button>
          </Container>
          <Form className='d-flex justify-content-center'>
            <Stack direction="horizontal" gap={5}>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formDesc">
              <InputGroup.Text>Buscar:</InputGroup.Text>
              <Form.Control type="text" name="description" onChange={e => setSearch(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formType">
              <InputGroup.Text>Tipo:</InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={e => setFilterType(e.target.value)}>
                <option value="all">Todos</option>
                <option value="MP">MP</option>
                <option value="PT">PT</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formDatesStart">
              <InputGroup.Text>Desde:</InputGroup.Text>
              <Form.Control type="date" name="start" onChange={e => setStart(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formDatesEnd">
              <InputGroup.Text>Hasta:</InputGroup.Text>
              <Form.Control type="date" name="end" onChange={e => setEnd(e.target.value)} />
            </InputGroup>
            <Button variant="outline-danger" className="align-items-center justify-content-center" onClick={clearDates}>Limpiar fechas</Button>
            </Stack>
          </Form>
          <Table striped>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>SKU</th>
                <th>Tipo de material</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Fecha</th>
                <th>Responsable</th>
                <th>Remito/OP</th>
              </tr>
            </thead>
            <tbody>
              {movements.movements.filter(text => searchText(text)).filter(type).filter(dates).map((item, i) => <tr>
                  <td>{item.product}</td>
                  <td>{item.sku}</td>
                  <td>{item.type}</td>
                  <td>{item.qty}</td>
                  <td>{item.unit}</td>
                  <td>{item.date}</td>
                  <td>{item.person}</td>
                  <td>{item.doc}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>
        
        
        <Tab eventKey="inventory" title="Inventario">
          <Container className='d-flex justify-content-center align-items-center' style={{marginBottom: 20}}>
            <h3 style={{fontSize: 20, margin: 10}}>Crear un nuevo producto</h3>
            <Button variant='primary' onClick={showFormProd}>+</Button>
          </Container>
          <Form className='d-flex justify-content-center'>
            <Stack direction="horizontal" gap={5}>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formDesc">
              <InputGroup.Text>Buscar:</InputGroup.Text>
              <Form.Control type="text" name="description" onChange={e => setSearch2(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formType">
              <InputGroup.Text>Tipo:</InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={e => setFilterType2(e.target.value)}>
                <option value="all">Todos</option>
                <option value="MP">MP</option>
                <option value="PT">PT</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3 d-flex align-items-center justify-content-center" controlId="formType">
              <InputGroup.Text>Estado:</InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={e => setFilterState(e.target.value)}>
                <option value="all">Todos</option>
                <option value="Crítico">Críticos</option>
              </Form.Select>
            </InputGroup>
            </Stack>
          </Form>
          <Table striped>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Unidad</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {inventory.filter(text => searchText2(text)).filter(type2).filter(states).map((item, i) => <tr>
                  <td>{item.product}</td>
                  <td>{item.sku}</td>
                  <td>{item.qty}</td>
                  <td>{item.unit}</td>
                  <td><Badge bg={item.state === 'OK' ? 'success' : 'danger'}>{item.state}</Badge></td>
                  <td><Button variant='outline-warning'>Ajustar</Button><Button variant='outline-danger'>Eliminar</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
   );
}

export default Inventory;