"use client";

import NavToggle from "./NavToggle";
import NavigationLinks from "./NavigationLinks";

import { useState } from "react";

import { motion } from "framer-motion";

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between px-4 py-4 bg-primary z-50 border-b border-contrast">
        <div>
          <p className="text-contrast text-xl">
          SmartProp
          </p>
        </div>

        <NavToggle
          show={showLinks}
          setShow={setShowLinks}
        />
      </div>
      <motion.div layout className="bg-contrast">
        <NavigationLinks
          show={showLinks}
          setShow={setShowLinks}
        />
      </motion.div>
    </div>
  );
};

export default NavBar;
