import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../Components/NavBar'

export default function Layout() {
  return (
    <>
      <header>
        <NavBar className='NavBar' />
      </header>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
}