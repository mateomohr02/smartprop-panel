"use client";

import React, { useRef } from "react";
import { CirclePlus, Trash2, Camera } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const MultimediaField = ({ property, setProperty, errors, setErrors, hasTriedSubmit }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    const images = files.filter((f) => f.type.startsWith("image/"));
    const videos = files.filter((f) => f.type.startsWith("video/"));

    const updated = {
      ...property,
      multimedia: {
        images: [...(property.multimedia.images || []), ...images],
        videos: [...(property.multimedia.videos || []), ...videos],
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  const handleDelete = (fileName) => {
    const updated = {
      ...property,
      multimedia: {
        images: property.multimedia.images.filter((f) => f.name !== fileName),
        videos: property.multimedia.videos.filter((f) => f.name !== fileName),
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();
  const triggerCameraInput = () => cameraInputRef.current.click();

  const allFiles = [
    ...(property.multimedia.images || []),
    ...(property.multimedia.videos || []),
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-baseline">
        <label htmlFor="multimedia">Multimedia</label>
        <label htmlFor="multimediaError" className="text-red-500 text-sm">
          {errors?.multimedia?.images && errors?.multimedia?.images}
        </label>
      </div>

      <div className="flex flex-col w-full gap-2">
        {/* Botones de carga */}
        <div className="flex w-full gap-2">
          {/* Subir archivos */}
          <div
            onClick={triggerFileInput}
            className="w-2/3 bg-third drop-shadow-sm rounded-sm p-3 flex items-center justify-center cursor-pointer"
          >
            <CirclePlus size={24} className="opacity-40" />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
            />
          </div>

          {/* Abrir cámara */}
          <div
            onClick={triggerCameraInput}
            className="w-1/3 bg-third drop-shadow-sm rounded-sm p-3 flex items-center justify-center cursor-pointer"
          >
            <Camera size={22} className="opacity-50" />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFilesChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Lista de archivos */}
        <div>
          {allFiles.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-third rounded-sm drop-shadow-sm py-3 px-2"
            >
              <span className="truncate text-sm">{file.name}</span>
              <Trash2
                size={18}
                className="text-gray-600 cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(file.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultimediaField;
