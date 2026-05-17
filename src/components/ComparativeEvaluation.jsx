import SelectQuestion from './SelectQuestion'

const architectureOptions = [
  'Architecture A — Polyglot Persistence',
  'Architecture B — Multi-Model Persistence',
]

const overallSimilarOptions = [
  ...architectureOptions,
  'Both are similar',
  'It depends on the type of schema change',
  'I am not sure',
]

const effortOptions = [
  ...architectureOptions,
  'Both require similar effort',
  'It depends on the scenario',
  'I am not sure',
]

const cognitiveLoadOptions = [
  ...architectureOptions,
  'Both create similar cognitive load',
  'It depends on developer experience',
  'I am not sure',
]

const riskOptions = [
  ...architectureOptions,
  'Both have similar risk',
  'It depends on the type of change',
  'I am not sure',
]

const coordinationOptions = [
  ...architectureOptions,
  'Both require similar coordination',
  'It depends on service boundaries',
  'I am not sure',
]

const difficultChangeOptions = [
  'Adding a new optional field',
  'Renaming or removing a field',
  'Changing a field data type',
  'Splitting an entity or document',
  'Merging entities or documents',
  'Changing identifiers used across services',
  'Enforcing cross-service consistency rules',
  'Updating event/message schemas',
  'Updating analytics/data warehouse pipelines',
  'Handling backward compatibility',
  'I am not sure',
  'Other',
]

const productivityFactorOptions = [
  'Number of services or teams affected',
  'Number of databases or data models affected',
  'Complexity of data migration',
  'Need for backward compatibility',
  'Lack of documentation',
  'Lack of automated tests',
  'Lack of migration tooling',
  'Event/message schema compatibility',
  'Cross-team coordination',
  'Risk of production failure',
  'Analytics/reporting dependencies',
  'I am not sure',
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

function TextareaQuestion({ label, name, value, onChange, placeholder }) {
  return (
    <div className="question">
      <label className="question-label" htmlFor={name}>
        {label}
        <span className="optional-label">Optional</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows="4"
      />
    </div>
  )
}

function QuestionGroup({ title, children }) {
  return (
    <div className="comparison-group">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function ComparativeEvaluation({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 6 — Comparative Evaluation of Polyglot and Multi-Model Persistence</h2>
      <p className="section-intro">
        This section asks you to compare Polyglot Persistence and Multi-Model
        Persistence after evaluating the same schema evolution scenarios under
        both architectures. This helps compare how the two persistence
        strategies affect developer effort, cognitive load, risk, coordination,
        and overall maintainability during schema evolution.
      </p>

      <div className="comparison-section">
        <QuestionGroup title="Overall architecture comparison">
          <SelectQuestion label="Q82. Based on all scenarios, which architecture seems easier for schema evolution overall?" name="overall_easier_architecture" value={formData.overall_easier_architecture} options={overallSimilarOptions} required onChange={onChange} error={errors.overall_easier_architecture} />
          <SelectQuestion label="Q83. Which architecture seems to require less developer effort overall?" name="overall_less_effort_architecture" value={formData.overall_less_effort_architecture} options={effortOptions} required onChange={onChange} error={errors.overall_less_effort_architecture} />
          <SelectQuestion label="Q84. Which architecture seems to create lower cognitive load for developers?" name="overall_lower_cognitive_load_architecture" value={formData.overall_lower_cognitive_load_architecture} options={cognitiveLoadOptions} required onChange={onChange} error={errors.overall_lower_cognitive_load_architecture} />
          <SelectQuestion label="Q85. Which architecture seems to have lower risk during schema changes?" name="overall_lower_risk_architecture" value={formData.overall_lower_risk_architecture} options={riskOptions} required onChange={onChange} error={errors.overall_lower_risk_architecture} />
          <SelectQuestion label="Q86. Which architecture seems to require less coordination between teams?" name="overall_less_coordination_architecture" value={formData.overall_less_coordination_architecture} options={coordinationOptions} required onChange={onChange} error={errors.overall_less_coordination_architecture} />
        </QuestionGroup>

        <QuestionGroup title="Difficulty and productivity factors">
          <SelectQuestion label="Q87. In your opinion, which type of schema evolution change is most difficult?" name="most_difficult_schema_change_type" value={formData.most_difficult_schema_change_type} options={difficultChangeOptions} required onChange={onChange} error={errors.most_difficult_schema_change_type} />
          {formData.most_difficult_schema_change_type === 'Other' && (
            <OtherTextField id="most_difficult_schema_change_type_other" label="Please specify the most difficult schema evolution change type" value={formData.most_difficult_schema_change_type_other} error={errors.most_difficult_schema_change_type_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q88. Which factor most strongly affects developer productivity during schema evolution?" name="main_productivity_factor" value={formData.main_productivity_factor} options={productivityFactorOptions} required onChange={onChange} error={errors.main_productivity_factor} />
          {formData.main_productivity_factor === 'Other' && (
            <OtherTextField id="main_productivity_factor_other" label="Please specify the productivity factor" value={formData.main_productivity_factor_other} error={errors.main_productivity_factor_other} onChange={onChange} />
          )}
          <TextareaQuestion label="Q89. Optional: Briefly explain why you prefer one architecture over the other for schema evolution." name="architecture_preference_reason" value={formData.architecture_preference_reason} onChange={onChange} placeholder="You may refer to developer effort, cognitive load, migration complexity, tooling, coordination, risk, or maintainability." />
        </QuestionGroup>
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

export default ComparativeEvaluation
