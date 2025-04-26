import React from 'react';

function InputField({ fieldName, value, onChange }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "10px", margin:"10px" }}>
      <label>{fieldName}</label>
      <input value={value} onChange={onChange} />
    </span>
  );
}

export default InputField;
