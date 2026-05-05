const SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026'

export async function submitSurvey(formData) {
  const payload = {
    survey_token: SURVEY_TOKEN,
    ...formData,
    system_types: Array.isArray(formData.system_types)
      ? formData.system_types.join(', ')
      : formData.system_types,
    database_technologies: Array.isArray(formData.database_technologies)
      ? formData.database_technologies.join(', ')
      : formData.database_technologies,
  }

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(payload),
  })
}
