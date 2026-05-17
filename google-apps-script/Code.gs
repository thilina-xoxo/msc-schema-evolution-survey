const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026';

const PARTICIPANT_BACKGROUND_SHEET = 'participant_background';
const ARCHITECTURE_CONTEXT_SHEET = 'architecture_context';
const SCHEMA_EVOLUTION_EXPERIENCE_SHEET = 'schema_evolution_experience';
const SCENARIO_POLYGLOT_SHEET = 'scenario_polyglot';
const SCENARIO_MULTIMODEL_SHEET = 'scenario_multimodel';
const COMPARATIVE_EVALUATION_SHEET = 'comparative_evaluation';
const TOOLING_PRACTICES_SHEET = 'tooling_practices';
const MANAGERIAL_DELIVERY_IMPACT_SHEET = 'managerial_delivery_impact';
const FINAL_REFLECTION_SHEET = 'final_reflection';

const PARTICIPANT_BACKGROUND_HEADERS = [
  'timestamp',
  'participant_id',
  'consent',
  'technical_involvement',
  'microservice_experience',
  'current_role',
  'current_role_other',
  'total_experience',
  'microservice_years',
  'system_types',
  'system_types_other',
  'database_technologies',
  'database_technologies_other',
  'main_persistence_strategy',
  'polyglot_familiarity',
  'multimodel_familiarity',
  'schema_evolution_familiarity',
  'production_schema_change_experience',
];

const ARCHITECTURE_CONTEXT_HEADERS = [
  'timestamp',
  'participant_id',
  'architecture_context_clarity',
  'architecture_difference_clarity',
  'analytics_layer_clarity',
  'architecture_understanding',
  'perceived_operational_complexity',
  'perceived_schema_reasoning_ease',
  'perceived_downstream_impacts',
  'perceived_downstream_impacts_other',
  'biggest_architecture_challenge',
];

const SCHEMA_EVOLUTION_EXPERIENCE_HEADERS = [
  'timestamp',
  'participant_id',
  'schema_change_frequency',
  'experienced_schema_change_types',
  'experienced_schema_change_types_other',
  'schema_change_impact_layers',
  'schema_change_impact_layers_other',
  'schema_evolution_difficulty_factors',
  'schema_evolution_difficulty_factors_other',
  'schema_change_productivity_impact',
  'schema_change_cognitive_load',
  'schema_change_coordination_overhead',
  'schema_change_relative_risk',
  'schema_change_delay_reason',
  'schema_change_delay_reason_other',
  'easier_persistence_strategy_general',
  'easier_persistence_strategy_reason',
  'most_helpful_schema_practice',
  'most_helpful_schema_practice_other',
  'schema_evolution_experience_example',
];

const SCENARIO_POLYGLOT_HEADERS = [
  'timestamp',
  'participant_id',
  'poly_s1_effort',
  'poly_s1_components_affected',
  'poly_s1_cognitive_load',
  'poly_s1_bug_risk',
  'poly_s1_coordination_overhead',
  'poly_s1_affected_areas',
  'poly_s1_affected_areas_other',
  'poly_s1_main_challenge',
  'poly_s2_effort',
  'poly_s2_components_affected',
  'poly_s2_cognitive_load',
  'poly_s2_bug_risk',
  'poly_s2_coordination_overhead',
  'poly_s2_backward_compatibility_difficulty',
  'poly_s2_affected_areas',
  'poly_s2_affected_areas_other',
  'poly_s2_main_challenge',
  'poly_s2_compatibility_strategy',
  'poly_s3_effort',
  'poly_s3_components_affected',
  'poly_s3_cognitive_load',
  'poly_s3_data_risk',
  'poly_s3_coordination_overhead',
  'poly_s3_migration_difficulty',
  'poly_s3_testing_difficulty',
  'poly_s3_affected_areas',
  'poly_s3_affected_areas_other',
  'poly_s3_implementation_approach',
  'poly_s3_biggest_risk',
  'poly_s4_effort',
  'poly_s4_components_affected',
  'poly_s4_cognitive_load',
  'poly_s4_consistency_risk',
  'poly_s4_coordination_overhead',
  'poly_s4_rule_enforcement_difficulty',
  'poly_s4_failure_handling_difficulty',
  'poly_s4_preferred_implementation_approach',
  'poly_s4_preferred_implementation_approach_other',
  'poly_s4_affected_areas',
  'poly_s4_affected_areas_other',
  'poly_s4_productivity_challenge',
  'poly_s4_complexity_reduction_practices',
];

const SCENARIO_MULTIMODEL_HEADERS = [
  'timestamp',
  'participant_id',
  'multi_s1_effort',
  'multi_s1_components_affected',
  'multi_s1_cognitive_load',
  'multi_s1_bug_risk',
  'multi_s1_coordination_overhead',
  'multi_s1_affected_areas',
  'multi_s1_affected_areas_other',
  'multi_s1_main_challenge',
  'multi_s2_effort',
  'multi_s2_components_affected',
  'multi_s2_cognitive_load',
  'multi_s2_bug_risk',
  'multi_s2_coordination_overhead',
  'multi_s2_backward_compatibility_difficulty',
  'multi_s2_affected_areas',
  'multi_s2_affected_areas_other',
  'multi_s2_main_challenge',
  'multi_s2_compatibility_strategy',
  'multi_s3_effort',
  'multi_s3_components_affected',
  'multi_s3_cognitive_load',
  'multi_s3_data_risk',
  'multi_s3_coordination_overhead',
  'multi_s3_migration_difficulty',
  'multi_s3_testing_difficulty',
  'multi_s3_affected_areas',
  'multi_s3_affected_areas_other',
  'multi_s3_implementation_approach',
  'multi_s3_biggest_risk',
  'multi_s4_effort',
  'multi_s4_components_affected',
  'multi_s4_cognitive_load',
  'multi_s4_consistency_risk',
  'multi_s4_coordination_overhead',
  'multi_s4_rule_enforcement_difficulty',
  'multi_s4_failure_handling_difficulty',
  'multi_s4_preferred_implementation_approach',
  'multi_s4_preferred_implementation_approach_other',
  'multi_s4_affected_areas',
  'multi_s4_affected_areas_other',
  'multi_s4_productivity_challenge',
  'multi_s4_complexity_reduction_practices',
];

const COMPARATIVE_EVALUATION_HEADERS = [
  'timestamp',
  'participant_id',
  'overall_easier_architecture',
  'overall_less_effort_architecture',
  'overall_lower_cognitive_load_architecture',
  'overall_lower_risk_architecture',
  'overall_less_coordination_architecture',
  'overall_easier_migration_architecture',
  'overall_easier_testing_architecture',
  'best_architecture_low_complexity',
  'best_architecture_breaking_change',
  'best_architecture_structural_change',
  'best_architecture_cross_service_rule',
  'most_difficult_schema_change_type',
  'most_difficult_schema_change_type_other',
  'main_productivity_factor',
  'main_productivity_factor_other',
  'architecture_preference_reason',
  'decision_recommendation_for_leads',
];

const TOOLING_PRACTICES_HEADERS = [
  'timestamp',
  'participant_id',
  'used_schema_tools_practices',
  'used_schema_tools_practices_other',
  'most_effective_migration_tooling',
  'most_effective_migration_tooling_other',
  'automated_migration_tool_usefulness',
  'automated_test_usefulness',
  'api_versioning_usefulness',
  'event_schema_registry_usefulness',
  'feature_flag_usefulness',
  'rollback_backup_usefulness',
  'documentation_usefulness',
  'ai_tool_usefulness',
  'ai_tool_usage_frequency',
  'ai_tool_supported_tasks',
  'ai_tool_supported_tasks_other',
  'ai_tool_trust_level',
  'team_productivity_hack',
  'schema_change_checklist_usage',
  'recommended_schema_change_checklist_items',
  'recommended_schema_change_checklist_items_other',
  'organization_improvement_priority',
  'organization_improvement_priority_other',
  'tooling_gap_observation',
];

const MANAGERIAL_DELIVERY_IMPACT_HEADERS = [
  'timestamp',
  'participant_id',
  'schema_change_underestimation_frequency',
  'missed_planning_factors',
  'missed_planning_factors_other',
  'release_timeline_impact',
  'developer_stress_impact',
  'delivery_confidence_impact',
  'senior_architect_involvement_importance',
  'cross_team_communication_importance',
  'documentation_importance',
  'early_impact_analysis_importance',
  'schema_change_estimation_owner',
  'delivery_risk_warning_signs',
  'delivery_risk_warning_signs_other',
  'recommended_estimation_buffer',
  'most_useful_managerial_metric',
  'most_useful_managerial_metric_other',
  'planning_advice_for_leads',
  'resource_allocation_advice',
];

const FINAL_REFLECTION_HEADERS = [
  'timestamp',
  'participant_id',
  'biggest_hidden_cost',
  'one_process_improvement',
  'additional_comments',
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    if (payload.survey_token !== SURVEY_TOKEN) {
      return createJsonResponse({ ok: false, error: 'Invalid survey token' });
    }

    if (!payload.participant_id) {
      return createJsonResponse({ ok: false, error: 'Missing participant_id' });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date();
    const participantId = sanitizeValue(payload.participant_id);

    const participantBackgroundSheet = getOrCreateSheet(
      spreadsheet,
      PARTICIPANT_BACKGROUND_SHEET,
      PARTICIPANT_BACKGROUND_HEADERS
    );
    const architectureContextSheet = getOrCreateSheet(
      spreadsheet,
      ARCHITECTURE_CONTEXT_SHEET,
      ARCHITECTURE_CONTEXT_HEADERS
    );
    const schemaEvolutionExperienceSheet = getOrCreateSheet(
      spreadsheet,
      SCHEMA_EVOLUTION_EXPERIENCE_SHEET,
      SCHEMA_EVOLUTION_EXPERIENCE_HEADERS
    );
    const scenarioPolyglotSheet = getOrCreateSheet(
      spreadsheet,
      SCENARIO_POLYGLOT_SHEET,
      SCENARIO_POLYGLOT_HEADERS
    );
    const scenarioMultiModelSheet = getOrCreateSheet(
      spreadsheet,
      SCENARIO_MULTIMODEL_SHEET,
      SCENARIO_MULTIMODEL_HEADERS
    );
    const comparativeEvaluationSheet = getOrCreateSheet(
      spreadsheet,
      COMPARATIVE_EVALUATION_SHEET,
      COMPARATIVE_EVALUATION_HEADERS
    );
    const toolingPracticesSheet = getOrCreateSheet(
      spreadsheet,
      TOOLING_PRACTICES_SHEET,
      TOOLING_PRACTICES_HEADERS
    );
    const managerialDeliveryImpactSheet = getOrCreateSheet(
      spreadsheet,
      MANAGERIAL_DELIVERY_IMPACT_SHEET,
      MANAGERIAL_DELIVERY_IMPACT_HEADERS
    );
    const finalReflectionSheet = getOrCreateSheet(
      spreadsheet,
      FINAL_REFLECTION_SHEET,
      FINAL_REFLECTION_HEADERS
    );

    participantBackgroundSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.participant_background || {},
        PARTICIPANT_BACKGROUND_HEADERS
      )
    );
    architectureContextSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.architecture_context || {},
        ARCHITECTURE_CONTEXT_HEADERS
      )
    );
    schemaEvolutionExperienceSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.schema_evolution_experience || {},
        SCHEMA_EVOLUTION_EXPERIENCE_HEADERS
      )
    );
    scenarioPolyglotSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.scenario_polyglot || {},
        SCENARIO_POLYGLOT_HEADERS
      )
    );
    scenarioMultiModelSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.scenario_multimodel || {},
        SCENARIO_MULTIMODEL_HEADERS
      )
    );
    comparativeEvaluationSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.comparative_evaluation || {},
        COMPARATIVE_EVALUATION_HEADERS
      )
    );
    toolingPracticesSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.tooling_practices || {},
        TOOLING_PRACTICES_HEADERS
      )
    );
    managerialDeliveryImpactSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.managerial_delivery_impact || {},
        MANAGERIAL_DELIVERY_IMPACT_HEADERS
      )
    );
    finalReflectionSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.final_reflection || {},
        FINAL_REFLECTION_HEADERS
      )
    );

    return createJsonResponse({ ok: true });
  } catch (error) {
    return createJsonResponse({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function buildRow(timestamp, participantId, sectionData, headers) {
  return headers.map((header) => {
    if (header === 'timestamp') {
      return timestamp;
    }

    if (header === 'participant_id') {
      return participantId;
    }

    return sanitizeValue(sectionData[header]);
  });
}

function sanitizeValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue).join(', ');
  }

  return String(value).trim();
}

function createJsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
