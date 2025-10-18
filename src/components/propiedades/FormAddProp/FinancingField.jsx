"use client"

const FinancingField = ({ property, setProperty }) => {
  const isDefault = property.financing === "Consultar";

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="financing">Financiación</label>
      <input
        type="text"
        name="financing"
        id="financing"
        className="bg-third rounded-sm p-2 drop-shadow-sm"
        placeholder={isDefault ? "Por defecto: Consultar" : ""}
        value={isDefault ? "" : property.financing}
        onChange={(e) =>
          setProperty({
            ...property,
            financing: e.target.value === "" ? "Consultar" : e.target.value,
          })
        }
      />
    </div>
  );
};

export default FinancingField;
