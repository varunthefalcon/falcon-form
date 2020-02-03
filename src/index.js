import { useState } from 'react'

const falconForm = (initValues, successCallback, fieldValidators) => {
  const [values, setValues] = useState({ ...initValues })

  const [dirtyInit, setDirtyInit] = useState({ ...initValues })

  if (
    dirtyInit !== true &&
    JSON.stringify(dirtyInit) !== JSON.stringify(initValues)
  ) {
    setValues({ ...initValues })
    setDirtyInit(true)
  }

  const [errors, setErrors] = useState({})
  const [, setIsSubmitting] = useState(false)

  const validate = fieldValues => {
    let newErrors = {}
    let oldErrors = { ...errors }
    Object.keys(fieldValues).forEach(field => {
      const value = fieldValues[field]
      let valitationExps = fieldValidators[field]
      if (typeof valitationExp === 'function') {
        valitationExps = [valitationExps]
      }
      if (Array.isArray(valitationExps)) {
        valitationExps.forEach(valitationExp => {
          if (
            typeof valitationExp === 'function' &&
            !newErrors[field] &&
            valitationExp(value, values)
          ) {
            if (oldErrors[field]) {
              return
            }
            newErrors[field] = valitationExp(value)
          } else {
            delete oldErrors[field]
          }
        })
      }
    })
    return { ...oldErrors, ...newErrors }
  }

  const formSubmit = event => {
    event.preventDefault()
    setIsSubmitting(true)
    let anyErrors = validate(values)
    if (Object.keys(anyErrors).length === 0) {
      successCallback(values)
    } else {
      setErrors(anyErrors)
    }
    setIsSubmitting(false)
  }

  const fieldChange = event => {
    let { name, value, type, checked } = event.target
    if (type === 'checkbox') {
      const checkboxValues = values[name]
      if (Array.isArray(checkboxValues)) {
        value = checked ? [...checkboxValues, value] : checkboxValues.filter(e => e !== value)
      } else {
        value = checked
        console.warn('[violation] Initial value for checkbox field "' + name + '" should be array.', checked)
      }
    }
    setValues(values => ({
      ...values,
      [name]: value
    }))
    setErrors(validate({ [name]: value }))
  }

  return {
    fieldChange,
    formSubmit,
    values,
    errors
  }
}

export default falconForm

const emailRegex = /\S+@\S+\.\S+/

export const isRequired = value => !value && 'Field is required'

export const isEmail = value =>
  !emailRegex.test(value) && 'Field must be a valid email'

export const customValidation = (method, message) => (
  value,
  allvalue
) => method(value, allvalue) && message

export const checkboxHelper = (data, value) => {
  if (Array.isArray(data)) {
    return data.includes(value)
  }
  return data
}
