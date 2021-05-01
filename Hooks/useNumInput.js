import React, { useState } from "react";

const useNumInput = (intialValue, max) => {
  const [value, setValue] = useState(intialValue);
  const onChange = text => {
    if (!isNaN(parseInt(text)) ||  text === ""){
        if (text !== "" && max !== undefined && parseInt(text) > max){
            setValue(`${max}`)
        } else {
            setValue(text)
        }
    }
  };
  return { value, onChange };
};

export default useNumInput;