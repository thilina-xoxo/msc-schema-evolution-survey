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
  'It depends on the developer’s experience',
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

const migrationOptions = [
  ...architectureOptions,
  'Both are similar',
  'It depends on the data model and change type',
  'I am not sure',
]

const testingOptions = [
  ...architectureOptions,
  'Both are similar',
  'It depends on test coverage and tooling',
  'I am not sure',
]

const scenarioSuitabilityOptions = [
  ...architectureOptions,
  'Both are equally suitable',
  'It depends on implementation',
  'I am not sure',
]

const crossServiceOptions = [
  ...architectureOptions,
  'Both are equally suitable',
  'It depends on service design',
  'I am not sure',
]

const difficultChangeOptions = [
  'Adding a new optional field',
  'Renaming a field',
  'Removing a field',
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
  'Number of services affected',
  'Number of databases or data models affected',
  'Complexity of data migration',
  'Need for backward compatibility',
  'Lack of documentation',
  'Lack of automated tests',
  'Lack of migration tooling',
  'Event/message schema compatibility',
  'Cross-team coordination',
  'Risk of production failure',
  'Developer experience level',
  'Complexity of business requirement',
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
        <span className="optional-label"> Optional</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows="5"
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
  onSubmit,
  isSubmitting,
  submissionError,
}) {
  return (
    <section>
      <h2>Section 6 — Comparative Evaluation of Polyglot and Multi-Model Persistence</h2>
      <p className="section-intro">
        This section asks you to compare Architecture A — Polyglot Persistence
        and Architecture B — Multi-Model Persistence after evaluating the same
        schema evolution scenarios under both architectures.
      </p>
      <p className="section-intro">
        The purpose is not to decide that one architecture is always better.
        Instead, this section captures how practitioners compare both
        approaches in terms of developer effort, cognitive load, coordination
        overhead, risk, migration difficulty, testing complexity, tooling
        support, and delivery planning.
      </p>

      <div className="comparison-reminder">
        <div>
          <h3>Architecture A — Polyglot Persistence</h3>
          <p>
            Different operational database technologies are used by different
            services. This may provide strong technology specialization but can
            increase technology diversity, migration complexity, and
            cross-database coordination.
          </p>
        </div>
        <div>
          <h3>Architecture B — Multi-Model Persistence</h3>
          <p>
            A unified operational persistence platform supports multiple data
            models such as document, relational/tabular, graph, and key-value.
            This may reduce operational fragmentation but can introduce
            shared-platform governance and logical coupling concerns.
          </p>
        </div>
      </div>

      <div className="comparison-section">
        <QuestionGroup title="1. Overall comparison">
          <SelectQuestion label="Q109. Based on all scenarios, which architecture seems easier for schema evolution overall?" name="overall_easier_architecture" value={formData.overall_easier_architecture} options={overallSimilarOptions} required onChange={onChange} error={errors.overall_easier_architecture} />
          <SelectQuestion label="Q110. Which architecture seems to require less developer effort overall?" name="overall_less_effort_architecture" value={formData.overall_less_effort_architecture} options={effortOptions} required onChange={onChange} error={errors.overall_less_effort_architecture} />
          <SelectQuestion label="Q111. Which architecture seems to create lower cognitive load for developers?" name="overall_lower_cognitive_load_architecture" value={formData.overall_lower_cognitive_load_architecture} options={cognitiveLoadOptions} required onChange={onChange} error={errors.overall_lower_cognitive_load_architecture} />
          <SelectQuestion label="Q112. Which architecture seems to have lower risk during schema changes?" name="overall_lower_risk_architecture" value={formData.overall_lower_risk_architecture} options={riskOptions} required onChange={onChange} error={errors.overall_lower_risk_architecture} />
          <SelectQuestion label="Q113. Which architecture seems to require less coordination between teams?" name="overall_less_coordination_architecture" value={formData.overall_less_coordination_architecture} options={coordinationOptions} required onChange={onChange} error={errors.overall_less_coordination_architecture} />
          <SelectQuestion label="Q114. Which architecture seems easier for data migration activities?" name="overall_easier_migration_architecture" value={formData.overall_easier_migration_architecture} options={migrationOptions} required onChange={onChange} error={errors.overall_easier_migration_architecture} />
          <SelectQuestion label="Q115. Which architecture seems easier for testing and validation?" name="overall_easier_testing_architecture" value={formData.overall_easier_testing_architecture} options={testingOptions} required onChange={onChange} error={errors.overall_easier_testing_architecture} />
        </QuestionGroup>

        <QuestionGroup title="2. Scenario-specific comparison">
          <SelectQuestion label="Q116. For low-complexity changes such as adding optional profile fields, which architecture seems more suitable?" name="best_architecture_low_complexity" value={formData.best_architecture_low_complexity} options={scenarioSuitabilityOptions} required onChange={onChange} error={errors.best_architecture_low_complexity} />
          <SelectQuestion label="Q117. For breaking changes such as changing product_id from Integer to UUID, which architecture seems more suitable?" name="best_architecture_breaking_change" value={formData.best_architecture_breaking_change} options={scenarioSuitabilityOptions} required onChange={onChange} error={errors.best_architecture_breaking_change} />
          <SelectQuestion label="Q118. For structural changes such as splitting customer profile data, which architecture seems more suitable?" name="best_architecture_structural_change" value={formData.best_architecture_structural_change} options={scenarioSuitabilityOptions} required onChange={onChange} error={errors.best_architecture_structural_change} />
          <SelectQuestion label="Q119. For cross-service business rules such as preventing customer deletion when pending orders exist, which architecture seems more suitable?" name="best_architecture_cross_service_rule" value={formData.best_architecture_cross_service_rule} options={crossServiceOptions} required onChange={onChange} error={errors.best_architecture_cross_service_rule} />
        </QuestionGroup>

        <QuestionGroup title="3. Difficulty and productivity factors">
          <SelectQuestion label="Q120. In your opinion, which type of schema evolution change is most difficult?" name="most_difficult_schema_change_type" value={formData.most_difficult_schema_change_type} options={difficultChangeOptions} required onChange={onChange} error={errors.most_difficult_schema_change_type} />
          {formData.most_difficult_schema_change_type === 'Other' && (
            <OtherTextField id="most_difficult_schema_change_type_other" label="Please specify the most difficult schema evolution change type" value={formData.most_difficult_schema_change_type_other} error={errors.most_difficult_schema_change_type_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q121. Which factor most strongly affects developer productivity during schema evolution?" name="main_productivity_factor" value={formData.main_productivity_factor} options={productivityFactorOptions} required onChange={onChange} error={errors.main_productivity_factor} />
          {formData.main_productivity_factor === 'Other' && (
            <OtherTextField id="main_productivity_factor_other" label="Please specify the productivity factor" value={formData.main_productivity_factor_other} error={errors.main_productivity_factor_other} onChange={onChange} />
          )}
        </QuestionGroup>

        <QuestionGroup title="4. Open-ended recommendations">
          <TextareaQuestion label="Q122. Briefly explain why you prefer one architecture over the other for schema evolution." name="architecture_preference_reason" value={formData.architecture_preference_reason} onChange={onChange} placeholder="You may refer to developer effort, cognitive load, migration complexity, tooling, coordination, risk, or delivery planning." />
          <TextareaQuestion label="Q123. What recommendation would you give to technical leads or delivery managers when planning schema evolution work in these architectures?" name="decision_recommendation_for_leads" value={formData.decision_recommendation_for_leads} onChange={onChange} placeholder="For example: involve architects early, plan backward compatibility, identify downstream systems, create migration checklists, validate event schemas, or allocate extra testing time." />
        </QuestionGroup>
      </div>

      {submissionError && <p className="form-error">{submissionError}</p>}

      <div className="button-row split">
        <button type="button" className="secondary-button" onClick={onBack} disabled={isSubmitting}>
          Back
        </button>
        <button type="button" className="primary-button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Current Response'}
        </button>
      </div>
    </section>
  )
}

export default ComparativeEvaluation
