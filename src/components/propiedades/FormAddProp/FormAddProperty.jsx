"use client";

import { useState } from "react";

import TitleDescriptionFields from "./TitleDescriptionFields";
import PropertyTypeSelector from "./PropertyTypeSelector";
import OperationTypeSelector from "./OperationTypeSelector";
import PriceAndExpensesFields from "./PriceAndExpensesFields";
import FinancingField from "./FinancingField";
import MultimediaSelector from "./MultimediaSelector";
import SurfaceFields from "./SurfaceFields";
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
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const FormAddProperty = ({ property, setProperty }) => {
  const { submitProperty, progress, loading, error } = useSubmitProperty();

  const [errors, setErrors] = useState({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasTriedSubmit(true);
    const validationErrors = validateAddPropertyForm(property);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Errores de validación:", validationErrors);
      return;
    }

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
      className="w-full bg-contrast rounded-sm p-2 gap-2 flex flex-col items-center justify-center"
    >
      <TitleDescriptionFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <PropertyTypeSelector property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <OperationTypeSelector property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <PriceAndExpensesFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <FinancingField property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <MultimediaSelector property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <SurfaceFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <ServicesSelector property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <ConditionSelector property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <AgeAndAvailability property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <RoomsAndBedroomsFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <BathroomsAndGaragesFields
        property={property}
        setProperty={setProperty}
      errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <AddressFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <LocationFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <MapLocationField property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <ComoditiesField property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <CharacteristicField property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <RoomsFields property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
      <ActionButtons property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
    </form>
  );
};

export default FormAddProperty;
