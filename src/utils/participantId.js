const PARTICIPANT_ID_KEY = 'msc_schema_evolution_participant_id'

export function getParticipantId() {
  const existingParticipantId = localStorage.getItem(PARTICIPANT_ID_KEY)

  if (existingParticipantId) {
    return existingParticipantId
  }

  const participantId = crypto.randomUUID()
  localStorage.setItem(PARTICIPANT_ID_KEY, participantId)

  return participantId
}
