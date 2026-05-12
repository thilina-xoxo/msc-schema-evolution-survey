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

const impactLayerOptions = [
  'Operational database',
  'Application/service code',
  'API request/response contracts',
  'Event/message schemas',
  'Search index',
  'Cache/session data',
  'Data warehouse / data lake / lakehouse',
  'BI dashboards or reports',
  'ML feature datasets',
  'Automated tests',
  'CI/CD deployment pipeline',
  'Monitoring or alerting',
  'Documentation',
  'I am not sure',
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

const relativeRiskOptions = [
  'Much less risky',
  'Slightly less risky',
  'About the same risk',
  'Slightly more risky',
  'Much more risky',
  'I am not sure',
]

const delayReasonOptions = [
  'Data migration takes longer than expected',
  'More services are affected than expected',
  'API compatibility issues appear late',
  'Event/message compatibility issues appear late',
  'Testing effort is underestimated',
  'Coordination between teams takes time',
  'Production risk causes delays',
  'Analytics/reporting dependencies are discovered late',
  'Lack of clear ownership',
  'I have not observed this',
  'Other',
]

const persistenceStrategyOptions = [
  'Polyglot Persistence',
  'Multi-Model Database',
  'Both are similar',
  'It depends on the scenario',
  'I am not sure',
]

const helpfulPracticeOptions = [
  'Clear API versioning',
  'Event schema versioning',
  'Automated migration scripts',
  'Automated regression tests',
  'Contract testing',
  'Feature flags',
  'Backward-compatible changes',
  'Blue-green or canary deployment',
  'Database rollback plan',
  'Better documentation',
  'Early involvement of senior engineers/architects',
  'Cross-team planning meetings',
  'AI-assisted development tools',
  'I have not used any specific practice',
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
  return (
    <section>
      <h2>Section 4 — General Experience with Schema Evolution</h2>
      <p className="section-intro">
        This section collects your general experience with schema evolution,
        database migration, API changes, event payload changes, and downstream
        data impacts in software systems.
      </p>
      <div className="info-box section-definition">
        <p>
          In this survey, schema evolution refers to changes in data structures
          used by software systems. These may include database schema changes,
          document structure changes, API response changes, event/message schema
          changes, search index changes, or analytical pipeline changes.
        </p>
      </div>

      <div className="question-section schema-experience-section">
        <SelectQuestion
          label="Q22. In your experience, how often do database schemas or data structures change during software development?"
          name="schema_change_frequency"
          value={formData.schema_change_frequency}
          options={schemaChangeFrequencyOptions}
          required
          onChange={onChange}
          error={errors.schema_change_frequency}
        />

        <CheckboxGroup
          label="Q23. Which types of schema or data structure changes have you experienced?"
          name="experienced_schema_change_types"
          values={formData.experienced_schema_change_types}
          options={schemaChangeTypeOptions}
          required
          onChange={onChange}
          error={errors.experienced_schema_change_types}
        />
        {formData.experienced_schema_change_types.includes('Other') && (
          <OtherTextField
            id="experienced_schema_change_types_other"
            label="Please specify the schema or data structure change type"
            value={formData.experienced_schema_change_types_other}
            error={errors.experienced_schema_change_types_other}
            onChange={onChange}
          />
        )}

        <CheckboxGroup
          label="Q24. In which layers have you seen schema evolution create impact?"
          name="schema_change_impact_layers"
          values={formData.schema_change_impact_layers}
          options={impactLayerOptions}
          required
          onChange={onChange}
          error={errors.schema_change_impact_layers}
        />
        {formData.schema_change_impact_layers.includes('Other') && (
          <OtherTextField
            id="schema_change_impact_layers_other"
            label="Please specify the impacted layer"
            value={formData.schema_change_impact_layers_other}
            error={errors.schema_change_impact_layers_other}
            onChange={onChange}
          />
        )}

        <CheckboxGroup
          label="Q25. In your experience, what usually makes schema evolution difficult?"
          name="schema_evolution_difficulty_factors"
          values={formData.schema_evolution_difficulty_factors}
          options={difficultyFactorOptions}
          required
          onChange={onChange}
          error={errors.schema_evolution_difficulty_factors}
        />
        {formData.schema_evolution_difficulty_factors.includes('Other') && (
          <OtherTextField
            id="schema_evolution_difficulty_factors_other"
            label="Please specify the difficulty factor"
            value={formData.schema_evolution_difficulty_factors_other}
            error={errors.schema_evolution_difficulty_factors_other}
            onChange={onChange}
          />
        )}

        <ScaleQuestion
          label="Q26. How much do schema changes affect developer productivity in microservice systems?"
          name="schema_change_productivity_impact"
          value={formData.schema_change_productivity_impact}
          required
          leftLabel="1 = Very low impact"
          rightLabel="5 = Very high impact"
          onChange={onChange}
          error={errors.schema_change_productivity_impact}
        />

        <ScaleQuestion
          label="Q27. How much mental effort is usually required to understand the full impact of a schema change?"
          name="schema_change_cognitive_load"
          value={formData.schema_change_cognitive_load}
          required
          leftLabel="1 = Very low mental effort"
          rightLabel="5 = Very high mental effort"
          onChange={onChange}
          error={errors.schema_change_cognitive_load}
        />

        <ScaleQuestion
          label="Q28. How much coordination is usually required when schema changes affect more than one service or team?"
          name="schema_change_coordination_overhead"
          value={formData.schema_change_coordination_overhead}
          required
          leftLabel="1 = Very low coordination"
          rightLabel="5 = Very high coordination"
          onChange={onChange}
          error={errors.schema_change_coordination_overhead}
        />

        <SelectQuestion
          label="Q29. How risky are schema changes compared to normal application logic changes?"
          name="schema_change_relative_risk"
          value={formData.schema_change_relative_risk}
          options={relativeRiskOptions}
          required
          onChange={onChange}
          error={errors.schema_change_relative_risk}
        />

        <SelectQuestion
          label="Q30. What is the most common reason schema changes become delayed or underestimated?"
          name="schema_change_delay_reason"
          value={formData.schema_change_delay_reason}
          options={delayReasonOptions}
          required
          onChange={onChange}
          error={errors.schema_change_delay_reason}
        />
        {formData.schema_change_delay_reason === 'Other' && (
          <OtherTextField
            id="schema_change_delay_reason_other"
            label="Please specify the delay or underestimation reason"
            value={formData.schema_change_delay_reason_other}
            error={errors.schema_change_delay_reason_other}
            onChange={onChange}
          />
        )}

        <SelectQuestion
          label="Q31. In your opinion, which persistence strategy is generally easier to maintain during schema evolution?"
          name="easier_persistence_strategy_general"
          value={formData.easier_persistence_strategy_general}
          options={persistenceStrategyOptions}
          required
          onChange={onChange}
          error={errors.easier_persistence_strategy_general}
        />

        <div className="question">
          <label
            className="question-label"
            htmlFor="easier_persistence_strategy_reason"
          >
            Q32. Why do you think that persistence strategy is easier or harder
            to maintain?
            <span className="optional-label"> Optional</span>
          </label>
          <textarea
            id="easier_persistence_strategy_reason"
            name="easier_persistence_strategy_reason"
            value={formData.easier_persistence_strategy_reason}
            onChange={(event) =>
              onChange('easier_persistence_strategy_reason', event.target.value)
            }
            rows="5"
          />
        </div>

        <SelectQuestion
          label="Q33. Which practice has helped you most when handling schema evolution?"
          name="most_helpful_schema_practice"
          value={formData.most_helpful_schema_practice}
          options={helpfulPracticeOptions}
          required
          onChange={onChange}
          error={errors.most_helpful_schema_practice}
        />
        {formData.most_helpful_schema_practice === 'Other' && (
          <OtherTextField
            id="most_helpful_schema_practice_other"
            label="Please specify the helpful schema evolution practice"
            value={formData.most_helpful_schema_practice_other}
            error={errors.most_helpful_schema_practice_other}
            onChange={onChange}
          />
        )}

        <div className="question">
          <label
            className="question-label"
            htmlFor="schema_evolution_experience_example"
          >
            Q34. Briefly describe one schema evolution challenge you have
            personally experienced or observed.
            <span className="optional-label"> Optional</span>
          </label>
          <textarea
            id="schema_evolution_experience_example"
            name="schema_evolution_experience_example"
            value={formData.schema_evolution_experience_example}
            onChange={(event) =>
              onChange('schema_evolution_experience_example', event.target.value)
            }
            placeholder="Example: a field type change, API contract break, failed migration, reporting issue, event schema mismatch, or production defect."
            rows="5"
          />
        </div>
      </div>

      <div className="button-row split">
        <button
          type="button"
          className="secondary-button"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default SchemaEvolutionExperience
