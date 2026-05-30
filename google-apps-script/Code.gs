const SURVEY_TOKEN = 'msc_schema_evolution_survey_2026';

const PARTICIPANT_BACKGROUND_SHEET = 'participant_background';
const ARCHITECTURE_CONTEXT_SHEET = 'architecture_context';
const SCENARIO_POLYGLOT_SHEET = 'scenario_polyglot';
const SCENARIO_MULTIMODEL_SHEET = 'scenario_multimodel';
const COMPARATIVE_TOOLING_PRACTICES_SHEET = 'comparative_tooling_practices';
const SOFTWARE_DELIVERY_IMPACT_SHEET = 'software_delivery_impact';

const PARTICIPANT_BACKGROUND_HEADERS = [
  'timestamp',
  'participant_id',
  'technical_involvement',
  'current_role',
  'current_role_other',
  'system_types',
  'system_types_other',
  'database_technologies',
  'database_technologies_other',
  'schema_evolution_familiarity',
  'production_schema_change_experience',
];

const ARCHITECTURE_CONTEXT_HEADERS = [
  'timestamp',
  'participant_id',
  'architecture_difference_clarity',
];

const SCENARIO_POLYGLOT_HEADERS = [
  'timestamp',
  'participant_id',
  'polyglot_s1_effort_story_points',
  'polyglot_s1_mental_effort',
  'polyglot_s1_bug_data_risk',
  'polyglot_s1_coordination_overhead',
  'polyglot_s1_productivity_impact',
  'polyglot_s1_architecture_benefits',
  'polyglot_s1_architecture_challenges',
  'polyglot_s1_optional_comment',
  'polyglot_s2_effort_story_points',
  'polyglot_s2_mental_effort',
  'polyglot_s2_bug_data_risk',
  'polyglot_s2_coordination_overhead',
  'polyglot_s2_backward_compatibility_difficulty',
  'polyglot_s2_productivity_impact',
  'polyglot_s2_architecture_benefits',
  'polyglot_s2_architecture_challenges',
  'polyglot_s2_optional_comment',
];

const SCENARIO_MULTIMODEL_HEADERS = [
  'timestamp',
  'participant_id',
  'multimodel_s1_effort_story_points',
  'multimodel_s1_mental_effort',
  'multimodel_s1_bug_data_risk',
  'multimodel_s1_coordination_overhead',
  'multimodel_s1_productivity_impact',
  'multimodel_s1_architecture_benefits',
  'multimodel_s1_architecture_challenges',
  'multimodel_s1_optional_comment',
  'multimodel_s2_effort_story_points',
  'multimodel_s2_mental_effort',
  'multimodel_s2_bug_data_risk',
  'multimodel_s2_coordination_overhead',
  'multimodel_s2_backward_compatibility_difficulty',
  'multimodel_s2_productivity_impact',
  'multimodel_s2_architecture_benefits',
  'multimodel_s2_architecture_challenges',
  'multimodel_s2_optional_comment',
];

const COMPARATIVE_TOOLING_PRACTICES_HEADERS = [
  'timestamp',
  'participant_id',
  'architecture_tradeoff_view',
  'main_schema_evolution_difficulty_factors',
  'productivity_improving_practices',
  'useful_schema_tool_practices',
  'ai_tool_usage_for_schema_work',
  'ai_schema_usage_modes',
  'schema_productivity_practice_comment',
];

const SOFTWARE_DELIVERY_IMPACT_HEADERS = [
  'timestamp',
  'participant_id',
  'schema_delivery_effort_impact',
  'schema_affected_delivery_activities',
  'schema_delivery_risk_signals',
  'schema_delivery_confidence_actions',
  'schema_delivery_recommendation',
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
    const comparativeToolingPracticesSheet = getOrCreateSheet(
      spreadsheet,
      COMPARATIVE_TOOLING_PRACTICES_SHEET,
      COMPARATIVE_TOOLING_PRACTICES_HEADERS
    );
    const softwareDeliveryImpactSheet = getOrCreateSheet(
      spreadsheet,
      SOFTWARE_DELIVERY_IMPACT_SHEET,
      SOFTWARE_DELIVERY_IMPACT_HEADERS
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
    comparativeToolingPracticesSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.comparative_tooling_practices || {},
        COMPARATIVE_TOOLING_PRACTICES_HEADERS
      )
    );
    softwareDeliveryImpactSheet.appendRow(
      buildRow(
        timestamp,
        participantId,
        payload.software_delivery_impact || {},
        SOFTWARE_DELIVERY_IMPACT_HEADERS
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
  } else {
    const width = Math.max(sheet.getLastColumn(), headers.length);
    const currentHeaders = sheet.getRange(1, 1, 1, width).getValues()[0];
    const headersChanged =
      currentHeaders.length !== headers.length ||
      headers.some((header, index) => currentHeaders[index] !== header) ||
      currentHeaders.slice(headers.length).some((header) => header !== '');

    if (headersChanged) {
      sheet.getRange(1, 1, 1, width).clearContent();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
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
