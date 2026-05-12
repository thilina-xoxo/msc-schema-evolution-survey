const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz9z5pdzJ9wp-umhtXPBACNU-7Qitxdw4Jm4jx8l8X7BP0gP31gQNsCY8EmRoQfO8_H/exec';
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
