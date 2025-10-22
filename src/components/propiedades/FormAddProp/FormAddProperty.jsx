"use client";

import TitleDescriptionFields from "./TitleDescriptionFields";
import PropertyTypeSelector from "./PropertyTypeSelector";
import OperationTypeSelector from "./OperationTypeSelector";
import PriceAndExpensesFields from "./PriceAndExpensesFields";
import FinancingField from "./FinancingField";
import MultimediaSelector from "./MultimediaSelector";
import SurfaceFields from "./SurfaceFields"
import ServicesSelector from "./ServicesSelector";
import AgeAndAvailability from "./AgeAndAvailability";
import ConditionSelector from "./ConditionSelector";
import RoomsAndBedroomsFields from "./RoomsAndBedroomsFields";
import BathroomsAndGaragesFields from "./BathroomsAndGaragesFields";
import AddressFields from "./AddressFields";
import LocationFields from "./LocationFields";
import MapLocationField from "./MapLocationField";
import ComoditiesField from "./ComoditiesField";
import CharacteristicField from "./CharacteristicField";
import RoomsFields from "./RoomsFields";
import ActionButtons from "./ActionButtons";
import { useSubmitProperty } from "@/hooks/useSubmitProperty";

const FormAddProperty = ({ property, setProperty }) => {

  const { submitProperty, progress, loading, error } = useSubmitProperty();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitProperty(property);
      console.log("✅ Propiedad subida:", response);
    } catch (err) {
      console.error("❌ Error al subir:", err);
    }
  };

  return (
    <form 
    onSubmit={handleSubmit}
    className="w-full bg-contrast rounded-sm p-2 gap-2 flex flex-col items-center justify-center">
      <TitleDescriptionFields property={property} setProperty={setProperty} />
      <PropertyTypeSelector property={property} setProperty={setProperty}/>
      <OperationTypeSelector property={property} setProperty={setProperty}/>
      <PriceAndExpensesFields property={property} setProperty={setProperty}/>
      <FinancingField property={property} setProperty={setProperty}/>
      <MultimediaSelector property={property} setProperty={setProperty} />
      <SurfaceFields property={property} setProperty={setProperty}/>
      <ServicesSelector property={property} setProperty={setProperty}/>
      <ConditionSelector property={property} setProperty={setProperty}/>
      <AgeAndAvailability property={property} setProperty={setProperty}/>
      <RoomsAndBedroomsFields property={property} setProperty={setProperty}/>
      <BathroomsAndGaragesFields property={property} setProperty={setProperty}/>
      <AddressFields property={property} setProperty={setProperty}/>
      <LocationFields property={property} setProperty={setProperty}/>
      <MapLocationField property={property} setProperty={setProperty} />
      <ComoditiesField property={property} setProperty={setProperty}/>
      <CharacteristicField property={property} setProperty={setProperty}/>
      <RoomsFields property={property} setProperty={setProperty}/>
      <ActionButtons property={property} setProperty={setProperty}/>
    </form>
  );
};

export default FormAddProperty;
