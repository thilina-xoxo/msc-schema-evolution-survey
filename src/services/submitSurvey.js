const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxDrK0qnKthF_8DUMPbksSPvBDItCT3FUimoZ6xL1TrGb0ZQY0scpWvD2jNN9zzBwAj/exec';
const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026';

function joinArrayValue(value) {
  return Array.isArray(value) ? value.join(', ') : value;
}

export async function submitSurvey(formData) {
  const payload = {
    survey_token: SURVEY_TOKEN,
    participant_id: formData.participant_id,
    participant_background: {
      consent: formData.consent,
      technical_involvement: formData.technical_involvement,
      microservice_experience: formData.microservice_experience,
      current_role: formData.current_role,
      current_role_other: formData.current_role_other,
      total_experience: formData.total_experience,
      microservice_years: formData.microservice_years,
      system_types: joinArrayValue(formData.system_types),
      system_types_other: formData.system_types_other,
      database_technologies: joinArrayValue(formData.database_technologies),
      database_technologies_other: formData.database_technologies_other,
      main_persistence_strategy: formData.main_persistence_strategy,
      polyglot_familiarity: formData.polyglot_familiarity,
      multimodel_familiarity: formData.multimodel_familiarity,
      schema_evolution_familiarity: formData.schema_evolution_familiarity,
      production_schema_change_experience:
        formData.production_schema_change_experience,
    },
    architecture_context: {
      architecture_context_clarity: formData.architecture_context_clarity,
      architecture_difference_clarity: formData.architecture_difference_clarity,
      analytics_layer_clarity: formData.analytics_layer_clarity,
      architecture_understanding: formData.architecture_understanding,
      perceived_operational_complexity:
        formData.perceived_operational_complexity,
      perceived_schema_reasoning_ease: formData.perceived_schema_reasoning_ease,
      perceived_downstream_impacts: joinArrayValue(
        formData.perceived_downstream_impacts,
      ),
      perceived_downstream_impacts_other:
        formData.perceived_downstream_impacts_other,
      biggest_architecture_challenge: formData.biggest_architecture_challenge,
    },
    schema_evolution_experience: {
      schema_change_frequency: formData.schema_change_frequency,
      experienced_schema_change_types: joinArrayValue(
        formData.experienced_schema_change_types,
      ),
      experienced_schema_change_types_other:
        formData.experienced_schema_change_types_other,
      schema_change_impact_layers: joinArrayValue(
        formData.schema_change_impact_layers,
      ),
      schema_change_impact_layers_other:
        formData.schema_change_impact_layers_other,
      schema_evolution_difficulty_factors: joinArrayValue(
        formData.schema_evolution_difficulty_factors,
      ),
      schema_evolution_difficulty_factors_other:
        formData.schema_evolution_difficulty_factors_other,
      schema_change_productivity_impact:
        formData.schema_change_productivity_impact,
      schema_change_cognitive_load: formData.schema_change_cognitive_load,
      schema_change_coordination_overhead:
        formData.schema_change_coordination_overhead,
      schema_change_relative_risk: formData.schema_change_relative_risk,
      schema_change_delay_reason: formData.schema_change_delay_reason,
      schema_change_delay_reason_other:
        formData.schema_change_delay_reason_other,
      easier_persistence_strategy_general:
        formData.easier_persistence_strategy_general,
      easier_persistence_strategy_reason:
        formData.easier_persistence_strategy_reason,
      most_helpful_schema_practice: formData.most_helpful_schema_practice,
      most_helpful_schema_practice_other:
        formData.most_helpful_schema_practice_other,
      schema_evolution_experience_example:
        formData.schema_evolution_experience_example,
    },
  };

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(payload),
  });
}
