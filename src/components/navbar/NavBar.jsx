"use client";

import NavToggle from "./NavToggle";
import NavigationLinks from "./NavigationLinks";

import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="absolute z-50 w-full flex flex-col ">
      <div className="flex justify-between px-4 py-4 bg-primary z-50 border-b border-contrast">
        <div>
          <Link href="/dashboard" className="text-contrast text-xl">
          SmartProp
          </Link>
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
