import SelectQuestion from './SelectQuestion'

const tradeoffOptions = [
  'Polyglot Persistence is useful when services need specialized databases',
  'Multi-Model Persistence is useful when unified governance and tooling are important',
  'Clear service ownership is more important than the database strategy itself',
  'Both approaches become difficult when schema changes cross many teams or services',
  'The better approach depends on the type and complexity of the schema change',
  'Team skills and operational maturity strongly influence success',
  'I am not sure',
]

const difficultyOptions = [
  'Unclear service or data ownership',
  'Too many affected services or teams',
  'Backward compatibility requirements',
  'Data migration complexity',
  'API or event schema compatibility',
  'Weak automated testing or validation',
  'Production rollback difficulty',
]

const productivityOptions = [
  'Clear data ownership and service boundaries',
  'Early impact analysis before implementation',
  'API and event schema versioning',
  'Automated migration and validation scripts',
  'Automated regression and contract testing',
  'Feature flags, phased rollout, or rollback planning',
  'Schema change checklist or review process',
]

const toolPracticeOptions = [
  'Database migration tools',
  'Custom migration scripts',
  'CI/CD migration automation',
  'API or event versioning tools',
  'Contract and regression testing',
  'Data validation or data quality checks',
  'Documentation, checklists, or architecture decision records',
]

const aiUsageOptions = [
  'Yes, frequently',
  'Yes, occasionally',
  'Tried once or twice',
  'No, but I would consider it',
  'No, and I would not prefer it',
]

const aiModeOptions = [
  'Understand existing schemas, data models, or dependencies',
  'Generate draft migration scripts or transformation logic',
  'Identify possible API, event, or downstream impacts',
  'Generate test cases or data validation queries',
  'Suggest backward compatibility or rollout strategies',
  'Create documentation, checklists, or review notes',
  'I would not use AI tools for schema evolution work',
]

function LimitedCheckboxGroup({
  label,
  name,
  values = [],
  options,
  required,
  helper,
  maxSelections = 5,
  onChange,
  error,
}) {
  function handleChange(option) {
    if (!values.includes(option) && values.length >= maxSelections) {
      return
    }

    const nextValues = values.includes(option)
      ? values.filter((value) => value !== option)
      : [...values, option]

    onChange(name, nextValues)
  }

  return (
    <fieldset className={`question ${error ? 'has-error' : ''}`}>
      <legend>
        {label}
        {required && <span className="required"> *</span>}
      </legend>
      {helper && <p className="question-helper">{helper}</p>}
      <div className="option-list checkbox-grid">
        {options.map((option) => (
          <label className="choice" key={option}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              disabled={
                !values.includes(option) && values.length >= maxSelections
              }
              onChange={() => handleChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {values.length >= maxSelections && (
        <p className="question-helper">
          You can select up to {maxSelections} options.
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
    </fieldset>
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
        placeholder={placeholder}
        rows="4"
        onChange={(event) => onChange(name, event.target.value)}
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

function ComparativeToolingPractices({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 5: Architecture Trade-offs, Tooling, and Productivity Practices</h2>
      <p className="section-intro">
        Reflect on the schema evolution trade-offs observed across Polyglot
        Persistence and Multi-Model Persistence.
      </p>
      <p className="section-intro">
        The focus is on the factors, tools, practices, and AI-assisted support
        that can lower implementation effort, risk, and coordination overhead.
      </p>

      <div className="comparison-section">
        <QuestionGroup title="Architecture trade-offs and difficulty factors">
          <LimitedCheckboxGroup
            label="Q42. Which statements best match your view of Polyglot vs Multi-Model Persistence during schema evolution?"
            name="architecture_tradeoff_view"
            values={formData.architecture_tradeoff_view}
            options={tradeoffOptions}
            required
            helper="Select up to 3 options."
            maxSelections={3}
            onChange={onChange}
            error={errors.architecture_tradeoff_view}
          />
          <LimitedCheckboxGroup
            label="Q43. Which factors most increase schema evolution difficulty in microservice systems?"
            name="main_schema_evolution_difficulty_factors"
            values={formData.main_schema_evolution_difficulty_factors}
            options={difficultyOptions}
            required
            helper="Select up to 3 options."
            maxSelections={3}
            onChange={onChange}
            error={errors.main_schema_evolution_difficulty_factors}
          />
        </QuestionGroup>

        <QuestionGroup title="Productivity practices and tooling">
          <LimitedCheckboxGroup
            label="Q44. Which practices can most improve developer productivity during schema evolution?"
            name="productivity_improving_practices"
            values={formData.productivity_improving_practices}
            options={productivityOptions}
            required
            helper="Select up to 3 options."
            maxSelections={3}
            onChange={onChange}
            error={errors.productivity_improving_practices}
          />
          <LimitedCheckboxGroup
            label="Q45. Which tool or practice categories are most useful for schema evolution?"
            name="useful_schema_tool_practices"
            values={formData.useful_schema_tool_practices}
            options={toolPracticeOptions}
            required
            helper="Select up to 3 options."
            maxSelections={3}
            onChange={onChange}
            error={errors.useful_schema_tool_practices}
          />
        </QuestionGroup>

        <QuestionGroup title="AI-assisted support">
          <SelectQuestion
            label="Q46. Have you used AI tools to support schema migration, database changes, or related development work?"
            name="ai_tool_usage_for_schema_work"
            value={formData.ai_tool_usage_for_schema_work}
            options={aiUsageOptions}
            required
            onChange={onChange}
            error={errors.ai_tool_usage_for_schema_work}
          />
          <LimitedCheckboxGroup
            label="Q47. How would you most likely use AI tools during schema evolution work?"
            name="ai_schema_usage_modes"
            values={formData.ai_schema_usage_modes}
            options={aiModeOptions}
            required
            helper="Select up to 3 options."
            maxSelections={3}
            onChange={onChange}
            error={errors.ai_schema_usage_modes}
          />
          <TextareaQuestion
            label="Q48. Optional: What is one practical practice, tool, or workflow that can reduce schema evolution effort or risk?"
            name="schema_productivity_practice_comment"
            value={formData.schema_productivity_practice_comment}
            onChange={onChange}
            placeholder="You may mention migration tooling, API/event versioning, testing, rollback planning, documentation, AI support, team communication, or review processes."
          />
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

export default ComparativeToolingPractices
