const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxoRTbHk3ubCXBnlXmAWZdBemqm7PSyGiRDxepMywCA9ttorLN95yPsi_eqp-OY5oXm/exec';
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
      polyglot_s1_effort_story_points:
        formData.polyglot_s1_effort_story_points,
      polyglot_s1_mental_effort: formData.polyglot_s1_mental_effort,
      polyglot_s1_bug_data_risk: formData.polyglot_s1_bug_data_risk,
      polyglot_s1_coordination_overhead:
        formData.polyglot_s1_coordination_overhead,
      polyglot_s1_productivity_impact:
        formData.polyglot_s1_productivity_impact,
      polyglot_s1_architecture_benefits: joinArrayValue(
        formData.polyglot_s1_architecture_benefits,
      ),
      polyglot_s1_architecture_challenges: joinArrayValue(
        formData.polyglot_s1_architecture_challenges,
      ),
      polyglot_s1_optional_comment: formData.polyglot_s1_optional_comment,
      polyglot_s2_effort_story_points:
        formData.polyglot_s2_effort_story_points,
      polyglot_s2_mental_effort: formData.polyglot_s2_mental_effort,
      polyglot_s2_bug_data_risk: formData.polyglot_s2_bug_data_risk,
      polyglot_s2_coordination_overhead:
        formData.polyglot_s2_coordination_overhead,
      polyglot_s2_backward_compatibility_difficulty:
        formData.polyglot_s2_backward_compatibility_difficulty,
      polyglot_s2_productivity_impact:
        formData.polyglot_s2_productivity_impact,
      polyglot_s2_architecture_benefits: joinArrayValue(
        formData.polyglot_s2_architecture_benefits,
      ),
      polyglot_s2_architecture_challenges: joinArrayValue(
        formData.polyglot_s2_architecture_challenges,
      ),
      polyglot_s2_optional_comment: formData.polyglot_s2_optional_comment,
    },
    scenario_multimodel: {
      multi_s1_effort: formData.multi_s1_effort,
      multi_s1_change_radius: formData.multi_s1_change_radius,
      multi_s1_cognitive_load: formData.multi_s1_cognitive_load,
      multi_s1_bug_risk: formData.multi_s1_bug_risk,
      multi_s1_coordination_overhead: formData.multi_s1_coordination_overhead,
      multi_s1_comment: formData.multi_s1_comment,
      multi_s2_effort: formData.multi_s2_effort,
      multi_s2_change_radius: formData.multi_s2_change_radius,
      multi_s2_cognitive_load: formData.multi_s2_cognitive_load,
      multi_s2_bug_risk: formData.multi_s2_bug_risk,
      multi_s2_coordination_overhead: formData.multi_s2_coordination_overhead,
      multi_s2_backward_compatibility_difficulty:
        formData.multi_s2_backward_compatibility_difficulty,
      multi_s2_comment: formData.multi_s2_comment,
      multi_s3_effort: formData.multi_s3_effort,
      multi_s3_change_radius: formData.multi_s3_change_radius,
      multi_s3_cognitive_load: formData.multi_s3_cognitive_load,
      multi_s3_data_risk: formData.multi_s3_data_risk,
      multi_s3_coordination_overhead: formData.multi_s3_coordination_overhead,
      multi_s3_migration_difficulty: formData.multi_s3_migration_difficulty,
      multi_s3_testing_difficulty: formData.multi_s3_testing_difficulty,
      multi_s3_comment: formData.multi_s3_comment,
      multi_s4_effort: formData.multi_s4_effort,
      multi_s4_change_radius: formData.multi_s4_change_radius,
      multi_s4_cognitive_load: formData.multi_s4_cognitive_load,
      multi_s4_consistency_risk: formData.multi_s4_consistency_risk,
      multi_s4_coordination_overhead: formData.multi_s4_coordination_overhead,
      multi_s4_rule_enforcement_difficulty:
        formData.multi_s4_rule_enforcement_difficulty,
      multi_s4_failure_handling_difficulty:
        formData.multi_s4_failure_handling_difficulty,
      multi_s4_preferred_implementation_approach:
        formData.multi_s4_preferred_implementation_approach,
      multi_s4_preferred_implementation_approach_other:
        formData.multi_s4_preferred_implementation_approach_other,
      multi_s4_comment: formData.multi_s4_comment,
    },
    comparative_evaluation: {
      overall_easier_architecture: formData.overall_easier_architecture,
      overall_less_effort_architecture:
        formData.overall_less_effort_architecture,
      overall_lower_cognitive_load_architecture:
        formData.overall_lower_cognitive_load_architecture,
      overall_lower_risk_architecture: formData.overall_lower_risk_architecture,
      overall_less_coordination_architecture:
        formData.overall_less_coordination_architecture,
      most_difficult_schema_change_type:
        formData.most_difficult_schema_change_type,
      most_difficult_schema_change_type_other:
        formData.most_difficult_schema_change_type_other,
      main_productivity_factor: formData.main_productivity_factor,
      main_productivity_factor_other: formData.main_productivity_factor_other,
      architecture_preference_reason: formData.architecture_preference_reason,
    },
    tooling_practices: {
      used_schema_tools_practices: joinArrayValue(
        formData.used_schema_tools_practices,
      ),
      used_schema_tools_practices_other:
        formData.used_schema_tools_practices_other,
      most_effective_migration_tooling:
        formData.most_effective_migration_tooling,
      most_effective_migration_tooling_other:
        formData.most_effective_migration_tooling_other,
      ai_tool_usage_frequency: formData.ai_tool_usage_frequency,
      ai_tool_supported_tasks: joinArrayValue(formData.ai_tool_supported_tasks),
      ai_tool_supported_tasks_other: formData.ai_tool_supported_tasks_other,
      ai_tool_trust_level: formData.ai_tool_trust_level,
      schema_change_checklist_usage: formData.schema_change_checklist_usage,
      organization_improvement_priority:
        formData.organization_improvement_priority,
      organization_improvement_priority_other:
        formData.organization_improvement_priority_other,
      tooling_gap_observation: formData.tooling_gap_observation,
    },
    managerial_delivery_impact: {
      schema_change_underestimation_frequency:
        formData.schema_change_underestimation_frequency,
      missed_planning_factors: joinArrayValue(formData.missed_planning_factors),
      missed_planning_factors_other: formData.missed_planning_factors_other,
      release_timeline_impact: formData.release_timeline_impact,
      delivery_confidence_impact: formData.delivery_confidence_impact,
      schema_change_estimation_owner: formData.schema_change_estimation_owner,
      delivery_risk_warning_signs: joinArrayValue(
        formData.delivery_risk_warning_signs,
      ),
      delivery_risk_warning_signs_other:
        formData.delivery_risk_warning_signs_other,
      recommended_estimation_buffer: formData.recommended_estimation_buffer,
      most_useful_managerial_metric: formData.most_useful_managerial_metric,
      most_useful_managerial_metric_other:
        formData.most_useful_managerial_metric_other,
      planning_resource_advice: formData.planning_resource_advice,
    },
    final_reflection: {
      biggest_hidden_cost: formData.biggest_hidden_cost,
      one_process_improvement: formData.one_process_improvement,
      additional_comments: formData.additional_comments,
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
