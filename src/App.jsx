import { useMemo, useState } from 'react'
import ComparativeEvaluation from './components/ComparativeEvaluation'
import ConsentSection from './components/ConsentSection'
import FinalReflection from './components/FinalReflection'
import ManagerialDeliveryImpact from './components/ManagerialDeliveryImpact'
import ParticipantBackground from './components/ParticipantBackground'
import ScenarioMultiModel from './components/ScenarioMultiModel'
import ScenarioPolyglot from './components/ScenarioPolyglot'
import SectionThreeArchitecture from './components/SectionThreeArchitecture'
import ToolingPractices from './components/ToolingPractices'
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
  polyglot_s1_optional_comment: '',
  polyglot_s2_effort_story_points: '',
  polyglot_s2_mental_effort: '',
  polyglot_s2_bug_data_risk: '',
  polyglot_s2_coordination_overhead: '',
  polyglot_s2_backward_compatibility_difficulty: '',
  polyglot_s2_productivity_impact: '',
  polyglot_s2_architecture_benefits: [],
  polyglot_s2_architecture_challenges: [],
  polyglot_s2_optional_comment: '',
  multimodel_s1_effort_story_points: '',
  multimodel_s1_mental_effort: '',
  multimodel_s1_bug_data_risk: '',
  multimodel_s1_coordination_overhead: '',
  multimodel_s1_productivity_impact: '',
  multimodel_s1_architecture_benefits: [],
  multimodel_s1_architecture_challenges: [],
  multimodel_s1_optional_comment: '',
  multimodel_s2_effort_story_points: '',
  multimodel_s2_mental_effort: '',
  multimodel_s2_bug_data_risk: '',
  multimodel_s2_coordination_overhead: '',
  multimodel_s2_backward_compatibility_difficulty: '',
  multimodel_s2_productivity_impact: '',
  multimodel_s2_architecture_benefits: [],
  multimodel_s2_architecture_challenges: [],
  multimodel_s2_optional_comment: '',
  overall_easier_architecture: '',
  overall_less_effort_architecture: '',
  overall_lower_cognitive_load_architecture: '',
  overall_lower_risk_architecture: '',
  overall_less_coordination_architecture: '',
  most_difficult_schema_change_type: '',
  most_difficult_schema_change_type_other: '',
  main_productivity_factor: '',
  main_productivity_factor_other: '',
  architecture_preference_reason: '',
  used_schema_tools_practices: [],
  used_schema_tools_practices_other: '',
  most_effective_migration_tooling: '',
  most_effective_migration_tooling_other: '',
  ai_tool_usage_frequency: '',
  ai_tool_supported_tasks: [],
  ai_tool_supported_tasks_other: '',
  ai_tool_trust_level: '',
  schema_change_checklist_usage: '',
  organization_improvement_priority: '',
  organization_improvement_priority_other: '',
  tooling_gap_observation: '',
  schema_change_underestimation_frequency: '',
  missed_planning_factors: [],
  missed_planning_factors_other: '',
  release_timeline_impact: '',
  delivery_confidence_impact: '',
  schema_change_estimation_owner: '',
  delivery_risk_warning_signs: [],
  delivery_risk_warning_signs_other: '',
  recommended_estimation_buffer: '',
  most_useful_managerial_metric: '',
  most_useful_managerial_metric_other: '',
  planning_resource_advice: '',
  biggest_hidden_cost: '',
  one_process_improvement: '',
  additional_comments: '',
}

// TEMPORARY TESTING MODE: Set to false before real survey distribution.
const TEMP_SKIP_VALIDATION_FOR_TESTING = true
const TOTAL_STEPS = 9

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
      'polyglot_s2_effort_story_points',
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
    ['polyglot_s2_mental_effort', 'Please rate the mental effort required.'],
    ['polyglot_s2_bug_data_risk', 'Please rate the risk of bugs or data inconsistency.'],
    ['polyglot_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['polyglot_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['polyglot_s2_productivity_impact', 'Please rate the productivity impact.'],
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
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'polyglot_s1_architecture_challenges',
    'No clear disadvantage from Polyglot Persistence in this scenario.',
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'polyglot_s2_architecture_benefits',
    'No clear benefit from Polyglot Persistence in this scenario.',
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'polyglot_s2_architecture_challenges',
    'No clear disadvantage from Polyglot Persistence in this scenario.',
  )

  return errors
}

function validateLimitedCheckbox(errors, formData, fieldName, exclusiveOption) {
  const values = formData[fieldName]

  if (!Array.isArray(values) || values.length === 0) {
    errors[fieldName] = 'Please select at least one option.'
  } else if (values.length > 2) {
    errors[fieldName] = 'Please select up to two options.'
  } else if (values.includes(exclusiveOption) && values.length > 1) {
    errors[fieldName] =
      'Please select this option by itself, or choose other options instead.'
  }
}

function validateScenarioMultiModel(formData) {
  const errors = {}

  const requiredNumericFields = [
    [
      'multimodel_s1_effort_story_points',
      'Please enter the estimated total implementation effort.',
    ],
    [
      'multimodel_s2_effort_story_points',
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
    ['multimodel_s1_mental_effort', 'Please rate the mental effort required.'],
    ['multimodel_s1_bug_data_risk', 'Please rate the risk of bugs or data issues.'],
    ['multimodel_s1_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multimodel_s1_productivity_impact', 'Please rate the productivity impact.'],
    ['multimodel_s2_mental_effort', 'Please rate the mental effort required.'],
    ['multimodel_s2_bug_data_risk', 'Please rate the risk of bugs or data inconsistency.'],
    ['multimodel_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multimodel_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['multimodel_s2_productivity_impact', 'Please rate the productivity impact.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  validateLimitedCheckbox(
    errors,
    formData,
    'multimodel_s1_architecture_benefits',
    'No clear benefit from Multi-Model Persistence in this scenario.',
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multimodel_s1_architecture_challenges',
    'No clear disadvantage from Multi-Model Persistence in this scenario.',
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multimodel_s2_architecture_benefits',
    'No clear benefit from Multi-Model Persistence in this scenario.',
  )
  validateLimitedCheckbox(
    errors,
    formData,
    'multimodel_s2_architecture_challenges',
    'No clear disadvantage from Multi-Model Persistence in this scenario.',
  )

  return errors
}

function validateComparativeEvaluation(formData) {
  const errors = {}
  const requiredFields = [
    ['overall_easier_architecture', 'Please select which architecture seems easier overall.'],
    ['overall_less_effort_architecture', 'Please select which architecture seems to require less effort.'],
    ['overall_lower_cognitive_load_architecture', 'Please select which architecture seems to create lower cognitive load.'],
    ['overall_lower_risk_architecture', 'Please select which architecture seems to have lower risk.'],
    ['overall_less_coordination_architecture', 'Please select which architecture seems to require less coordination.'],
    ['most_difficult_schema_change_type', 'Please select the most difficult schema evolution change type.'],
    ['main_productivity_factor', 'Please select the main productivity factor.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  if (
    formData.most_difficult_schema_change_type === 'Other' &&
    !formData.most_difficult_schema_change_type_other.trim()
  ) {
    errors.most_difficult_schema_change_type_other =
      'Please specify the most difficult schema evolution change type.'
  }

  if (
    formData.main_productivity_factor === 'Other' &&
    !formData.main_productivity_factor_other.trim()
  ) {
    errors.main_productivity_factor_other =
      'Please specify the productivity factor.'
  }

  return errors
}

function validateToolingPractices(formData) {
  const errors = {}
  const requiredFields = [
    ['most_effective_migration_tooling', 'Please select the most effective tooling type.'],
    ['ai_tool_usage_frequency', 'Please select your AI tool usage frequency.'],
    ['ai_tool_trust_level', 'Please select your trust level for AI-generated output.'],
    ['schema_change_checklist_usage', 'Please select whether your team uses a schema change checklist or review process.'],
    ['organization_improvement_priority', 'Please select what organizations should improve first.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  if (formData.used_schema_tools_practices.length === 0) {
    errors.used_schema_tools_practices =
      'Please select at least one tool or practice.'
  }

  if (
    formData.used_schema_tools_practices.includes('Other') &&
    !formData.used_schema_tools_practices_other.trim()
  ) {
    errors.used_schema_tools_practices_other =
      'Please specify the tool or practice.'
  }

  if (
    formData.most_effective_migration_tooling === 'Other' &&
    !formData.most_effective_migration_tooling_other.trim()
  ) {
    errors.most_effective_migration_tooling_other =
      'Please specify the effective tooling type.'
  }

  if (formData.ai_tool_supported_tasks.length === 0) {
    errors.ai_tool_supported_tasks =
      'Please select at least one AI-supported task option.'
  }

  if (
    formData.ai_tool_supported_tasks.includes('Other') &&
    !formData.ai_tool_supported_tasks_other.trim()
  ) {
    errors.ai_tool_supported_tasks_other =
      'Please specify the AI-supported task.'
  }

  if (
    formData.organization_improvement_priority === 'Other' &&
    !formData.organization_improvement_priority_other.trim()
  ) {
    errors.organization_improvement_priority_other =
      'Please specify the organizational improvement priority.'
  }

  return errors
}

function validateManagerialDeliveryImpact(formData) {
  const errors = {}
  const requiredFields = [
    ['schema_change_underestimation_frequency', 'Please select how often schema changes are underestimated.'],
    ['release_timeline_impact', 'Please rate the impact on release timelines.'],
    ['delivery_confidence_impact', 'Please rate the impact on delivery confidence.'],
    ['schema_change_estimation_owner', 'Please select who should mainly estimate schema evolution effort.'],
    ['recommended_estimation_buffer', 'Please select the recommended estimation buffer.'],
    ['most_useful_managerial_metric', 'Please select the most useful managerial metric.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  if (formData.missed_planning_factors.length === 0) {
    errors.missed_planning_factors =
      'Please select at least one missed planning factor.'
  }

  if (
    formData.missed_planning_factors.includes('Other') &&
    !formData.missed_planning_factors_other.trim()
  ) {
    errors.missed_planning_factors_other =
      'Please specify the missed planning factor.'
  }

  if (formData.delivery_risk_warning_signs.length === 0) {
    errors.delivery_risk_warning_signs =
      'Please select at least one delivery risk warning sign.'
  }

  if (
    formData.delivery_risk_warning_signs.includes('Other') &&
    !formData.delivery_risk_warning_signs_other.trim()
  ) {
    errors.delivery_risk_warning_signs_other =
      'Please specify the delivery risk warning sign.'
  }

  if (
    formData.most_useful_managerial_metric === 'Other' &&
    !formData.most_useful_managerial_metric_other.trim()
  ) {
    errors.most_useful_managerial_metric_other =
      'Please specify the managerial metric.'
  }

  return errors
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
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
      setStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
      setStep(5)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
      setStep(6)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleComparativeEvaluationNext() {
    const nextErrors = validateComparativeEvaluation(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      setStep(7)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleToolingPracticesNext() {
    const nextErrors = validateToolingPractices(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      setStep(8)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleManagerialDeliveryImpactNext() {
    const nextErrors = validateManagerialDeliveryImpact(normalizedFormData)
    setErrors(nextErrors)

    if (
      TEMP_SKIP_VALIDATION_FOR_TESTING ||
      Object.keys(nextErrors).length === 0
    ) {
      setErrors({})
      setStep(9)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleSubmit() {
    const sectionOneErrors = validateSectionOne(normalizedFormData)
    const sectionTwoErrors = validateSectionTwo(normalizedFormData)
    const sectionThreeErrors = validateSectionThree(normalizedFormData)
    const scenarioPolyglotErrors = validateScenarioPolyglot(normalizedFormData)
    const scenarioMultiModelErrors = validateScenarioMultiModel(normalizedFormData)
    const comparativeEvaluationErrors =
      validateComparativeEvaluation(normalizedFormData)
    const toolingPracticesErrors = validateToolingPractices(normalizedFormData)
    const managerialDeliveryImpactErrors =
      validateManagerialDeliveryImpact(normalizedFormData)
    const nextErrors = {
      ...sectionOneErrors,
      ...sectionTwoErrors,
      ...sectionThreeErrors,
      ...scenarioPolyglotErrors,
      ...scenarioMultiModelErrors,
      ...comparativeEvaluationErrors,
      ...toolingPracticesErrors,
      ...managerialDeliveryImpactErrors,
    }

    setErrors(nextErrors)
    setSubmissionError('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionError(
        'Please complete all required eligibility, background, architecture context, scenario, comparative evaluation, tooling practices, and managerial delivery impact questions before submitting.',
      )
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
          onBack={() => setStep(1)}
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
          onBack={() => setStep(2)}
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
          onBack={() => setStep(3)}
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
          onBack={() => setStep(4)}
          onNext={handleScenarioMultiModelNext}
        />
      )
    }

    if (step === 6) {
      return (
        <ComparativeEvaluation
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(5)}
          onNext={handleComparativeEvaluationNext}
        />
      )
    }

    if (step === 7) {
      return (
        <ToolingPractices
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(6)}
          onNext={handleToolingPracticesNext}
        />
      )
    }

    if (step === 8) {
      return (
        <ManagerialDeliveryImpact
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(7)}
          onNext={handleManagerialDeliveryImpactNext}
        />
      )
    }

    return (
      <FinalReflection
        formData={normalizedFormData}
        onChange={handleChange}
        onBack={() => setStep(8)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submissionError={submissionError}
      />
    )
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
