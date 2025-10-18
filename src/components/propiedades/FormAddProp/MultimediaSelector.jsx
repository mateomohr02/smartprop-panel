"use client";

import { useRef } from "react";
import { CirclePlus, Trash2 } from "lucide-react";

const MultimediaField = ({ property, setProperty }) => {
  const fileInputRef = useRef(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    // Guardamos en multimedia, separando imágenes y videos
    const images = files.filter((f) => f.type.startsWith("image/"));
    const videos = files.filter((f) => f.type.startsWith("video/"));

    setProperty({
      ...property,
      multimedia: {
        images: [...property.multimedia.images, ...images],
        video: [...property.multimedia.video, ...videos],
      },
    });
  };

  const handleDelete = (fileName) => {
    setProperty({
      ...property,
      multimedia: {
        images: property.multimedia.images.filter((f) => f.name !== fileName),
        video: property.multimedia.video.filter((f) => f.name !== fileName),
      },
    });
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const allFiles = [
    ...property.multimedia.images,
    ...property.multimedia.video,
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
        <label>Multimedia</label>
      <div className="flex flex-col w-full gap-2">

        {/* Campo para agregar archivos */}
        <div
          onClick={triggerFileInput}
          className="bg-third drop-shadow-sm rounded-sm p-3 flex items-center justify-center cursor-pointer"
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

        <div>
          {/* Lista de archivos */}
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
