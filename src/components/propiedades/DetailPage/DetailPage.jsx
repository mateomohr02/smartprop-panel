"use client"

import { useParams } from "next/navigation";

import { useFetchPropertyDetail } from "@/hooks/useFetchPropertyDetail";

const DetailPage = () => {

  const {propertyId} = useParams();

  const {property, loading, error} = useFetchPropertyDetail(propertyId);

  console.log(property);
  

  return (
    <div>DetailPage</div>
  )
}

export default DetailPage