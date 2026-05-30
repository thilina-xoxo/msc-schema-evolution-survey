const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzu4UCgQB71jhUiCBioCOLNfWexbwnJPJ79y-9fRX0x1ftlb507cDERVNVszue4TSY0/exec';
const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026';

function joinArrayValue(value) {
  return Array.isArray(value) ? value.join(', ') : value;
}

export async function submitSurvey(formData) {
  const payload = {
    survey_token: SURVEY_TOKEN,
    participant_id: formData.participant_id,
    participant_background: {
      technical_involvement: formData.technical_involvement,
      current_role: formData.current_role,
      current_role_other: formData.current_role_other,
      system_types: joinArrayValue(formData.system_types),
      system_types_other: formData.system_types_other,
      database_technologies: joinArrayValue(formData.database_technologies),
      database_technologies_other: formData.database_technologies_other,
      schema_evolution_familiarity: formData.schema_evolution_familiarity,
      production_schema_change_experience:
        formData.production_schema_change_experience,
    },
    architecture_context: {
      architecture_difference_clarity: formData.architecture_difference_clarity,
    },
    scenario_polyglot: {
      polyglot_s1_effort_story_points: formData.polyglot_s1_effort_story_points,
      polyglot_s1_mental_effort: formData.polyglot_s1_mental_effort,
      polyglot_s1_bug_data_risk: formData.polyglot_s1_bug_data_risk,
      polyglot_s1_coordination_overhead:
        formData.polyglot_s1_coordination_overhead,
      polyglot_s1_productivity_impact: formData.polyglot_s1_productivity_impact,
      polyglot_s1_architecture_benefits: joinArrayValue(
        formData.polyglot_s1_architecture_benefits,
      ),
      polyglot_s1_architecture_challenges: joinArrayValue(
        formData.polyglot_s1_architecture_challenges,
      ),
      polyglot_s1_optional_comment: formData.polyglot_s1_optional_comment,
      polyglot_s2_effort_story_points: formData.polyglot_s2_effort_story_points,
      polyglot_s2_mental_effort: formData.polyglot_s2_mental_effort,
      polyglot_s2_bug_data_risk: formData.polyglot_s2_bug_data_risk,
      polyglot_s2_coordination_overhead:
        formData.polyglot_s2_coordination_overhead,
      polyglot_s2_backward_compatibility_difficulty:
        formData.polyglot_s2_backward_compatibility_difficulty,
      polyglot_s2_productivity_impact: formData.polyglot_s2_productivity_impact,
      polyglot_s2_architecture_benefits: joinArrayValue(
        formData.polyglot_s2_architecture_benefits,
      ),
      polyglot_s2_architecture_challenges: joinArrayValue(
        formData.polyglot_s2_architecture_challenges,
      ),
      polyglot_s2_optional_comment: formData.polyglot_s2_optional_comment,
    },
    scenario_multimodel: {
      multimodel_s1_effort_story_points:
        formData.multimodel_s1_effort_story_points,
      multimodel_s1_mental_effort: formData.multimodel_s1_mental_effort,
      multimodel_s1_bug_data_risk: formData.multimodel_s1_bug_data_risk,
      multimodel_s1_coordination_overhead:
        formData.multimodel_s1_coordination_overhead,
      multimodel_s1_productivity_impact:
        formData.multimodel_s1_productivity_impact,
      multimodel_s1_architecture_benefits: joinArrayValue(
        formData.multimodel_s1_architecture_benefits,
      ),
      multimodel_s1_architecture_challenges: joinArrayValue(
        formData.multimodel_s1_architecture_challenges,
      ),
      multimodel_s1_optional_comment: formData.multimodel_s1_optional_comment,
      multimodel_s2_effort_story_points:
        formData.multimodel_s2_effort_story_points,
      multimodel_s2_mental_effort: formData.multimodel_s2_mental_effort,
      multimodel_s2_bug_data_risk: formData.multimodel_s2_bug_data_risk,
      multimodel_s2_coordination_overhead:
        formData.multimodel_s2_coordination_overhead,
      multimodel_s2_backward_compatibility_difficulty:
        formData.multimodel_s2_backward_compatibility_difficulty,
      multimodel_s2_productivity_impact:
        formData.multimodel_s2_productivity_impact,
      multimodel_s2_architecture_benefits: joinArrayValue(
        formData.multimodel_s2_architecture_benefits,
      ),
      multimodel_s2_architecture_challenges: joinArrayValue(
        formData.multimodel_s2_architecture_challenges,
      ),
      multimodel_s2_optional_comment: formData.multimodel_s2_optional_comment,
    },
    comparative_tooling_practices: {
      architecture_tradeoff_view: joinArrayValue(
        formData.architecture_tradeoff_view,
      ),
      main_schema_evolution_difficulty_factors: joinArrayValue(
        formData.main_schema_evolution_difficulty_factors,
      ),
      productivity_improving_practices: joinArrayValue(
        formData.productivity_improving_practices,
      ),
      useful_schema_tool_practices: joinArrayValue(
        formData.useful_schema_tool_practices,
      ),
      ai_tool_usage_for_schema_work: formData.ai_tool_usage_for_schema_work,
      ai_schema_usage_modes: joinArrayValue(formData.ai_schema_usage_modes),
      schema_productivity_practice_comment:
        formData.schema_productivity_practice_comment,
    },
    software_delivery_impact: {
      schema_delivery_effort_impact: formData.schema_delivery_effort_impact,
      schema_affected_delivery_activities: joinArrayValue(
        formData.schema_affected_delivery_activities,
      ),
      schema_delivery_risk_signals: joinArrayValue(
        formData.schema_delivery_risk_signals,
      ),
      schema_delivery_confidence_actions: joinArrayValue(
        formData.schema_delivery_confidence_actions,
      ),
      schema_delivery_recommendation: formData.schema_delivery_recommendation,
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
