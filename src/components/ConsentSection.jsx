import RadioGroup from './RadioGroup'

const technicalInvolvementOptions = ['Yes', 'No']

function ConsentSection({ formData, errors, onChange, onNext }) {
  return (
    <section>
      <div className="survey-introduction">
        <p>
          Thank you for taking the time to participate in this survey, which is
          being conducted as part of my MSc research in Computer Science.
        </p>
        <h3>Research Overview</h3>
        <p>
          This study explores <strong>schema evolution within microservice
          architectures</strong>, specifically focusing on the comparative
          impact of <strong>Polyglot Persistence</strong> and{' '}
          <strong>Multi-Model Persistence</strong>. It aims to evaluate
          real-world practitioner experiences against existing academic
          literature by examining:
        </p>
        <ul>
          <li>Engineering effort and cognitive load</li>
          <li>Architectural risk and cross-team coordination</li>
          <li>Tooling practices and delivery planning</li>
          <li>Overall developer productivity</li>
        </ul>
        <h3>Privacy &amp; Confidentiality</h3>
        <ul>
          <li>
            <strong>Voluntary Participation:</strong> Your involvement is
            entirely voluntary, and you are free to withdraw at any time.
          </li>
          <li>
            <strong>Anonymity:</strong> This survey does not collect any
            Personally Identifiable Information (PII). Please <strong>do not</strong>{' '}
            enter your name, email, phone number, company/organization name, or
            any other direct identifiers in your responses.
          </li>
        </ul>
        <p>
          <strong>Consent:</strong> By continuing, you confirm that you
          understand the purpose of this research project and agree to
          participate voluntarily.
        </p>
      </div>

      <hr className="section-divider" />

      <h2>Section 1: Eligibility</h2>
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
