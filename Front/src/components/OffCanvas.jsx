import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "./Label";
import Input from "./Input";
import Alert from "./Alert";
import validateInput from "../utils/validateInput";
import SelectWithFilters from "./SelectWithFilters";
import { setSelectedOptions, clearSelectedOptions } from "../actions/actions";
import { defaultArgs } from "../utils/data";
export const OffCanvas = ({
  title,
  actionType,
  onSubmit,
  fields,
  handleCloseForm,
}) => {
  const formInitialState = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue || "",
    }),
    {}
  );

  const buttonText = actionType.includes("crear") ? "Crear" : "Actualizar";
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(formInitialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formAlert, setFormAlert] = useState({ message: "", type: "" });
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      if (fieldErrors[name]) {
        setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    },
    [setFormData, fieldErrors]
  );

  const handleSelectChange = useCallback(
    (fieldName, selectedOptions) => {
      const updatedValues = selectedOptions.map((option) => option.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: updatedValues,
      }));
      dispatch(setSelectedOptions(selectedOptions || []));
    },
    [setFormData]
  );
  const selectedOptions = useSelector((state) => state.selectedOptions);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      let isValid = true;
      let errors = {};
      let dynamicSelections = {};
      fields.forEach((field) => {
        const error = validateInput(field.validations, formData[field.name]);
        if (error) {
          errors[field.name] = error;
          isValid = false;
        }
        if (field.type === "select" && field.targetField) {
          dynamicSelections[field.targetField] = selectedOptions.map(
            (option) => option.value
          );
        }
      });
      setFieldErrors(errors);

      if (!isValid) {
        setFormAlert({
          message: "Falta completar campos obligatorios.",
          type: "error",
        });
      } else {
        const updatedFormData = {
          ...formData,
          ...dynamicSelections,
        };

        onSubmit(updatedFormData);
        setFormAlert({
          message: "Se ha creado correctamente.",
          type: "success",
        });
        setFormData(formInitialState);
        handleCloseForm();
      }
    },
    [
      fields,
      formData,
      onSubmit,
      formInitialState,
      handleCloseForm,
      selectedOptions,
    ]
  );
  return (
    <div
      className={`fixed z-40 w-80 h-screen top-0 duration-100 right-0 ease-in-out border-l `}
    >
      {formAlert.message && (
        <div className="fixed top-0 left-1/2  -translate-x-1/2 z-50 ">
          <div className=" p-4 rounded w-auto ">
            <Alert
              type={formAlert.type}
              message={formAlert.message}
              onDismiss={() => setFormAlert({ message: "", type: "" })}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className=" flex flex-col h-full bg-white">
        <div className="bg-gradient-to-r from-Blue-400 to-purple-400 py-2 px-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#123259]">{title}</h3>
          <button className="cursor-pointer" onClick={handleCloseForm}>
            <img src="/assets/Close.png" alt="btn-close" />
          </button>
        </div>
        <div className="flex flex-col flex-1 p-2 gap-2 text-base">
          {fields
            .map((field) =>
              field.type === "select" ? (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <SelectWithFilters
                    name={field.name}
                    data={field.options}
                    value={formData[field.value]}
                    onChange={(selectedOptions) =>
                      handleSelectChange(field.name, selectedOptions)
                    }
                    selectedOptions={formData[field.name]}
                    isMulti={field.isMulti}
                    styles={field.styles}
                    {...defaultArgs}
                  />
                </div>
              ) : (
                <div key={field.name} className="grid">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    validations={field.validations}
                    validateInputConfig={field.validations}
                    error={fieldErrors[field.name]}
                    {...defaultArgs}
                  />
                </div>
              )
            )}
        </div>
        <div className="p-3 bg-gray-200 border-t border-gray-300 flex gap-4">
          <button
            className=" px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out"
            type="submit"
          >
            {buttonText}
          </button>
          <button
            className=" px-4 py-2 text-purple-600 border border-purple-600 rounded cursor-pointer text-center bg-white"
            type="button"
            onClick={handleCloseForm}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default OffCanvas;
