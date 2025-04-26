import React from 'react';
import InputField from '../../inputFields.jsx';
import '../../../App.css';

function InputDiv({ divName, Field, values, setValues }) {
  const handleChange = (index, e) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  return (
    <div id="Input_Divs">
      <h3>{divName}:</h3>
      <InputField fieldName={`${Field}1:`} value={values[0]} onChange={(e) => handleChange(0, e)} />
      <InputField fieldName={`${Field}2:`} value={values[1]} onChange={(e) => handleChange(1, e)} />
      <InputField fieldName={`${Field}3:`} value={values[2]} onChange={(e) => handleChange(2, e)} />
    </div>
  );
}

export default InputDiv;
