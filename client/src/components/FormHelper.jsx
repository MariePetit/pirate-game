import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormHelper = ({ label, input, formSubErrors }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (formSubErrors.length > 0) {
      let piledErrors = formSubErrors.filter((err) => {
        return input.name.includes(err.type);
      });
      if (piledErrors.length > 0) {
        setError(true);
      } else {
        setError(false);
      }
      setFormErrors(piledErrors);
    }
  }, [formSubErrors]);
  const handleChange = (ev) => {
    if (input.required && ev.target.value.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Wrapper>
      <Label htmlFor={input.name}>
        {label}
        {input.required && "*"}
      </Label>
      {formErrors.length > 0 && <ErrorDiv>{formErrors[0].error}</ErrorDiv>}
      <Input
        error={error}
        onChange={handleChange}
        type={input.type}
        name={input.name}
        placeholder={`${input.required ? " " : "optional"}`}
        required={input.required}
      />
    </Wrapper>
  );
};

const ErrorDiv = styled.div`
  position: absolute;
  right: 10px;
  top: -5px;
  background: white;
  padding: 5px;
  font-size: 10px;
  color: red;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
const Label = styled.label`
  font-weight: bold;
  margin-top: 7px;
`;

const Input = styled.input`
  margin-left: 20px;
  height: 35px;
  outline: none;
  border: ${({ error }) => (error ? "2px solid red" : "2px solid black")};
  border-radius: 2px;
`;

export default FormHelper;
