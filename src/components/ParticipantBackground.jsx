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

const totalExperienceOptions = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '6–8 years',
  '9–12 years',
  'More than 12 years',
]

const microserviceYearsOptions = [
  'No experience',
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  'More than 5 years',
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

const persistenceStrategyOptions = [
  'Mostly single relational database',
  'Database-per-service architecture',
  'Polyglot persistence using different databases for different services',
  'Multi-model database system',
  'Shared database across multiple services',
  'I am not sure',
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
        These questions help categorize responses by professional context and
        technical experience.
      </p>

      <SelectQuestion
        label="Q4. What is your current or most recent role?"
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

      <SelectQuestion
        label="Q5. How many years of software development or related technical experience do you have?"
        name="total_experience"
        value={formData.total_experience}
        options={totalExperienceOptions}
        required
        onChange={onChange}
        error={errors.total_experience}
      />

      <SelectQuestion
        label="Q6. How many years of experience do you have with microservice-based systems?"
        name="microservice_years"
        value={formData.microservice_years}
        options={microserviceYearsOptions}
        required
        onChange={onChange}
        error={errors.microservice_years}
      />

      <CheckboxGroup
        label="Q7. What type of systems have you mainly worked on?"
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
        label="Q8. Which database technologies have you used?"
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

      <SelectQuestion
        label="Q9. Which persistence strategy have you worked with most?"
        name="main_persistence_strategy"
        value={formData.main_persistence_strategy}
        options={persistenceStrategyOptions}
        required
        onChange={onChange}
        error={errors.main_persistence_strategy}
      />

      <ScaleQuestion
        label="Q10. How familiar are you with Polyglot Persistence?"
        name="polyglot_familiarity"
        value={formData.polyglot_familiarity}
        required
        leftLabel="1 = Not familiar at all"
        rightLabel="5 = Very familiar / used in real projects"
        onChange={onChange}
        error={errors.polyglot_familiarity}
      />

      <ScaleQuestion
        label="Q11. How familiar are you with Multi-Model Databases?"
        name="multimodel_familiarity"
        value={formData.multimodel_familiarity}
        required
        leftLabel="1 = Not familiar at all"
        rightLabel="5 = Very familiar / used in real projects"
        onChange={onChange}
        error={errors.multimodel_familiarity}
      />

      <ScaleQuestion
        label="Q12. How familiar are you with schema evolution or database migration activities?"
        name="schema_evolution_familiarity"
        value={formData.schema_evolution_familiarity}
        required
        leftLabel="1 = Not familiar"
        rightLabel="5 = Highly experienced"
        onChange={onChange}
        error={errors.schema_evolution_familiarity}
      />

      <SelectQuestion
        label="Q13. Have you personally handled database schema changes in a production or production-like system?"
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
