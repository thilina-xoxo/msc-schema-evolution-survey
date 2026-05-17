import { useMemo, useState } from 'react'
import ComparativeEvaluation from './components/ComparativeEvaluation'
import ConsentSection from './components/ConsentSection'
import FinalReflection from './components/FinalReflection'
import ManagerialDeliveryImpact from './components/ManagerialDeliveryImpact'
import ParticipantBackground from './components/ParticipantBackground'
import ScenarioMultiModel from './components/ScenarioMultiModel'
import ScenarioPolyglot from './components/ScenarioPolyglot'
import SchemaEvolutionExperience from './components/SchemaEvolutionExperience'
import SectionThreeArchitecture from './components/SectionThreeArchitecture'
import ToolingPractices from './components/ToolingPractices'
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
  schema_change_frequency: '',
  experienced_schema_change_types: [],
  experienced_schema_change_types_other: '',
  schema_evolution_difficulty_factors: [],
  schema_evolution_difficulty_factors_other: '',
  schema_change_productivity_impact: '',
  schema_change_cognitive_load: '',
  schema_change_coordination_overhead: '',
  poly_s1_effort: '',
  poly_s1_change_radius: '',
  poly_s1_cognitive_load: '',
  poly_s1_bug_risk: '',
  poly_s1_coordination_overhead: '',
  poly_s1_comment: '',
  poly_s2_effort: '',
  poly_s2_change_radius: '',
  poly_s2_cognitive_load: '',
  poly_s2_bug_risk: '',
  poly_s2_coordination_overhead: '',
  poly_s2_backward_compatibility_difficulty: '',
  poly_s2_comment: '',
  poly_s3_effort: '',
  poly_s3_change_radius: '',
  poly_s3_cognitive_load: '',
  poly_s3_data_risk: '',
  poly_s3_coordination_overhead: '',
  poly_s3_migration_difficulty: '',
  poly_s3_testing_difficulty: '',
  poly_s3_comment: '',
  poly_s4_effort: '',
  poly_s4_change_radius: '',
  poly_s4_cognitive_load: '',
  poly_s4_consistency_risk: '',
  poly_s4_coordination_overhead: '',
  poly_s4_rule_enforcement_difficulty: '',
  poly_s4_failure_handling_difficulty: '',
  poly_s4_preferred_implementation_approach: '',
  poly_s4_preferred_implementation_approach_other: '',
  poly_s4_comment: '',
  multi_s1_effort: '',
  multi_s1_change_radius: '',
  multi_s1_cognitive_load: '',
  multi_s1_bug_risk: '',
  multi_s1_coordination_overhead: '',
  multi_s1_comment: '',
  multi_s2_effort: '',
  multi_s2_change_radius: '',
  multi_s2_cognitive_load: '',
  multi_s2_bug_risk: '',
  multi_s2_coordination_overhead: '',
  multi_s2_backward_compatibility_difficulty: '',
  multi_s2_comment: '',
  multi_s3_effort: '',
  multi_s3_change_radius: '',
  multi_s3_cognitive_load: '',
  multi_s3_data_risk: '',
  multi_s3_coordination_overhead: '',
  multi_s3_migration_difficulty: '',
  multi_s3_testing_difficulty: '',
  multi_s3_comment: '',
  multi_s4_effort: '',
  multi_s4_change_radius: '',
  multi_s4_cognitive_load: '',
  multi_s4_consistency_risk: '',
  multi_s4_coordination_overhead: '',
  multi_s4_rule_enforcement_difficulty: '',
  multi_s4_failure_handling_difficulty: '',
  multi_s4_preferred_implementation_approach: '',
  multi_s4_preferred_implementation_approach_other: '',
  multi_s4_comment: '',
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
  used_schema_tools_practices: [],
  used_schema_tools_practices_other: '',
  most_effective_migration_tooling: '',
  most_effective_migration_tooling_other: '',
  automated_migration_tool_usefulness: '',
  automated_test_usefulness: '',
  api_versioning_usefulness: '',
  event_schema_registry_usefulness: '',
  feature_flag_usefulness: '',
  rollback_backup_usefulness: '',
  documentation_usefulness: '',
  ai_tool_usefulness: '',
  ai_tool_usage_frequency: '',
  ai_tool_supported_tasks: [],
  ai_tool_supported_tasks_other: '',
  ai_tool_trust_level: '',
  team_productivity_hack: '',
  schema_change_checklist_usage: '',
  recommended_schema_change_checklist_items: [],
  recommended_schema_change_checklist_items_other: '',
  organization_improvement_priority: '',
  organization_improvement_priority_other: '',
  tooling_gap_observation: '',
  schema_change_underestimation_frequency: '',
  missed_planning_factors: [],
  missed_planning_factors_other: '',
  release_timeline_impact: '',
  developer_stress_impact: '',
  delivery_confidence_impact: '',
  senior_architect_involvement_importance: '',
  cross_team_communication_importance: '',
  documentation_importance: '',
  early_impact_analysis_importance: '',
  schema_change_estimation_owner: '',
  delivery_risk_warning_signs: [],
  delivery_risk_warning_signs_other: '',
  recommended_estimation_buffer: '',
  most_useful_managerial_metric: '',
  most_useful_managerial_metric_other: '',
  planning_advice_for_leads: '',
  resource_allocation_advice: '',
  biggest_hidden_cost: '',
  one_process_improvement: '',
  additional_comments: '',
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
      'Please rate the clarity of the reference architecture context.'
  }

  if (!formData.architecture_difference_clarity) {
    errors.architecture_difference_clarity =
      'Please rate the clarity of the difference between Polyglot Persistence and Multi-Model Persistence.'
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

  return errors
}

function validateScenarioPolyglot(formData) {
  const errors = {}

  const requiredFields = [
    ['poly_s1_effort', 'Please select the likely implementation effort.'],
    ['poly_s1_change_radius', 'Please select the likely change impact radius.'],
    ['poly_s1_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s1_bug_risk', 'Please rate the risk of bugs or data issues.'],
    ['poly_s1_coordination_overhead', 'Please rate the coordination overhead.'],
    ['poly_s2_effort', 'Please select the likely implementation effort.'],
    ['poly_s2_change_radius', 'Please select the likely change impact radius.'],
    ['poly_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s2_bug_risk', 'Please rate the risk of bugs or inconsistent data.'],
    ['poly_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['poly_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['poly_s3_effort', 'Please select the likely implementation effort.'],
    ['poly_s3_change_radius', 'Please select the likely change impact radius.'],
    ['poly_s3_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s3_data_risk', 'Please rate the data, privacy, or compliance risk.'],
    ['poly_s3_coordination_overhead', 'Please rate the coordination overhead.'],
    ['poly_s3_migration_difficulty', 'Please rate the data migration difficulty.'],
    ['poly_s3_testing_difficulty', 'Please rate the testing and validation difficulty.'],
    ['poly_s4_effort', 'Please select the likely implementation effort.'],
    ['poly_s4_change_radius', 'Please select the likely change impact radius.'],
    ['poly_s4_cognitive_load', 'Please rate the mental effort required.'],
    ['poly_s4_consistency_risk', 'Please rate the consistency or compliance risk.'],
    ['poly_s4_coordination_overhead', 'Please rate the coordination overhead.'],
    ['poly_s4_rule_enforcement_difficulty', 'Please rate the rule enforcement difficulty.'],
    ['poly_s4_failure_handling_difficulty', 'Please rate the failure handling or rollback difficulty.'],
    ['poly_s4_preferred_implementation_approach', 'Please select the implementation approach you would most likely consider.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  if (
    formData.poly_s4_preferred_implementation_approach === 'Other' &&
    !formData.poly_s4_preferred_implementation_approach_other.trim()
  ) {
    errors.poly_s4_preferred_implementation_approach_other =
      'Please specify the implementation approach.'
  }

  return errors
}

function validateScenarioMultiModel(formData) {
  const errors = {}

  const requiredFields = [
    ['multi_s1_effort', 'Please select the likely implementation effort.'],
    ['multi_s1_change_radius', 'Please select the likely change impact radius.'],
    ['multi_s1_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s1_bug_risk', 'Please rate the risk of bugs or data issues.'],
    ['multi_s1_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s2_effort', 'Please select the likely implementation effort.'],
    ['multi_s2_change_radius', 'Please select the likely change impact radius.'],
    ['multi_s2_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s2_bug_risk', 'Please rate the risk of bugs or inconsistent data.'],
    ['multi_s2_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s2_backward_compatibility_difficulty', 'Please rate the backward compatibility difficulty.'],
    ['multi_s3_effort', 'Please select the likely implementation effort.'],
    ['multi_s3_change_radius', 'Please select the likely change impact radius.'],
    ['multi_s3_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s3_data_risk', 'Please rate the data, privacy, or compliance risk.'],
    ['multi_s3_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s3_migration_difficulty', 'Please rate the data migration difficulty.'],
    ['multi_s3_testing_difficulty', 'Please rate the testing and validation difficulty.'],
    ['multi_s4_effort', 'Please select the likely implementation effort.'],
    ['multi_s4_change_radius', 'Please select the likely change impact radius.'],
    ['multi_s4_cognitive_load', 'Please rate the mental effort required.'],
    ['multi_s4_consistency_risk', 'Please rate the consistency or compliance risk.'],
    ['multi_s4_coordination_overhead', 'Please rate the coordination overhead.'],
    ['multi_s4_rule_enforcement_difficulty', 'Please rate the rule enforcement difficulty.'],
    ['multi_s4_failure_handling_difficulty', 'Please rate the rollback or failure handling difficulty.'],
    ['multi_s4_preferred_implementation_approach', 'Please select the implementation approach you would most likely consider.'],
  ]

  requiredFields.forEach(([fieldName, message]) => {
    if (!formData[fieldName]) {
      errors[fieldName] = message
    }
  })

  if (
    formData.multi_s4_preferred_implementation_approach === 'Other' &&
    !formData.multi_s4_preferred_implementation_approach_other.trim()
  ) {
    errors.multi_s4_preferred_implementation_approach_other =
      'Please specify the implementation approach.'
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

function validateToolingPractices(formData) {
  const errors = {}
  const requiredFields = [
    ['most_effective_migration_tooling', 'Please select the most effective tooling type.'],
    ['automated_migration_tool_usefulness', 'Please rate automated migration tool usefulness.'],
    ['automated_test_usefulness', 'Please rate automated test usefulness.'],
    ['api_versioning_usefulness', 'Please rate API versioning usefulness.'],
    ['event_schema_registry_usefulness', 'Please rate event schema registry usefulness.'],
    ['feature_flag_usefulness', 'Please rate feature flag usefulness.'],
    ['rollback_backup_usefulness', 'Please rate backup and rollback plan usefulness.'],
    ['documentation_usefulness', 'Please rate documentation usefulness.'],
    ['ai_tool_usefulness', 'Please rate AI-assisted coding tool usefulness.'],
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

  if (formData.recommended_schema_change_checklist_items.length === 0) {
    errors.recommended_schema_change_checklist_items =
      'Please select at least one checklist item.'
  }

  if (
    formData.recommended_schema_change_checklist_items.includes('Other') &&
    !formData.recommended_schema_change_checklist_items_other.trim()
  ) {
    errors.recommended_schema_change_checklist_items_other =
      'Please specify the checklist item.'
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
    ['developer_stress_impact', 'Please rate the impact on developer stress or workload pressure.'],
    ['delivery_confidence_impact', 'Please rate the impact on delivery confidence.'],
    ['senior_architect_involvement_importance', 'Please rate the importance of senior engineer or architect involvement.'],
    ['cross_team_communication_importance', 'Please rate the importance of cross-team communication.'],
    ['documentation_importance', 'Please rate the importance of documentation.'],
    ['early_impact_analysis_importance', 'Please rate the importance of early impact analysis.'],
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
  const [isScenarioMultiModelTestSubmitting, setIsScenarioMultiModelTestSubmitting] =
    useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [scenarioMultiModelTestMessage, setScenarioMultiModelTestMessage] =
    useState('')
  const [scenarioMultiModelTestError, setScenarioMultiModelTestError] =
    useState('')
  const [submitted, setSubmitted] = useState(false)
  const normalizedFormData = {
    ...initialFormData,
    ...formData,
  }

  function handleChange(name, value) {
    setScenarioMultiModelTestMessage('')
    setScenarioMultiModelTestError('')

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

  async function handleScenarioMultiModelTestSubmit() {
    const sectionOneErrors = validateSectionOne(normalizedFormData)
    const sectionTwoErrors = validateSectionTwo(normalizedFormData)
    const sectionThreeErrors = validateSectionThree(normalizedFormData)
    const sectionFourErrors = validateSectionFour(normalizedFormData)
    const scenarioPolyglotErrors = validateScenarioPolyglot(normalizedFormData)
    const scenarioMultiModelErrors = validateScenarioMultiModel(normalizedFormData)
    const nextErrors = {
      ...sectionOneErrors,
      ...sectionTwoErrors,
      ...sectionThreeErrors,
      ...sectionFourErrors,
      ...scenarioPolyglotErrors,
      ...scenarioMultiModelErrors,
    }

    setErrors(nextErrors)
    setScenarioMultiModelTestMessage('')
    setScenarioMultiModelTestError('')

    if (Object.keys(nextErrors).length > 0) {
      setScenarioMultiModelTestError(
        'Please complete Sections 1, 2, 3, 4, 5_1, and 5_2 before submitting this test response.',
      )
      return
    }

    try {
      setIsScenarioMultiModelTestSubmitting(true)
      await submitSurvey(normalizedFormData)
      setScenarioMultiModelTestMessage(
        'Current response submitted successfully for testing.',
      )
    } catch {
      setScenarioMultiModelTestError(
        'Submission failed. Please check your connection and try again.',
      )
    } finally {
      setIsScenarioMultiModelTestSubmitting(false)
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

  function handleComparativeEvaluationNext() {
    const nextErrors = validateComparativeEvaluation(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(8)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleToolingPracticesNext() {
    const nextErrors = validateToolingPractices(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(9)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleManagerialDeliveryImpactNext() {
    const nextErrors = validateManagerialDeliveryImpact(normalizedFormData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(10)
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
    const toolingPracticesErrors = validateToolingPractices(normalizedFormData)
    const managerialDeliveryImpactErrors =
      validateManagerialDeliveryImpact(normalizedFormData)
    const nextErrors = {
      ...sectionOneErrors,
      ...sectionTwoErrors,
      ...sectionThreeErrors,
      ...sectionFourErrors,
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
        'Please complete all required consent, eligibility, background, architecture context, schema evolution experience, scenario, comparative evaluation, tooling practices, and managerial delivery impact questions before submitting.',
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
          onTestSubmit={handleScenarioMultiModelTestSubmit}
          isTestSubmitting={isScenarioMultiModelTestSubmitting}
          testSubmissionMessage={scenarioMultiModelTestMessage}
          testSubmissionError={scenarioMultiModelTestError}
        />
      )
    }

    if (step === 7) {
      return (
        <ComparativeEvaluation
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(6)}
          onNext={handleComparativeEvaluationNext}
        />
      )
    }

    if (step === 8) {
      return (
        <ToolingPractices
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(7)}
          onNext={handleToolingPracticesNext}
        />
      )
    }

    if (step === 9) {
      return (
        <ManagerialDeliveryImpact
          formData={normalizedFormData}
          errors={errors}
          onChange={handleChange}
          onBack={() => setStep(8)}
          onNext={handleManagerialDeliveryImpactNext}
        />
      )
    }

    return (
      <FinalReflection
        formData={normalizedFormData}
        onChange={handleChange}
        onBack={() => setStep(9)}
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
            <div className="progress-wrap" aria-label={`Step ${step} of 10`}>
              <div className="progress-text">Step {step} of 10</div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(step / 10) * 100}%` }}
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
