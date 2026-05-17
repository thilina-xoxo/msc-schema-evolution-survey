function TextareaQuestion({ label, name, value, onChange, placeholder }) {
  return (
    <div className="question">
      <label className="question-label" htmlFor={name}>
        {label}
        <span className="optional-label"> Optional</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows="6"
      />
    </div>
  )
}

function FinalReflection({
  formData,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  submissionError,
}) {
  return (
    <section>
      <h2>Section 9 — Final Reflection</h2>
      <p className="section-intro">
        This final section allows you to share broader reflections about schema
        evolution, persistence strategy, developer productivity, and delivery
        planning in microservice-based systems. This helps capture practical
        insights, hidden costs, and improvement opportunities that may not have
        been covered by the structured questions.
      </p>

      <div className="privacy-note">
        <h3>Privacy Note</h3>
        <p>
          No personally identifiable information should be entered in this
          section. Please do not include names, email addresses, organization
          names, phone numbers, or any other direct identifiers in your answers.
        </p>
      </div>

      <div className="reflection-section">
        <TextareaQuestion
          label="Q107. Optional: What is the biggest hidden cost of schema evolution in microservice systems?"
          name="biggest_hidden_cost"
          value={formData.biggest_hidden_cost}
          onChange={onChange}
          placeholder="Examples: coordination effort, testing effort, migration risk, production monitoring, documentation gaps, hidden analytics/reporting impact, or rollback complexity."
        />
        <TextareaQuestion
          label="Q108. Optional: If you could improve one thing in schema evolution practices, what would it be?"
          name="one_process_improvement"
          value={formData.one_process_improvement}
          onChange={onChange}
          placeholder="Examples: better migration automation, clearer ownership, stronger API/event versioning, better documentation, more automated tests, schema review process, or improved release planning."
        />
        <TextareaQuestion
          label="Q109. Optional: Do you have any additional comments related to schema evolution, persistence strategy, developer productivity, or delivery planning?"
          name="additional_comments"
          value={formData.additional_comments}
          onChange={onChange}
        />
      </div>

      <div className="final-thank-you-card">
        <h3>Final Note</h3>
        <p>Thank you for your valuable time and contribution to this research.</p>
        <p>
          Your responses will help identify practical challenges, useful
          practices, and planning considerations related to schema evolution in
          Polyglot and Multi-Model microservice architectures.
        </p>
        <p>Please click Submit to complete the survey.</p>
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

export default FinalReflection
