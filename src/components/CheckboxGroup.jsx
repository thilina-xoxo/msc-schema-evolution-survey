function CheckboxGroup({
  label,
  name,
  values = [],
  options,
  required,
  onChange,
  error,
}) {
  function handleChange(option) {
    const nextValues = values.includes(option)
      ? values.filter((value) => value !== option)
      : [...values, option]

    onChange(name, nextValues)
  }

  return (
    <fieldset className={`question ${error ? 'has-error' : ''}`}>
      <legend>
        {label}
        {required && <span className="required"> *</span>}
      </legend>
      <div className="option-list checkbox-grid">
        {options.map((option) => (
          <label className="choice" key={option}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={() => handleChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </fieldset>
  )
}

export default CheckboxGroup
