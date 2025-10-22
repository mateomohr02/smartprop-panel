export const setFormData = (files) => { 
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file); // usar la misma key "files" para todos
  });
  return formData;
};
