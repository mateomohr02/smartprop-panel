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

const FormAddProperty = ({ property, setProperty }) => {
  return (
    <form className="w-full bg-contrast rounded-sm p-2 gap-2 flex flex-col items-center justify-center">
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
    </form>
  );
};

export default FormAddProperty;
