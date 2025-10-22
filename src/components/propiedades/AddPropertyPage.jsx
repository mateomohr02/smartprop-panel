"use client"

import { useState } from "react"

import FormAddProperty from "./FormAddProp/FormAddProperty"

const AddPropertyPage = () => {

    const [newProperty, setNewProperty] = useState({
        title:"",
        propertyTypeSlug:"",
        description:"",
        operation:"",
        price:"",
        priceFIAT:null,
        expenses:"",
        expensesFIAT:null,
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
        condition:null,
        age:"",
        availabilityType:"inmediate",
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
            lng:""
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