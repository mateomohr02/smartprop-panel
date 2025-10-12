"use client";

import { motion, AnimatePresence } from "framer-motion";
import NavLinkButton from "./NavLinkButton";


const NavigationLinks = ({ show, setShow }) => {
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
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default NavigationLinks;
