"use client";

const FinancingField = ({ property, setProperty }) => {
  const isDefault = property.data.financing === "Consultar";

  const handleChange = (e) => {
    const value = e.target.value === "" ? "Consultar" : e.target.value;

    setProperty({
      ...property,
      data: {
        ...property.data,
        financing: value,
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="financing">Financiación</label>
      <input
        type="text"
        name="financing"
        id="financing"
        className="bg-third rounded-sm p-2 drop-shadow-sm"
        placeholder={isDefault ? "Por defecto: Consultar" : ""}
        value={isDefault ? "" : property.data.financing}
        onChange={handleChange}
      />
    </div>
  );
};

export default FinancingField;
