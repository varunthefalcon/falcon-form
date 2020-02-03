# falcon-form

> Form handling and error validation in React hooks.

[![NPM](https://img.shields.io/npm/v/falcon-form.svg)](https://www.npmjs.com/package/falcon-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dt/falcon-form.svg?style=flat-square)](https://www.npmjs.com/package/falcon-form)
![npm bundle size](https://img.shields.io/bundlephobia/min/falcon-form)

## Install

```bash
npm install --save falcon-form
```

## Demo

Codesandbox [here](https://codesandbox.io/s/falcon-form-izvhv)

## Features

- No Wrapper | No HOC | Just KISS.
- Your design, our logics.
- Specific message for custom conditionals.
- React-native support.
- [Tiny bundle](https://bundlephobia.com/result?p=falcon-form@latest) with no dependencies.
- native HTML support.

## Usage

```jsx
import React, { useState } from "react";
import falconForm, { isRequired, isEmail, checkboxHelper } from "falcon-form";

var renderCount = 0;

const App = () => {
  let [formInitialValues] = useState({
    email: "",
    name: "",
    department: []
  }); // getInitialValues, use setFormInitialValues to set data from API

  const formSubmitAction = values => {
    console.log("Form submitted", values);
  }; // declare submit success action

  const fieldValidators = {
    email: [isRequired, isEmail],
    name: [isRequired]
  }; // declare field validators

  const { values, errors, fieldChange, formSubmit } = falconForm(
    formInitialValues,
    formSubmitAction,
    fieldValidators
  );
  // pass initial values, submit actions, field validators
  // use values, errors and field handlers in form

  renderCount += 1;
  return (
    <div>
      <h4>Render count : {renderCount}</h4>
      <form onSubmit={formSubmit}>
        Name:
        <br />
        <input
          type="text"
          name="name"
          onChange={fieldChange}
          value={values.name}
        />
        {errors.name}
        <br />
        Email:
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
        <input
          type="checkbox"
          name="department"
          id="ece"
          value="ece"
          checked={checkboxHelper(values.department, "ece")}
          onChange={fieldChange}
        /> ECE
        <input
          type="checkbox"
          name="department"
          id="cse"
          value="cse"
          checked={checkboxHelper(values.department, "cse")}
          // checkboxHelper equivalent to values.department.includes('ece'), with single checkbox support
          onChange={fieldChange}
        />{" "}
        CSE
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
```

## Create custom validations

```jsx
import { customValidation } from "falcon-form";

// create custom validation function
// all form values available as second param
const min3CharRule = value => value.length < 3;

const stringMin3Char = customValidation(
  min3CharRule,
  "Minimum 3 letters required"
);

// Pass these validations to fieldValidators
```

## License

MIT © [varunthefalcon](https://github.com/varunthefalcon)

---
