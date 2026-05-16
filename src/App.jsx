import { useMemo, useState } from 'react'
import ComparativeEvaluation from './components/ComparativeEvaluation'
import ConsentSection from './components/ConsentSection'
import ParticipantBackground from './components/ParticipantBackground'
import ScenarioMultiModel from './components/ScenarioMultiModel'
import ScenarioPolyglot from './components/ScenarioPolyglot'
import SchemaEvolutionExperience from './components/SchemaEvolutionExperience'
import SectionThreeArchitecture from './components/SectionThreeArchitecture'
import { submitSurvey } from './services/submitSurvey'
import { getParticipantId } from './utils/participantId'
import './App.css'

const initialFormData = {
  participant_id: '',
  consent: '',
  technical_involvement: '',
  microservice_experience: '',
  current_role: '',
  current_role_other: '',
  total_experience: '',
  microservice_years: '',
  system_types: [],
  system_types_other: '',
  database_technologies: [],
  database_technologies_other: '',
  main_persistence_strategy: '',
  polyglot_familiarity: '',
  multimodel_familiarity: '',
  schema_evolution_familiarity: '',
  production_schema_change_experience: '',
  architecture_context_clarity: '',
  architecture_difference_clarity: '',
  analytics_layer_clarity: '',
  architecture_understanding: '',
  perceived_operational_complexity: '',
  perceived_schema_reasoning_ease: '',
  perceived_downstream_impacts: [],
  perceived_downstream_impacts_other: '',
  biggest_architecture_challenge: '',
  schema_change_frequency: '',
  experienced_schema_change_types: [],
  experienced_schema_change_types_other: '',
  schema_change_impact_layers: [],
  schema_change_impact_layers_other: '',
  schema_evolution_difficulty_factors: [],
  schema_evolution_difficulty_factors_other: '',
  schema_change_productivity_impact: '',
  schema_change_cognitive_load: '',
  schema_change_coordination_overhead: '',
  schema_change_relative_risk: '',
  schema_change_delay_reason: '',
  schema_change_delay_reason_other: '',
  easier_persistence_strategy_general: '',
  easier_persistence_strategy_reason: '',
  most_helpful_schema_practice: '',
  most_helpful_schema_practice_other: '',
  schema_evolution_experience_example: '',
  poly_s1_effort: '',
  poly_s1_components_affected: '',
  poly_s1_cognitive_load: '',
  poly_s1_bug_risk: '',
  poly_s1_coordination_overhead: '',
  poly_s1_affected_areas: [],
  poly_s1_affected_areas_other: '',
  poly_s1_main_challenge: '',
  poly_s2_effort: '',
  poly_s2_components_affected: '',
  poly_s2_cognitive_load: '',
  poly_s2_bug_risk: '',
  poly_s2_coordination_overhead: '',
  poly_s2_backward_compatibility_difficulty: '',
  poly_s2_affected_areas: [],
  poly_s2_affected_areas_other: '',
  poly_s2_main_challenge: '',
  poly_s2_compatibility_strategy: '',
  poly_s3_effort: '',
  poly_s3_components_affected: '',
  poly_s3_cognitive_load: '',
  poly_s3_data_risk: '',
  poly_s3_coordination_overhead: '',
  poly_s3_migration_difficulty: '',
  poly_s3_testing_difficulty: '',
  poly_s3_affected_areas: [],
  poly_s3_affected_areas_other: '',
  poly_s3_implementation_approach: '',
  poly_s3_biggest_risk: '',
  poly_s4_effort: '',
  poly_s4_components_affected: '',
  poly_s4_cognitive_load: '',
  poly_s4_consistency_risk: '',
  poly_s4_coordination_overhead: '',
  poly_s4_rule_enforcement_difficulty: '',
  poly_s4_failure_handling_difficulty: '',
  poly_s4_preferred_implementation_approach: '',
  poly_s4_preferred_implementation_approach_other: '',
  poly_s4_affected_areas: [],
  poly_s4_affected_areas_other: '',
  poly_s4_productivity_challenge: '',
  poly_s4_complexity_reduction_practices: '',
  multi_s1_effort: '',
  multi_s1_components_affected: '',
  multi_s1_cognitive_load: '',
  multi_s1_bug_risk: '',
  multi_s1_coordination_overhead: '',
  multi_s1_affected_areas: [],
  multi_s1_affected_areas_other: '',
  multi_s1_main_challenge: '',
  multi_s2_effort: '',
  multi_s2_components_affected: '',
  multi_s2_cognitive_load: '',
  multi_s2_bug_risk: '',
  multi_s2_coordination_overhead: '',
  multi_s2_backward_compatibility_difficulty: '',
  multi_s2_affected_areas: [],
  multi_s2_affected_areas_other: '',
  multi_s2_main_challenge: '',
  multi_s2_compatibility_strategy: '',
  multi_s3_effort: '',
  multi_s3_components_affected: '',
  multi_s3_cognitive_load: '',
  multi_s3_data_risk: '',
  multi_s3_coordination_overhead: '',
  multi_s3_migration_difficulty: '',
  multi_s3_testing_difficulty: '',
  multi_s3_affected_areas: [],
  multi_s3_affected_areas_other: '',
  multi_s3_implementation_approach: '',
  multi_s3_biggest_risk: '',
  multi_s4_effort: '',
  multi_s4_components_affected: '',
  multi_s4_cognitive_load: '',
  multi_s4_consistency_risk: '',
  multi_s4_coordination_overhead: '',
  multi_s4_rule_enforcement_difficulty: '',
  multi_s4_failure_handling_difficulty: '',
  multi_s4_preferred_implementation_approach: '',
  multi_s4_preferred_implementation_approach_other: '',
  multi_s4_affected_areas: [],
  multi_s4_affected_areas_other: '',
  multi_s4_productivity_challenge: '',
  multi_s4_complexity_reduction_practices: '',
  overall_easier_architecture: '',
  overall_less_effort_architecture: '',
  overall_lower_cognitive_load_architecture: '',
  overall_lower_risk_architecture: '',
  overall_less_coordination_architecture: '',
  overall_easier_migration_architecture: '',
  overall_easier_testing_architecture: '',
  best_architecture_low_complexity: '',
  best_architecture_breaking_change: '',
  best_architecture_structural_change: '',
  best_architecture_cross_service_rule: '',
  most_difficult_schema_change_type: '',
  most_difficult_schema_change_type_other: '',
  main_productivity_factor: '',
  main_productivity_factor_other: '',
  architecture_preference_reason: '',
  decision_recommendation_for_leads: '',
}

function validateSectionOne(formData) {
  const errors = {}

  if (!formData.consent) {
    errors.consent = 'Please indicate whether you agree to participate.'
  } else if (formData.consent === 'No, I do not agree') {
    errors.consent = 'You must agree to participate before continuing.'
  }

  if (!formData.technical_involvement) {
    errors.technical_involvement =
      'Please indicate whether you have relevant technical experience.'
  } else if (formData.technical_involvement === 'No') {
    errors.technical_involvement =
      'This survey is intended for participants with software, architecture, DevOps, database, or related technical experience.'
  }

  if (!formData.microservice_experience) {
    errors.microservice_experience =
      'Please select your microservice architecture experience.'
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

  if (!formData.total_experience) {
    errors.total_experience = 'Please select your total technical experience.'
  }

  if (!formData.microservice_years) {
    errors.microservice_years =
      'Please select your microservice-based systems experience.'
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

  if (!formData.main_persistence_strategy) {
    errors.main_persistence_strategy =
      'Please select the persistence strategy you have worked with most.'
  }

  if (!formData.polyglot_familiarity) {
    errors.polyglot_familiarity =
      'Please rate your familiarity with Polyglot Persistence.'
  }

  if (!formData.multimodel_familiarity) {
    errors.multimodel_familiarity =
      'Please rate your familiarity with Multi-Model Databases.'
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

  if (!formData.architecture_context_clarity) {
    errors.architecture_context_clarity =
      'Please rate the clarity of the ModaVista business and technical context.'
  }

  if (!formData.architecture_difference_clarity) {
    errors.architecture_difference_clarity =
      'Please rate the clarity of the difference between the two architectures.'
  }

  if (!formData.analytics_layer_clarity) {
    errors.analytics_layer_clarity =
      'Please rate the clarity of the central Data Lakehouse / Data Warehouse role.'
  }

  if (!formData.architecture_understanding) {
    errors.architecture_understanding =
      'Please select the statement that best describes your understanding.'
  }

  if (!formData.perceived_operational_complexity) {
    errors.perceived_operational_complexity =
      'Please select which architecture appears more operationally complex.'
  }

  if (!formData.perceived_schema_reasoning_ease) {
    errors.perceived_schema_reasoning_ease =
      'Please select which architecture appears easier to reason about during schema changes.'
  }

  if (formData.perceived_downstream_impacts.length === 0) {
    errors.perceived_downstream_impacts =
      'Please select at least one downstream impact.'
  }

  if (
    formData.perceived_downstream_impacts.includes('Other') &&
    !formData.perceived_downstream_impacts_other.trim()
  ) {
    errors.perceived_downstream_impacts_other =
      'Please specify the downstream impact.'
  }

  return errors
}

function validateSectionFour(formData) {
  const errors = {}

  if (!formData.schema_change_frequency) {
    errors.schema_change_frequency =
      'Please select how often schemas or data structures change in your experience.'
  }

  if (formData.experienced_schema_change_types.length === 0) {
    errors.experienced_schema_change_types =
      'Please select at least one schema or data structure change type.'
  }

  if (
    formData.experienced_schema_change_types.includes('Other') &&
    !formData.experienced_schema_change_types_other.trim()
  ) {
    errors.experienced_schema_change_types_other =
      'Please specify the schema or data structure change type.'
  }

  if (formData.schema_change_impact_layers.length === 0) {
    errors.schema_change_impact_layers =
      'Please select at least one impacted layer.'
  }

  if (
    formData.schema_change_impact_layers.includes('Other') &&
    !formData.schema_change_impact_layers_other.trim()
  ) {
    errors.schema_change_impact_layers_other =
      'Please specify the impacted layer.'
  }

  if (formData.schema_evolution_difficulty_factors.length === 0) {
    errors.schema_evolution_difficulty_factors =
      'Please select at least one factor that makes schema evolution difficult.'
  }

  if (
    formData.schema_evolution_difficulty_factors.includes('Other') &&
    !formData.schema_evolution_difficulty_factors_other.trim()
  ) {
    errors.schema_evolution_difficulty_factors_other =
      'Please specify the difficulty factor.'
  }

  if (!formData.schema_change_productivity_impact) {
    errors.schema_change_productivity_impact =
      'Please rate how schema changes affect developer productivity.'
  }

  if (!formData.schema_change_cognitive_load) {
    errors.schema_change_cognitive_load =
      'Please rate the mental effort required to understand schema change impact.'
  }

  if (!formData.schema_change_coordination_overhead) {
    errors.schema_change_coordination_overhead =
      'Please rate the coordination required for cross-service or cross-team schema changes.'
  }

  if (!formData.schema_change_relative_risk) {
    errors.schema_change_relative_risk =
      'Please select the relative risk of schema changes.'
  }

  if (!formData.schema_change_delay_reason) {
    errors.schema_change_delay_reason =
      'Please select the most common reason schema changes become delayed or underestimated.'
  }

  if (
    formData.schema_change_delay_reason === 'Other' &&
    !formData.schema_change_delay_reason_other.trim()
  ) {
    errors.schema_change_delay_reason_other =
      'Please specify the delay or underestimation reason.'
  }

  if (!formData.easier_persistence_strategy_general) {
    errors.easier_persistence_strategy_general =
      'Please select the persistence strategy that is generally easier to maintain.'
  }

  if (!formData.most_helpful_schema_practice) {
    errors.most_helpful_schema_practice =
      'Please select the practice that has helped you most.'
  }

  if (
    formData.most_helpful_schema_practice === 'Other' &&
    !formData.most_helpful_schema_practice_other.trim()
  ) {
    errors.most_helpful_schema_practice_other =
      'Please specify the helpful schema evolution practice.'
  }

  return errors
}

function validateScenarioPolyglot(formData) {
  const errors = {}

  const requiredFields = [
    ['poly_s1_effort', 'Please select the likely implementation effort.'],
    ['poly_s1_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['poly_s1_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s1_bug_risk', 'Please rate the risk of bugs or inconsistencies.'],
    ['poly_s1_coordination_overhead', 'Please rate the coordination required.'],
    ['poly_s2_effort', 'Please select the likely implementation effort.'],
    ['poly_s2_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['poly_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s2_bug_risk', 'Please rate the risk of bugs or inconsistent data.'],
    ['poly_s2_coordination_overhead', 'Please rate the coordination required.'],
    ['poly_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['poly_s3_effort', 'Please select the likely implementation effort.'],
    ['poly_s3_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['poly_s3_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s3_data_risk', 'Please rate the data risk.'],
    ['poly_s3_coordination_overhead', 'Please rate the coordination required.'],
    ['poly_s3_migration_difficulty', 'Please rate the data migration difficulty.'],
    ['poly_s3_testing_difficulty', 'Please rate the testing and validation difficulty.'],
    ['poly_s4_effort', 'Please select the likely implementation effort.'],
    ['poly_s4_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['poly_s4_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s4_consistency_risk', 'Please rate the consistency risk.'],
    ['poly_s4_coordination_overhead', 'Please rate the coordination required.'],
    ['poly_s4_rule_enforcement_difficulty', 'Please rate the rule enforcement difficulty.'],
    ['poly_s4_failure_handling_difficulty', 'Please rate the rollback or failure handling difficulty.'],
    ['poly_s4_preferred_implementation_approach', 'Please select the implementation approach you would most likely use.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  const checkboxFields = [
    ['poly_s1_affected_areas', 'Please select at least one affected area.'],
    ['poly_s2_affected_areas', 'Please select at least one affected area.'],
    ['poly_s3_affected_areas', 'Please select at least one affected area.'],
    ['poly_s4_affected_areas', 'Please select at least one affected area.'],
  ]

  checkboxFields.forEach(([fieldName, message]) => {
    if (formData[fieldName].length === 0) {
      errors[fieldName] = message
    }
  })

  if (
    formData.poly_s1_affected_areas.includes('Other') &&
    !formData.poly_s1_affected_areas_other.trim()
  ) {
    errors.poly_s1_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.poly_s2_affected_areas.includes('Other') &&
    !formData.poly_s2_affected_areas_other.trim()
  ) {
    errors.poly_s2_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.poly_s3_affected_areas.includes('Other') &&
    !formData.poly_s3_affected_areas_other.trim()
  ) {
    errors.poly_s3_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.poly_s4_preferred_implementation_approach === 'Other' &&
    !formData.poly_s4_preferred_implementation_approach_other.trim()
  ) {
    errors.poly_s4_preferred_implementation_approach_other =
      'Please specify the implementation approach.'
  }

  if (
    formData.poly_s4_affected_areas.includes('Other') &&
    !formData.poly_s4_affected_areas_other.trim()
  ) {
    errors.poly_s4_affected_areas_other = 'Please specify the affected area.'
  }

  return errors
}

function validateScenarioMultiModel(formData) {
  const errors = {}

  const requiredFields = [
    ['multi_s1_effort', 'Please select the likely implementation effort.'],
    ['multi_s1_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['multi_s1_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s1_bug_risk', 'Please rate the risk of bugs or inconsistencies.'],
    ['multi_s1_coordination_overhead', 'Please rate the coordination required.'],
    ['multi_s2_effort', 'Please select the likely implementation effort.'],
    ['multi_s2_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['multi_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s2_bug_risk', 'Please rate the risk of bugs or inconsistent data.'],
    ['multi_s2_coordination_overhead', 'Please rate the coordination required.'],
    ['multi_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['multi_s3_effort', 'Please select the likely implementation effort.'],
    ['multi_s3_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['multi_s3_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s3_data_risk', 'Please rate the data risk.'],
    ['multi_s3_coordination_overhead', 'Please rate the coordination required.'],
    ['multi_s3_migration_difficulty', 'Please rate the data migration difficulty.'],
    ['multi_s3_testing_difficulty', 'Please rate the testing and validation difficulty.'],
    ['multi_s4_effort', 'Please select the likely implementation effort.'],
    ['multi_s4_components_affected', 'Please select how many components would likely need to be modified or checked.'],
    ['multi_s4_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s4_consistency_risk', 'Please rate the consistency risk.'],
    ['multi_s4_coordination_overhead', 'Please rate the coordination required.'],
    ['multi_s4_rule_enforcement_difficulty', 'Please rate the rule enforcement difficulty.'],
    ['multi_s4_failure_handling_difficulty', 'Please rate the rollback or failure handling difficulty.'],
    ['multi_s4_preferred_implementation_approach', 'Please select the implementation approach you would most likely use.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  const checkboxFields = [
    ['multi_s1_affected_areas', 'Please select at least one affected area.'],
    ['multi_s2_affected_areas', 'Please select at least one affected area.'],
    ['multi_s3_affected_areas', 'Please select at least one affected area.'],
    ['multi_s4_affected_areas', 'Please select at least one affected area.'],
  ]

  checkboxFields.forEach(([fieldName, message]) => {
    if (formData[fieldName].length === 0) {
      errors[fieldName] = message
    }
  })

  if (
    formData.multi_s1_affected_areas.includes('Other') &&
    !formData.multi_s1_affected_areas_other.trim()
  ) {
    errors.multi_s1_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.multi_s2_affected_areas.includes('Other') &&
    !formData.multi_s2_affected_areas_other.trim()
  ) {
    errors.multi_s2_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.multi_s3_affected_areas.includes('Other') &&
    !formData.multi_s3_affected_areas_other.trim()
  ) {
    errors.multi_s3_affected_areas_other = 'Please specify the affected area.'
  }

  if (
    formData.multi_s4_preferred_implementation_approach === 'Other' &&
    !formData.multi_s4_preferred_implementation_approach_other.trim()
  ) {
    errors.multi_s4_preferred_implementation_approach_other =
      'Please specify the implementation approach.'
  }

  if (
    formData.multi_s4_affected_areas.includes('Other') &&
    !formData.multi_s4_affected_areas_other.trim()
  ) {
    errors.multi_s4_affected_areas_other = 'Please specify the affected area.'
  }

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
    ['overall_easier_migration_architecture', 'Please select which architecture seems easier for migration.'],
    ['overall_easier_testing_architecture', 'Please select which architecture seems easier for testing and validation.'],
    ['best_architecture_low_complexity', 'Please select the most suitable architecture for low-complexity changes.'],
    ['best_architecture_breaking_change', 'Please select the most suitable architecture for breaking changes.'],
    ['best_architecture_structural_change', 'Please select the most suitable architecture for structural changes.'],
    ['best_architecture_cross_service_rule', 'Please select the most suitable architecture for cross-service business rules.'],
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

    if (Object.keys(nextErrors).length === 0) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleSectionTwoNext() {
    const nextErrors = validateSectionTwo(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleSectionThreeNext() {
    const nextErrors = validateSectionThree(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleSectionFourNext() {
    const nextErrors = validateSectionFour(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(5)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleScenarioPolyglotNext() {
    const nextErrors = validateScenarioPolyglot(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(6)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleScenarioMultiModelNext() {
    const nextErrors = validateScenarioMultiModel(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(7)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleSubmit() {
    const sectionOneErrors = validateSectionOne(normalizedFormData)
    const sectionTwoErrors = validateSectionTwo(normalizedFormData)
    const sectionThreeErrors = validateSectionThree(normalizedFormData)
    const sectionFourErrors = validateSectionFour(normalizedFormData)
    const scenarioPolyglotErrors = validateScenarioPolyglot(normalizedFormData)
    const scenarioMultiModelErrors = validateScenarioMultiModel(normalizedFormData)
    const comparativeEvaluationErrors =
      validateComparativeEvaluation(normalizedFormData)
    const nextErrors = {
      ...sectionOneErrors,
      ...sectionTwoErrors,
      ...sectionThreeErrors,
      ...sectionFourErrors,
      ...scenarioPolyglotErrors,
      ...scenarioMultiModelErrors,
      ...comparativeEvaluationErrors,
    }

    setErrors(nextErrors)
    setSubmissionError('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionError(
        'Please complete all required consent, eligibility, background, architecture context, schema evolution experience, scenario, and comparative evaluation questions before submitting.',
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
        <SchemaEvolutionExperience
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(3)}
          onNext={handleSectionFourNext}
        />
      )
    }

    if (step === 5) {
      return (
        <ScenarioPolyglot
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(4)}
          onNext={handleScenarioPolyglotNext}
        />
      )
    }

    if (step === 6) {
      return (
        <ScenarioMultiModel
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(5)}
          onNext={handleScenarioMultiModelNext}
        />
      )
    }

    return (
      <ComparativeEvaluation
        formData={normalizedFormData}
        errors={errors}
        onChange={handleChange}
        onBack={() => setStep(6)}
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
            <div className="progress-wrap" aria-label={`Step ${step} of 7`}>
              <div className="progress-text">Step {step} of 7</div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(step / 7) * 100}%` }}
                />
              </div>
            </div>
          </header>
        )}

        {renderCurrentStep()}
      </div>
    </main>
  )
}

export default App
