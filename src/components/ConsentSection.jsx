import RadioGroup from './RadioGroup'

const technicalInvolvementOptions = ['Yes', 'No']

function ConsentSection({ formData, errors, onChange, onNext }) {
  return (
    <section>
      <div className="survey-introduction">
        <p>Thank you for considering participation in this MSc research survey.</p>
        <p>
          This survey is conducted as part of my MSc research in Computer
          Science, specializing in Software Architecture, at the University of
          Moratuwa.
        </p>
        <p>
          The research aims to understand how schema changes affect engineering
          effort, cognitive load, risk, coordination, tooling practices,
          delivery planning, and how practitioner views compare with existing
          academic literature.
        </p>
        <p>
          Your participation is voluntary. This survey does not collect
          personally identifiable information. Please do not enter your name,
          email, phone number, company name, organization name, or any other
          direct identifier.
        </p>
        <p>
          By continuing, you confirm that you understand the purpose of the
          survey and agree to participate voluntarily.
        </p>
      </div>

      <hr className="section-divider" />

      <h2>Section 1 — Eligibility</h2>
      <p className="section-intro">
        Please confirm your technical background before continuing to the
        participant background questions.
      </p>

      <RadioGroup
        label="Q1. Are you currently or previously involved in software development, software architecture, DevOps, database engineering, or related technical work?"
        name="technical_involvement"
        value={formData.technical_involvement}
        options={technicalInvolvementOptions}
        required
        onChange={onChange}
        error={errors.technical_involvement}
      />

      <div className="button-row end">
        <button type="button" className="primary-button" onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  )
}

export default ConsentSection
