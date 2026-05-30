import ScaleQuestion from './ScaleQuestion'

const affectedActivityOptions = [
  'Effort estimation and sprint planning',
  'Data migration or data correction',
  'API/event compatibility handling',
  'Testing and regression validation',
  'Deployment, rollback, and post-release support',
]

const riskSignalOptions = [
  'Multiple services or teams are affected',
  'Existing production data must be migrated',
  'Backward compatibility or API/event contracts are affected',
  'Rollback or deployment sequencing is difficult',
  'Automated test coverage or data quality is weak',
]

const confidenceActionOptions = [
  'Perform early impact analysis',
  'Involve senior engineers or architects early',
  'Create migration and rollback plans',
  'Validate changes with automated tests',
  'Coordinate early with dependent teams',
]

function CheckboxGroup({
  label,
  name,
  values = [],
  options,
  required,
  helper,
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
      {helper && <p className="question-helper">{helper}</p>}
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

function TextareaQuestion({ label, name, value, onChange, placeholder }) {
  return (
    <div className="question">
      <label className="question-label" htmlFor={name}>
        {label}
        <span className="optional-label">Optional</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows="5"
        onChange={(event) => onChange(name, event.target.value)}
      />
    </div>
  )
}

function DeliveryGroup({ children }) {
  return <div className="delivery-group">{children}</div>
}

function SoftwareDeliveryImpact({
  formData,
  errors,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  submissionError,
}) {
  return (
    <section>
      <h2>Section 6: Software Delivery Impact and Final Reflection</h2>
      <p className="section-intro">
        This final section focuses on how schema-related changes affect
        software delivery, including planning, estimation, implementation,
        testing, release, and support work involving databases, APIs, events,
        or data structures.
      </p>

      <div className="delivery-section">
        <DeliveryGroup>
          <ScaleQuestion
            label="Q56. When a software delivery item includes a schema-related change, how much does it usually affect delivery effort?"
            name="schema_delivery_effort_impact"
            value={formData.schema_delivery_effort_impact}
            required
            leftLabel="1 = No additional effort"
            rightLabel="5 = Very high additional effort"
            onChange={onChange}
            error={errors.schema_delivery_effort_impact}
          />
          <CheckboxGroup
            label="Q57. Which delivery activities are most affected when a change involves schema evolution?"
            name="schema_affected_delivery_activities"
            values={formData.schema_affected_delivery_activities}
            options={affectedActivityOptions}
            required
            helper="Select all that apply."
            onChange={onChange}
            error={errors.schema_affected_delivery_activities}
          />
          <CheckboxGroup
            label="Q58. What warning signs indicate that a schema-related change may become a delivery risk?"
            name="schema_delivery_risk_signals"
            values={formData.schema_delivery_risk_signals}
            options={riskSignalOptions}
            required
            helper="Select all that apply."
            onChange={onChange}
            error={errors.schema_delivery_risk_signals}
          />
          <CheckboxGroup
            label="Q59. Which actions are most useful for improving delivery confidence for schema-related work?"
            name="schema_delivery_confidence_actions"
            values={formData.schema_delivery_confidence_actions}
            options={confidenceActionOptions}
            required
            helper="Select all that apply."
            onChange={onChange}
            error={errors.schema_delivery_confidence_actions}
          />
          <TextareaQuestion
            label="Q60. Optional: What is one practical lesson or recommendation you would give for delivering schema-related changes successfully?"
            name="schema_delivery_recommendation"
            value={formData.schema_delivery_recommendation}
            onChange={onChange}
            placeholder="You may mention estimation, testing, migration, rollback, coordination, documentation, release planning, or post-release monitoring."
          />
        </DeliveryGroup>
      </div>

      <div className="final-thank-you-card">
        <p>
          Thank you very much for your valuable time and thoughtful contribution
          to this research.
        </p>
      </div>

      {submissionError && <p className="form-error">{submissionError}</p>}

      <div className="button-row split">
        <button
          type="button"
          className="secondary-button"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </section>
  )
}

export default SoftwareDeliveryImpact
