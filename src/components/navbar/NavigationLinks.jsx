"use client";

import { motion, AnimatePresence } from "framer-motion";
import NavLinkButton from "./NavLinkButton";
import { LogOut } from "lucide-react";


const NavigationLinks = ({ show, setShow }) => {

  const handleLogout = () => {
    setShow(false);
  };



  return (
    <>
      {show ? (
        <AnimatePresence>
          <motion.div
            className="w-full flex flex-col items-center px-4 bg-primary z-40"
            initial={{ y: -50, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <NavLinkButton
              href="/propiedades"
              text="Propiedades"
              setShow={setShow}
            />

            <NavLinkButton
              href="/metricas"
              text="Métricas"
              setShow={setShow}
            />

            <NavLinkButton
              href="/consultas"
              text="Consultas"
              setShow={setShow}
            />

            <NavLinkButton href="/usuarios" text="Usuarios" setShow={setShow} />
            <NavLinkButton href="/facturación" text="Facturación" setShow={setShow} />
            {/* Renderizado condicional de Login o Logout */}
            <button onClick={() => handleLogout()} className="py-2 text-contrast flex justify-center items-center"><LogOut className="mx-1 px-0.5"/> Cerrar Sesión  </button>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default NavigationLinks;
