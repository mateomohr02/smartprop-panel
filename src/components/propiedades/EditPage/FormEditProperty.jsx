import { useState } from "react"

import TitleAndDescriptionEdit from "./FormEdit/TitleAndDescriptionEdit"

import { useSubmitProperty } from "@/hooks/useSubmitProperty";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const FormEditProperty = ({property, setProperty}) => {   

     const { submitProperty, progress, loading, error } = useSubmitProperty();
    
      const [errors, setErrors] = useState({});
      const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  return (
    <div 
        className="w-full bg-contrast rounded-sm p-2 gap-2 flex flex-col items-center justify-center"
    >
        <TitleAndDescriptionEdit property={property} setProperty={setProperty} errors={errors} setErrors={setErrors} hasTriedSubmit={hasTriedSubmit}/>
    </div>
  )
}

export default FormEditProperty