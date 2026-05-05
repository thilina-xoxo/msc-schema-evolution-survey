function RadioGroup({ label, name, value, options, required, onChange, error }) {
  return (
    <fieldset className={`question ${error ? 'has-error' : ''}`}>
      <legend>
        {label}
        {required && <span className="required"> *</span>}
      </legend>
      <div className="option-list">
        {options.map((option) => (
          <label className="choice" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(name, event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </fieldset>
  )
}

export default RadioGroup
