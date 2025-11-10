"use client"

import { useParams } from "next/navigation";

import { useFetchPropertyDetail } from "@/hooks/useFetchPropertyDetail";
import PropertyData from "./PropertyData";

const DetailPage = () => {

  const {propertyId} = useParams();

  const {property, loading, error} = useFetchPropertyDetail(propertyId);  

  return (
    <div className="w-full px-2 pt-1 pb-2 rounded-sm">
      <PropertyData property={property}/>
    </div>
  )
}

export default DetailPage