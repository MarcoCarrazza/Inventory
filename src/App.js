import Home from "./Components/Home"
import Enter from "./Components/Enter";
import Production from "./Components/Production";
import Inventory from "./Components/Inventory";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Layout from "./Router/Layout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="reports" element={<Enter />} />
        <Route path="production" element={<Production />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
}

export default App;