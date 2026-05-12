const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026';

const PARTICIPANT_BACKGROUND_SHEET = 'ParticipantBackground';
const ARCHITECTURE_CONTEXT_SHEET = 'ArchitectureContext';

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
