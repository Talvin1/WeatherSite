import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import SearchData from "../types/SearchData";
import TempType from "../types/TempType";

type TempFormProps = {
  register: UseFormRegister<SearchData>;
  setValue: UseFormSetValue<SearchData>;
  tempType: TempType;
  setTempType: (tempType: TempType) => void;
};

const TempForm: React.FC<TempFormProps> = ({ register, setValue, tempType, setTempType }) => {
  const handleTempTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTempType = e.target.value as TempType;
    setTempType(selectedTempType);
    setValue("tempType", selectedTempType); // Update the form value
  };

  return (
    <label className="form_label">
      Temperature Unit:
      <select {...register("tempType")} value={tempType} onChange={handleTempTypeChange} className="temp_select">
        <option className="tempOption" value="metric">
          °C
        </option>
        <option className="tempOption" value="imperial">
          °F
        </option>
        <option className="tempOption" value="kelvin">
          °K
        </option>
      </select>
    </label>
  );
};

export default TempForm;
