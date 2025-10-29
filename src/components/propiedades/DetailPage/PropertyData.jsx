"use client";

import SideCard from "./SideCard";
import MainCard from "./MainCard";

const PropertyData = ({ property }) => {
  
  return (
    <div className="w-full flex flex-col bg-contrast rounded-sm">
      <SideCard property={property} />
      <MainCard property={property} />
    </div>
  );
};

export default PropertyData;
