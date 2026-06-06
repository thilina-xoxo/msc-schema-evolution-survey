import { useMemo, useState } from 'react'
import ComparativeToolingPractices from './components/ComparativeToolingPractices'
import ConsentSection from './components/ConsentSection'
import ParticipantBackground from './components/ParticipantBackground'
import ScenarioMultiModel from './components/ScenarioMultiModel'
import ScenarioPolyglot from './components/ScenarioPolyglot'
import SectionThreeArchitecture from './components/SectionThreeArchitecture'
import SoftwareDeliveryImpact from './components/SoftwareDeliveryImpact'
import { submitSurvey } from './services/submitSurvey'
import { getParticipantId } from './utils/participantId'
import './App.css'

const initialFormData = {
  participant_id: '',
  technical_involvement: '',
  current_role: '',
  current_role_other: '',
  system_types: [],
  system_types_other: '',
  database_technologies: [],
  database_technologies_other: '',
  schema_evolution_familiarity: '',
  production_schema_change_experience: '',
  architecture_difference_clarity: '',
  polyglot_s1_effort_story_points: '',
  polyglot_s1_mental_effort: '',
  polyglot_s1_bug_data_risk: '',
  polyglot_s1_coordination_overhead: '',
  polyglot_s1_productivity_impact: '',
  polyglot_s1_architecture_benefits: [],
  polyglot_s1_architecture_challenges: [],
  multi_s1_effort: '',
  multi_s1_cognitive_load: '',
  multi_s1_bug_risk: '',
  multi_s1_coordination_overhead: '',
  multi_s1_productivity_impact: '',
  multi_s1_architecture_benefits: [],
  multi_s1_architecture_challenges: [],
  poly_s2_implementation_complexity: '',
  poly_s2_cognitive_load: '',
  poly_s2_bug_risk: '',
  poly_s2_coordination_overhead: '',
  poly_s2_backward_compatibility_difficulty: '',
  poly_s2_business_logic_validation_difficulty: '',
  poly_s2_operational_effort: '',
  poly_s2_productivity_impact: '',
  poly_s2_architecture_benefits: [],
  poly_s2_architecture_challenges: [],
  multi_s2_implementation_complexity: '',
  multi_s2_cognitive_load: '',
  multi_s2_bug_risk: '',
  multi_s2_coordination_overhead: '',
  multi_s2_backward_compatibility_difficulty: '',
  multi_s2_business_logic_validation_difficulty: '',
  multi_s2_operational_effort: '',
  multi_s2_productivity_impact: '',
  multi_s2_architecture_benefits: [],
  multi_s2_architecture_challenges: [],
  architecture_tradeoff_view: [],
  main_schema_evolution_difficulty_factors: [],
  productivity_improving_practices: [],
  useful_schema_tool_practices: [],
  ai_tool_usage_for_schema_work: '',
  ai_schema_usage_modes: [],
  schema_productivity_practice_comment: '',
  schema_delivery_effort_impact: '',
  schema_affected_delivery_activities: [],
  schema_delivery_risk_signals: [],
  schema_delivery_confidence_actions: [],
  schema_delivery_recommendation: '',
}

// TEMPORARY TESTING MODE: Set to false before real survey distribution.
const TEMP_SKIP_VALIDATION_FOR_TESTING = true
const TOTAL_STEPS = 7

function validateSectionOne(formData) {
  const errors = {}

  if (!formData.technical_involvement) {
    errors.technical_involvement =
      'Please indicate whether you have relevant technical experience.'
  } else if (formData.technical_involvement === 'No') {
    errors.technical_involvement =
      'This survey is intended for participants with software, architecture, DevOps, database, or related technical experience.'
  }

  return errors
}

function validateSectionTwo(formData) {
  const errors = {}

  if (!formData.current_role) {
    errors.current_role = 'Please select your current or most recent role.'
  }

  if (
    formData.current_role === 'Other' &&
    !formData.current_role_other.trim()
  ) {
    errors.current_role_other = 'Please specify your role.'
  }

  if (formData.system_types.length === 0) {
    errors.system_types = 'Please select at least one system type.'
  }

  if (
    formData.system_types.includes('Other') &&
    !formData.system_types_other.trim()
  ) {
    errors.system_types_other = 'Please specify the system type.'
  }

  if (formData.database_technologies.length === 0) {
    errors.database_technologies =
      'Please select at least one database technology.'
  }

  if (
    formData.database_technologies.includes('Other') &&
    !formData.database_technologies_other.trim()
  ) {
    errors.database_technologies_other =
      'Please specify the database technology.'
  }

  if (!formData.schema_evolution_familiarity) {
    errors.schema_evolution_familiarity =
      'Please rate your schema evolution or database migration familiarity.'
  }

  if (!formData.production_schema_change_experience) {
    errors.production_schema_change_experience =
      'Please select your production schema change experience.'
  }

  return errors
}

function validateSectionThree(formData) {
  const errors = {}

  if (!formData.architecture_difference_clarity) {
    errors.architecture_difference_clarity =
      'Please rate the clarity of the difference between Polyglot Persistence and Multi-Model Persistence.'
  }

  return errors
}

function validateScenarioPolyglot(formData) {
  const errors = {}

  const requiredNumericFields = [
    [
      'polyglot_s1_effort_story_points',
      'Please enter the estimated total implementation effort.',
    ],
    [
      'multi_s1_effort',
      'Please enter the estimated total implementation effort.',
    ],
  ]

  requiredNumericFields.forEach(([fieldName, message]) => {
    const value = formData[fieldName]
    const numericValue = Number(value)

    if (!value) {
      errors[fieldName] = message
    } else if (
      !Number.isFinite(numericValue) ||
      numericValue <= 0 ||
      numericValue > 500
    ) {
      errors[fieldName] =
        'Please enter a reasonable positive numeric story point value.'
    }
  })

  const requiredFields = [
    ['polyglot_s1_mental_effort', 'Please rate the mental effort required.'],
    ['polyglot_s1_bug_data_risk', 'Please rate the risk of bugs or data issues.'],
    ['polyglot_s1_coordination_overhead', 'Please rate the coordination overhead.'],
    ['polyglot_s1_productivity_impact', 'Please rate the productivity impact.'],
    ['multi_s1_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s1_bug_risk', 'Please rate the risk of bugs or data issues.'],
    ['multi_s1_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s1_productivity_impact', 'Please rate the productivity impact.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  validateLimitedCheckbox(
    errors,
    formData,
    'polyglot_s1_architecture_benefits',
    'No clear benefit from Polyglot Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'polyglot_s1_architecture_challenges',
    'No clear disadvantage from Polyglot Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multi_s1_architecture_benefits',
    'No clear benefit from Multi-Model Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multi_s1_architecture_challenges',
    'No clear disadvantage from Multi-Model Persistence in this scenario.',
    3,
  )

  return errors
}

function validateLimitedCheckbox(
  errors,
  formData,
  fieldName,
  exclusiveOption,
  maxSelections = 2,
) {
  const values = formData[fieldName]

  if (!Array.isArray(values) || values.length === 0) {
    errors[fieldName] = 'Please select at least one option.'
  } else if (values.length > maxSelections) {
    errors[fieldName] = `Please select up to ${maxSelections} options.`
  } else if (values.includes(exclusiveOption) && values.length > 1) {
    errors[fieldName] =
      'Please select this option by itself, or choose other options instead.'
  }
}

function validateScenarioMultiModel(formData) {
  const errors = {}

  const requiredFields = [
    ['poly_s2_implementation_complexity', 'Please rate the implementation complexity.'],
    ['poly_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s2_bug_risk', 'Please rate the risk of bugs or data inconsistency.'],
    ['poly_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['poly_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['poly_s2_business_logic_validation_difficulty', 'Please rate the business logic validation difficulty.'],
    ['poly_s2_operational_effort', 'Please rate the operational effort.'],
    ['poly_s2_productivity_impact', 'Please rate the productivity impact.'],
    ['multi_s2_implementation_complexity', 'Please rate the implementation complexity.'],
    ['multi_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s2_bug_risk', 'Please rate the risk of bugs or data inconsistency.'],
    ['multi_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['multi_s2_business_logic_validation_difficulty', 'Please rate the business logic validation difficulty.'],
    ['multi_s2_operational_effort', 'Please rate the operational effort.'],
    ['multi_s2_productivity_impact', 'Please rate the productivity impact.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  validateLimitedCheckbox(
    errors,
    formData,
    'poly_s2_architecture_benefits',
    'No clear benefit from Polyglot Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'poly_s2_architecture_challenges',
    'No clear disadvantage from Polyglot Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multi_s2_architecture_benefits',
    'No clear benefit from Multi-Model Persistence in this scenario.',
    3,
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multi_s2_architecture_challenges',
    'No clear disadvantage from Multi-Model Persistence in this scenario.',
    3,
  )

  return errors
}

function validateComparativeToolingPractices(formData) {
  const errors = {}

  validateMaxFiveCheckbox(errors, formData, 'architecture_tradeoff_view')
  validateMaxFiveCheckbox(
    errors,
    formData,
    'main_schema_evolution_difficulty_factors',
  )
  validateMaxFiveCheckbox(errors, formData, 'productivity_improving_practices')
  validateMaxFiveCheckbox(errors, formData, 'useful_schema_tool_practices')
  validateMaxFiveCheckbox(errors, formData, 'ai_schema_usage_modes')

  if (!formData.ai_tool_usage_for_schema_work) {
    errors.ai_tool_usage_for_schema_work =
      'Please select your AI tool usage for schema work.'
  }

  return errors
}

function validateMaxFiveCheckbox(errors, formData, fieldName) {
  const values = formData[fieldName]

  if (!Array.isArray(values) || values.length === 0) {
    errors[fieldName] = 'Please select at least one option.'
  } else if (values.length > 5) {
    errors[fieldName] = 'Please select up to 5 options.'
  }
}

function validateSoftwareDeliveryImpact(formData) {
  const errors = {}

  if (!formData.schema_delivery_effort_impact) {
    errors.schema_delivery_effort_impact =
      'Please rate the delivery effort impact.'
  }

  validateRequiredCheckbox(
    errors,
    formData,
    'schema_affected_delivery_activities',
  )

  validateRequiredCheckbox(errors, formData, 'schema_delivery_risk_signals')
  validateRequiredCheckbox(
    errors,
    formData,
    'schema_delivery_confidence_actions',
  )

  return errors
}

function validateRequiredCheckbox(errors, formData, fieldName) {
  const values = formData[fieldName]

  if (!Array.isArray(values) || values.length === 0) {
    errors[fieldName] = 'Please select at least one option.'
  }
}

function App() {
  const participantId = useMemo(() => getParticipantId(), [])
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ...initialFormData,
    participant_id: participantId,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const normalizedFormData = {
    ...initialFormData,
    ...formData,
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function scrollToValidationError() {
    window.requestAnimationFrame(() => {
      const firstError = document.querySelector(
        '.has-error, .form-error, .error-message',
      )

      if (firstError) {
        firstError.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      } else {
        scrollToTop()
      }
    })
  }

  function goToStep(nextStep) {
    setStep(nextStep)
    window.requestAnimationFrame(scrollToTop)
  }

  function handleChange(name, value) {
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
  }

  function handleSectionOneNext() {
    const nextErrors = validateSectionOne(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(2)
    } else {
      scrollToValidationError()
    }
  }

  function handleSectionTwoNext() {
    const nextErrors = validateSectionTwo(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(3)
    } else {
      scrollToValidationError()
    }
  }

  function handleSectionThreeNext() {
    const nextErrors = validateSectionThree(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(4)
    } else {
      scrollToValidationError()
    }
  }

  function handleScenarioPolyglotNext() {
    const nextErrors = validateScenarioPolyglot(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(5)
    } else {
      scrollToValidationError()
    }
  }

  function handleScenarioMultiModelNext() {
    const nextErrors = validateScenarioMultiModel(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(6)
    } else {
      scrollToValidationError()
    }
  }

  function handleComparativeToolingPracticesNext() {
    const nextErrors = validateComparativeToolingPractices(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      goToStep(7)
    } else {
      scrollToValidationError()
    }
  }

  async function handleSubmit() {
    const sectionOneErrors = validateSectionOne(normalizedFormData)
    const sectionTwoErrors = validateSectionTwo(normalizedFormData)
    const sectionThreeErrors = validateSectionThree(normalizedFormData)
    const scenarioPolyglotErrors = validateScenarioPolyglot(normalizedFormData)
    const scenarioMultiModelErrors = validateScenarioMultiModel(normalizedFormData)
    const comparativeToolingPracticesErrors =
      validateComparativeToolingPractices(normalizedFormData)
    const softwareDeliveryImpactErrors =
      validateSoftwareDeliveryImpact(normalizedFormData)
    const nextErrors = {
      ...sectionOneErrors,
      ...sectionTwoErrors,
      ...sectionThreeErrors,
      ...scenarioPolyglotErrors,
      ...scenarioMultiModelErrors,
      ...comparativeToolingPracticesErrors,
      ...softwareDeliveryImpactErrors,
    }

    setErrors(nextErrors)
    setSubmissionError('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionError(
        'Please complete all required eligibility, background, architecture context, scenario, comparative tooling practices, and software delivery impact questions before submitting.',
      )
      scrollToValidationError()
      return
    }

    try {
      setIsSubmitting(true)
      await submitSurvey(normalizedFormData)
      setSubmitted(true)
    } catch {
      setSubmissionError(
        'Submission failed. Please check your connection and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderCurrentStep() {
    if (submitted) {
      return (
        <section className="success-panel">
          <h2>Submission Complete</h2>
          <p>
            Your response has been submitted successfully. Thank you for
            participating.
          </p>
        </section>
      )
    }

    if (step === 1) {
      return (
        <ConsentSection
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onNext={handleSectionOneNext}
        />
      )
    }

    if (step === 2) {
      return (
        <ParticipantBackground
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(1)}
          onNext={handleSectionTwoNext}
        />
      )
    }

    if (step === 3) {
      return (
        <SectionThreeArchitecture
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(2)}
          onNext={handleSectionThreeNext}
        />
      )
    }

    if (step === 4) {
      return (
        <ScenarioPolyglot
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(3)}
          onNext={handleScenarioPolyglotNext}
        />
      )
    }

    if (step === 5) {
      return (
        <ScenarioMultiModel
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(4)}
          onNext={handleScenarioMultiModelNext}
        />
      )
    }

    if (step === 6) {
      return (
        <ComparativeToolingPractices
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(5)}
          onNext={handleComparativeToolingPracticesNext}
        />
      )
    }

    if (step === 7) {
      return (
        <SoftwareDeliveryImpact
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => goToStep(6)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submissionError={submissionError}
        />
      )
    }

    return null
  }

  return (
    <main className="survey-shell">
      <div className="survey-card">
        {!submitted && (
          <header className="survey-header">
            <p className="eyebrow">MSc Research Survey</p>
            <h1>Schema Evolution in Microservice Persistence</h1>
            <div className="progress-wrap" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
              <div className="progress-text">Step {step} of {TOTAL_STEPS}</div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
            {TEMP_SKIP_VALIDATION_FOR_TESTING && (
              <p className="testing-mode-badge">
                Testing mode: validation is temporarily skipped for navigation.
              </p>
            )}
          </header>
        )}

        {renderCurrentStep()}
      </div>
    </main>
  )
}

export default App
