# falcon-form

> Handles React hooks form and error values without hassle

[![NPM](https://img.shields.io/npm/v/falcon-form.svg)](https://www.npmjs.com/package/falcon-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dt/falcon-form.svg?style=flat-square)](https://www.npmjs.com/package/falcon-form)

## Install

```bash
npm install --save falcon-form
```

## Usage

```jsx
import React, { useState } from "react";
import falconForm, { isRequired, isEmail } from "falcon-form";

var renderCount = 0;

const App = () => {
  let [formInitialValues] = useState({
    email: "",
    name: ""
  }); // use setFormInitialValues to set data from API

  const formSubmitAction = values => {
    console.log(values);
  };

  const fieldValidators = {
    email: [isRequired, isEmail],
    name: [isRequired]
  };

  const { values, errors, fieldChange, formSubmit } = falconForm(
    formInitialValues,
    formSubmitAction,
    fieldValidators
  );
  renderCount += 1;
  return (
    <div>
      <h4>Render count : {renderCount}</h4>
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
```

## License

MIT © [varunthefalcon](https://github.com/varunthefalcon)

---
