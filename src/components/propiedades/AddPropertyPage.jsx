"use client"

import { useState } from "react"

import FormAddProperty from "./FormAddProp/FormAddProperty"

const AddPropertyPage = () => {

    const [newProperty, setNewProperty] = useState({
        title:"",
        propertyType:"", //Hay que obtenerlos de la db 
        propertyTypeSlug:"",
        description:"",
        operation:"",
        price:"",
        priceFIAT:"",
        expenses:"",
        expensesFIAT:"",
        financing:"Consultar",
        multimedia:{
            images:[],
            video:[]
        },
        surface:{
            covered:"",
            total:""
        },
        services:{
            light:true,
            water:true,
            gas:true
        },
        condition:"",
        age:"",
        availabilityType:"Inmediate",
        availabilityDate: null,
        rooms:"",
        bedrooms:"",
        bathrooms:"",
        garages:"",
        address:"",
        place:{
            countryInput:"",
            provinceInput:"",
            cityInput:"",
            neighborhoodInput:""
        },
        mapLocation:{
            lat:"",
            long:""
        },
        otherRooms:[],
        comodities:[],
        characteristics:[]
    })

  return (
    <div className="p-2">
        <FormAddProperty property={newProperty} setProperty={setNewProperty}/>
    </div>
  )
}

export default AddPropertyPage