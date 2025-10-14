"use client";

import { motion, AnimatePresence } from "framer-motion";
import NavLinkButton from "./NavLinkButton";
import { LogOut } from "lucide-react";
import { logout } from "@/utils/logout";
import { useRouter } from "next/navigation";

const NavigationLinks = ({ show, setShow }) => {

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
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
            {localStorage.getItem("token") ? (
              <>
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

                <NavLinkButton
                  href="/usuarios"
                  text="Usuarios"
                  setShow={setShow}
                />
                <NavLinkButton
                  href="/facturación"
                  text="Facturación"
                  setShow={setShow}
                />
                <button
                  onClick={() => handleLogout()}
                  className="py-2 text-contrast flex justify-center items-center"
                >
                  <LogOut className="mx-1 px-0.5" /> Cerrar Sesión{" "}
                </button>
              </>
            ) : (
              <NavLinkButton
                href="/login"
                text="Iniciar Sesión"
                setShow={setShow}
              />
            )}
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default NavigationLinks;
