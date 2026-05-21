import CheckboxGroup from './CheckboxGroup'
import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const roleOptions = [
  'Intern / Trainee Software Engineer',
  'Associate / Junior Software Engineer',
  'Software Engineer',
  'Senior Software Engineer',
  'Tech Lead',
  'Software Architect',
  'DevOps Engineer / Platform Engineer',
  'Database Engineer / Data Engineer',
  'Engineering Manager / Delivery Manager',
  'Lecturer / Researcher',
  'Other',
]

const systemTypeOptions = [
  'Monolithic applications',
  'Microservice-based applications',
  'Serverless applications',
  'Cloud-native distributed systems',
  'Data-intensive systems',
  'Legacy modernization projects',
  'Event-driven systems',
  'I have mostly academic/project experience',
  'Other',
]

const databaseTechnologyOptions = [
  'MySQL',
  'PostgreSQL',
  'SQL Server',
  'Oracle Database',
  'MongoDB',
  'Cassandra',
  'DynamoDB',
  'Redis',
  'Neo4j',
  'Elasticsearch / OpenSearch',
  'ArangoDB',
  'Azure Cosmos DB',
  'Firebase / Firestore',
  'Other',
]

const schemaChangeOptions = [
  'Yes, many times',
  'Yes, a few times',
  'Only in development/testing environments',
  'Only academically',
  'No',
]

function ParticipantBackground({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 2 — Participant Background</h2>
      <p className="section-intro">
        This section collects only basic background information needed to
        interpret survey responses.
      </p>

      <SelectQuestion
        label="Q2. What best describes your current or most recent role?"
        name="current_role"
        value={formData.current_role}
        options={roleOptions}
        required
        onChange={onChange}
        error={errors.current_role}
      />
      {formData.current_role === 'Other' && (
        <div className={`question nested ${errors.current_role_other ? 'has-error' : ''}`}>
          <label className="question-label" htmlFor="current_role_other">
            Please specify your role<span className="required"> *</span>
          </label>
          <input
            id="current_role_other"
            name="current_role_other"
            type="text"
            value={formData.current_role_other}
            onChange={(event) => onChange('current_role_other', event.target.value)}
          />
          {errors.current_role_other && (
            <p className="error-message">{errors.current_role_other}</p>
          )}
        </div>
      )}

      <CheckboxGroup
        label="Q3. What types of systems have you worked with or studied?"
        name="system_types"
        values={formData.system_types}
        options={systemTypeOptions}
        required
        onChange={onChange}
        error={errors.system_types}
      />
      {formData.system_types.includes('Other') && (
        <div className={`question nested ${errors.system_types_other ? 'has-error' : ''}`}>
          <label className="question-label" htmlFor="system_types_other">
            Please specify the system type<span className="required"> *</span>
          </label>
          <input
            id="system_types_other"
            name="system_types_other"
            type="text"
            value={formData.system_types_other}
            onChange={(event) => onChange('system_types_other', event.target.value)}
          />
          {errors.system_types_other && (
            <p className="error-message">{errors.system_types_other}</p>
          )}
        </div>
      )}

      <CheckboxGroup
        label="Q4. Which database technologies have you used or studied?"
        name="database_technologies"
        values={formData.database_technologies}
        options={databaseTechnologyOptions}
        required
        onChange={onChange}
        error={errors.database_technologies}
      />
      {formData.database_technologies.includes('Other') && (
        <div
          className={`question nested ${
            errors.database_technologies_other ? 'has-error' : ''
          }`}
        >
          <label className="question-label" htmlFor="database_technologies_other">
            Please specify the database technology<span className="required"> *</span>
          </label>
          <input
            id="database_technologies_other"
            name="database_technologies_other"
            type="text"
            value={formData.database_technologies_other}
            onChange={(event) =>
              onChange('database_technologies_other', event.target.value)
            }
          />
          {errors.database_technologies_other && (
            <p className="error-message">{errors.database_technologies_other}</p>
          )}
        </div>
      )}

      <ScaleQuestion
        label="Q5. How familiar are you with schema evolution, database migration, or data structure changes?"
        name="schema_evolution_familiarity"
        value={formData.schema_evolution_familiarity}
        required
        leftLabel="1 = Not familiar"
        rightLabel="5 = Very familiar"
        onChange={onChange}
        error={errors.schema_evolution_familiarity}
      />

      <SelectQuestion
        label="Q6. Have you handled schema changes in production or production-like environments?"
        name="production_schema_change_experience"
        value={formData.production_schema_change_experience}
        options={schemaChangeOptions}
        required
        onChange={onChange}
        error={errors.production_schema_change_experience}
      />

      <div className="button-row split">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back
        </button>
        <button type="button" className="primary-button" onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  )
}

export default ParticipantBackground
