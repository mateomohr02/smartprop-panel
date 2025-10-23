"use client";

import { Menu, X } from "lucide-react";

const NavToggle = ({ show, setShow }) => {
  return (
    <>
      {show ? (
        <button onClick={() => setShow(false)} aria-label="Cerrar Menú de Navegación" className="cursor-pointer"><X className="text-contrast" /></button>
      ) : (
        <button
          onClick={() => {
            setShow(true);
          }}
          aria-label="Abrir Menú de Navegación"
          className="cursor-pointer"
        >
          <Menu className="text-contrast"/>
        </button>
      )}
    </>
  );
};

export default NavToggle;
