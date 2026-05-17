import RadioGroup from './RadioGroup'

const consentOptions = [
  'Yes, I agree to participate',
  'No, I do not agree',
]

const technicalInvolvementOptions = ['Yes', 'No']

const microserviceExperienceOptions = [
  'Yes, professionally',
  'Yes, academically',
  'Yes, both professionally and academically',
  'I have basic awareness only',
  'No experience',
]

function ConsentSection({ formData, errors, onChange, onNext }) {
  return (
    <section>
      <div className="survey-introduction">
        <h2>Survey Introduction</h2>
        <p>Thank you for considering participation in this MSc research survey.</p>
        <p>
          This survey is conducted as part of an MSc in Computer Science,
          specialized in Software Architecture, in the Department of Computer
          Science and Engineering, Faculty of Engineering, University of
          Moratuwa.
        </p>
        <p>
          The study explores how schema evolution affects developer productivity,
          engineering effort, cognitive load, coordination, tooling practices,
          and delivery planning in microservice-based systems. The survey
          focuses on two persistence strategies: Polyglot Persistence and
          Multi-Model Persistence.
        </p>
        <p>The research aims to understand:</p>
        <ul className="reading-list">
          <li>
            how schema changes in Polyglot and Multi-Model microservice
            architectures affect engineering effort and cognitive load
          </li>
          <li>
            how practitioners with different experience levels perceive schema
            evolution complexity
          </li>
          <li>
            which tools, practices, and productivity techniques help reduce
            schema evolution effort and risk
          </li>
          <li>
            how schema evolution affects planning, estimation, resource
            allocation, and delivery decisions
          </li>
        </ul>
        <p>
          Your participation is completely voluntary. You may stop at any time
          before final submission by closing the survey or leaving the page. In
          that case, your response will not be treated as a completed
          submission.
        </p>
        <p>
          This survey does not collect personally identifiable information.
          Please do not enter your name, email address, phone number, company
          name, organization name, LinkedIn profile, or any other direct
          identifier in any free-text response.
        </p>
        <p>
          By continuing, you confirm that you understand the purpose of the
          survey and agree to participate voluntarily.
        </p>
      </div>

      <hr className="section-divider" />

      <h2>Section 1 — Consent and Eligibility</h2>
      <p className="section-intro">
        Please confirm your consent and eligibility before continuing to the
        participant background questions.
      </p>

      <RadioGroup
        label="Q1. Do you agree to participate in this research survey?"
        name="consent"
        value={formData.consent}
        options={consentOptions}
        required
        onChange={onChange}
        error={errors.consent}
      />

      <RadioGroup
        label="Q2. Are you currently or previously involved in software development, software architecture, DevOps, database engineering, or related technical work?"
        name="technical_involvement"
        value={formData.technical_involvement}
        options={technicalInvolvementOptions}
        required
        onChange={onChange}
        error={errors.technical_involvement}
      />

      <RadioGroup
        label="Q3. Have you worked with or studied microservice architecture?"
        name="microservice_experience"
        value={formData.microservice_experience}
        options={microserviceExperienceOptions}
        required
        onChange={onChange}
        error={errors.microservice_experience}
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
