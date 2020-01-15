import React, { useState } from "react";
import falconForm from "falcon-form";

const emailRegex = /\S+@\S+\.\S+/;
export let isRequired = value => !value && "Field is required";
export const isEmail = value =>
  !emailRegex.test(value) && "Field must be a valid email";

const fieldValidators = {
  email: [isRequired, isEmail],
  name: [isRequired]
};

const App = () => {
  let [formInitialValues] = useState({
    email: "",
    name: ""
  });

  const formSubmitAction = values => {
    console.log(values);
  };
  const { values, errors, fieldChange, formSubmit } = falconForm(
    formInitialValues,
    formSubmitAction,
    fieldValidators
  );

  return (
    <div>
      <form onSubmit={formSubmit}>
        First name:
        <br />
        <input
          type="text"
          name="name"
          onChange={fieldChange}
          value={values.name}
        />
        {errors.name}
        <br />
        Last name:
        <br />
        <input
          type="email"
          name="email"
          onChange={fieldChange}
          value={values.email}
        />
        {errors.email}
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default App;
