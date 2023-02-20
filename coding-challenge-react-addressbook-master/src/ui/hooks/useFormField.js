import { useState } from 'react';

export default function useFormFields(initialValues) {
  const [fields, setFields] = useState(initialValues);

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  }

  return { fields, handleFieldChange };
}
