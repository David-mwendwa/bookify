import { useState } from 'react';

const useInput = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const resetValues = () => setValues(initialValues);

  const handleChange = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // TODO: if there's a preview set values for both preview and image
          setValues({ ...values, [e.target.name]: reader.result });
          // setAvatar(reader.result);
          // setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, resetValues, handleChange };
};

export default useInput;
