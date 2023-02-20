import { useState } from "react";

function useFormField(initialValue) {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return [value, onChange];
}
