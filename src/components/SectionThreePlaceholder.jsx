function SectionThreePlaceholder({
  onBack,
  onSubmit,
  isSubmitting,
  submissionError,
}) {
  return (
    <section>
      <h2>Section 3 — Baseline Understanding of Architecture</h2>
      <div className="placeholder-panel">
        <p>
          This section will introduce the reference microservice architecture
          and the difference between Polyglot Persistence and Multi-Model
          Persistence. This section is not finalized yet and will be added in
          the next development phase.
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
          {isSubmitting ? 'Submitting...' : 'Submit Current Response'}
        </button>
      </div>
    </section>
  )
}

export default SectionThreePlaceholder
