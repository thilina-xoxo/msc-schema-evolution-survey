function ScaleQuestion({
  label,
  name,
  value,
  required,
  leftLabel,
  rightLabel,
  onChange,
  error,
}) {
  const options = ['1', '2', '3', '4', '5']

  return (
    <fieldset className={`question ${error ? 'has-error' : ''}`}>
      <legend>
        {label}
        {required && <span className="required"> *</span>}
      </legend>
      <div className="scale-labels">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="scale-options" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <label className="scale-choice" key={option}>
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

export default ScaleQuestion
