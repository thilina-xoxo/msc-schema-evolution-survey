function SelectQuestion({
  label,
  name,
  value,
  options,
  required,
  onChange,
  error,
}) {
  return (
    <div className={`question ${error ? 'has-error' : ''}`}>
      <label className="question-label" htmlFor={name}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default SelectQuestion
