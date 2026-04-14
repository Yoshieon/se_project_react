import { useState, useCallback, useRef } from "react";

export function useForm(defaultValues = {}) {
  const initialValues = useRef(defaultValues);
  const [values, setValues] = useState(initialValues.current);

  const handleChange = useCallback((evt) => {
    const target = evt.target;
    const name = target.name;
    if (!name) return;

    const { type, checked, files, options } = target;
    const rawValue = target.value;

    setValues((prev) => {
      // Start with previous state for this field
      let newValue;

      if (type === "checkbox") {
        // Support checkbox groups (array in state) or single boolean
        if (Array.isArray(prev[name])) {
          const current = prev[name] || [];
          if (checked) {
            newValue = [...current, rawValue];
          } else {
            newValue = current.filter((v) => v !== rawValue);
          }
        } else {
          newValue = !!checked;
        }
      } else if (type === "file") {
        newValue = files;
      } else if (target.multiple && options) {
        newValue = Array.from(options)
          .filter((o) => o.selected)
          .map((o) => o.value);
      } else if (type === "number") {
        newValue = rawValue === "" ? "" : Number(rawValue);
      } else {
        newValue = rawValue;
      }

      return { ...prev, [name]: newValue };
    });
  }, []);

  const resetForm = useCallback((newValues = initialValues.current) => {
    setValues(newValues);
  }, []);

  const handleSubmit = useCallback(
    (onSubmit) => (evt) => {
      if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
      if (typeof onSubmit === "function") onSubmit(values);
    },
    [values],
  );

  return { values, setValues, handleChange, resetForm, handleSubmit };
}
