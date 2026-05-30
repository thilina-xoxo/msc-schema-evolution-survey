import CheckboxGroup from './CheckboxGroup'
import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const schemaChangeFrequencyOptions = [
  'Rarely',
  'Occasionally',
  'Frequently',
  'Very frequently',
  'I do not have enough experience to answer',
]

const schemaChangeTypeOptions = [
  'Adding a new field / column',
  'Renaming a field / column',
  'Removing a field / column',
  'Changing a field data type',
  'Splitting one entity / table / collection into multiple entities',
  'Merging entities / tables / collections',
  'Changing relationships between entities',
  'Migrating data from one database technology to another',
  'Updating API contracts due to schema changes',
  'Updating event/message payloads due to schema changes',
  'Updating search indexes due to schema changes',
  'Updating data warehouse / data lake pipelines due to schema changes',
  'Handling backward compatibility between old and new versions',
  'Handling old records with different structures',
  'I have not handled schema changes',
  'Other',
]

const difficultyFactorOptions = [
  'Understanding the existing data model',
  'Identifying affected services',
  'Identifying affected APIs',
  'Identifying affected event consumers',
  'Updating API contracts',
  'Updating event/message schemas',
  'Writing migration scripts',
  'Testing data migration',
  'Maintaining backward compatibility',
  'Coordinating with other developers or teams',
  'Handling old or inconsistent data records',
  'Lack of proper documentation',
  'Lack of automated migration tools',
  'Lack of automated tests',
  'Risk of breaking production',
  'Different databases requiring different skills',
  'Downstream analytics/reporting dependencies',
  'Unclear ownership of data or schema',
  'Other',
]

function OtherTextField({ id, label, value, error, onChange }) {
  return (
    <div className={`question nested ${error ? 'has-error' : ''}`}>
      <label className="question-label" htmlFor={id}>
        {label}
        <span className="required"> *</span>
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

function SchemaEvolutionExperience({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const experiencedSchemaChangeTypes =
    formData.experienced_schema_change_types || []
  const difficultyFactors = formData.schema_evolution_difficulty_factors || []

  return (
    <section>
      <h2>Section 4: General Experience with Schema Evolution</h2>
      <p className="section-intro">
        This section captures your general experience with schema evolution
        before the scenario-based questions.
      </p>
      <div className="info-box section-definition">
        <p>
          In this survey, schema evolution refers to changes in data structures
          used by software systems, including database schema changes, document
          structure changes, API response changes, event/message schema
          changes, search index changes, or analytical pipeline changes.
        </p>
      </div>

      <div className="question-section schema-experience-section">
        <SelectQuestion
          label="Q16. In your experience, how often do database schemas or data structures change during software development?"
          name="schema_change_frequency"
          value={formData.schema_change_frequency}
          options={schemaChangeFrequencyOptions}
          required
          onChange={onChange}
          error={errors.schema_change_frequency}
        />

        <CheckboxGroup
          label="Q17. Which types of schema or data structure changes have you experienced?"
          name="experienced_schema_change_types"
          values={experiencedSchemaChangeTypes}
          options={schemaChangeTypeOptions}
          required
          onChange={onChange}
          error={errors.experienced_schema_change_types}
        />
        {experiencedSchemaChangeTypes.includes('Other') && (
          <OtherTextField
            id="experienced_schema_change_types_other"
            label="Please specify the schema or data structure change type"
            value={formData.experienced_schema_change_types_other}
            error={errors.experienced_schema_change_types_other}
            onChange={onChange}
          />
        )}

        <CheckboxGroup
          label="Q18. In your experience, what usually makes schema evolution difficult?"
          name="schema_evolution_difficulty_factors"
          values={difficultyFactors}
          options={difficultyFactorOptions}
          required
          onChange={onChange}
          error={errors.schema_evolution_difficulty_factors}
        />
        {difficultyFactors.includes('Other') && (
          <OtherTextField
            id="schema_evolution_difficulty_factors_other"
            label="Please specify the difficulty factor"
            value={formData.schema_evolution_difficulty_factors_other}
            error={errors.schema_evolution_difficulty_factors_other}
            onChange={onChange}
          />
        )}

        <ScaleQuestion
          label="Q19. How much do schema changes affect developer productivity in microservice systems?"
          name="schema_change_productivity_impact"
          value={formData.schema_change_productivity_impact}
          required
          leftLabel="1 = No impact"
          rightLabel="5 = Very high impact"
          onChange={onChange}
          error={errors.schema_change_productivity_impact}
        />

        <ScaleQuestion
          label="Q20. How much mental effort is usually required to understand the full impact of a schema change?"
          name="schema_change_cognitive_load"
          value={formData.schema_change_cognitive_load}
          required
          leftLabel="1 = Very low effort"
          rightLabel="5 = Very high effort"
          onChange={onChange}
          error={errors.schema_change_cognitive_load}
        />

        <ScaleQuestion
          label="Q21. How much coordination is usually required when schema changes affect more than one service or team?"
          name="schema_change_coordination_overhead"
          value={formData.schema_change_coordination_overhead}
          required
          leftLabel="1 = Very low coordination"
          rightLabel="5 = Very high coordination"
          onChange={onChange}
          error={errors.schema_change_coordination_overhead}
        />
      </div>

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

export default SchemaEvolutionExperience
