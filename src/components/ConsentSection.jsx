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
