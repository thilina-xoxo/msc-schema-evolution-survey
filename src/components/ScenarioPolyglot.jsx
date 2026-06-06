import ScaleQuestion from './ScaleQuestion'

const s1BenefitOptions = [
  'Right database for the right data model.',
  'Mature tooling for schema migrations.',
  'Clear ownership within the Catalogue Intelligence Team boundary.',
  'Separate evolution of database, service, and API changes.',
  'Flexibility to update structured and document data independently.',
  'No clear benefit from Polyglot Persistence in this scenario.',
]

const s1ChallengeOptions = [
  'Coordinating database, service, and API changes together.',
  'Keeping relational and document data consistent.',
  'Testing changes across databases, services, and sync pipelines.',
  'Managing deployment order and backward compatibility.',
  'Debugging issues across multiple technologies and layers.',
  'No clear disadvantage from Polyglot Persistence in this scenario.',
]

const multiS1BenefitOptions = [
  'One database platform for multiple data models.',
  'Mature platform tooling for schema and model changes.',
  'Clear ownership within the Catalogue Intelligence Team boundary.',
  'Simpler coordination across database, service, and API changes.',
  'Lower operational overhead for deployment, monitoring, and backup.',
  'No clear benefit from Multi-Model Persistence in this scenario.',
]

const multiS1ChallengeOptions = [
  'Defining clear boundaries between relational and document models.',
  'Managing consistency between multiple models in one platform.',
  'Testing changes across models, services, and sync pipelines.',
  'Risk of hidden coupling inside the shared database platform.',
  'Limitations in complex joins, queries, or document aggregations.',
  'No clear disadvantage from Multi-Model Persistence in this scenario.',
]

function NumericQuestion({
  label,
  name,
  value,
  required,
  helper,
  onChange,
  error,
}) {
  return (
    <div className={`question ${error ? 'has-error' : ''}`}>
      <label className="question-label" htmlFor={name}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {helper && <p className="question-helper">{helper}</p>}
      <input
        id={name}
        name={name}
        type="number"
        min="1"
        step="0.5"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

function LimitedCheckboxGroup({
  label,
  name,
  values = [],
  options,
  required,
  helper,
  exclusiveOption,
  onChange,
  error,
}) {
  function handleChange(option) {
    if (!values.includes(option) && option === exclusiveOption) {
      onChange(name, [option])
      return
    }

    if (!values.includes(option) && values.length >= 3) {
      return
    }

    const nextValues = values.includes(option)
      ? values.filter((value) => value !== option)
      : [...values.filter((value) => value !== exclusiveOption), option]

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
                !values.includes(option) &&
                values.length >= 3 &&
                option !== exclusiveOption
              }
              onChange={() => handleChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </fieldset>
  )
}

function ScenarioCard({ title, complexity, scope, children }) {
  return (
    <article className="scenario-card">
      {(title || complexity) && (
        <div className="scenario-card-header">
          {title && <h3>{title}</h3>}
          {complexity && <span className="complexity-badge">{complexity}</span>}
        </div>
      )}
      {scope && <p className="scenario-scope">{scope}</p>}
      {children}
    </article>
  )
}

function ScenarioPolyglot({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 4: Scenario-Based Evaluation of Persistence Strategies</h2>
      <p className="section-intro">
        This section asks you to evaluate schema evolution tasks under Polyglot
        and Multi-Model persistence strategies.
      </p>

      <div className="scenario-list">
        <ScenarioCard
          title="Scenario 4.1: Catalogue Enrichment for Regional Product Experience"
          complexity="Complexity: Medium"
          scope="Scope: Mainly within one domain/team"
        >
          <div className="scenario-description">
            <p>
              ModaVista wants to launch region-specific product pages for
              different EU markets, such as Germany, France, Italy, and Spain.
              For example, the same product may need different display content,
              size guidance, and enrichment details depending on the customer’s
              region.
            </p>
            <p>
              To support this business requirement using a Polyglot Persistence
              architecture, the Catalogue Intelligence Team (CAT) updates
              PostgreSQL and MongoDB within its bounded context.
            </p>
            <p>
              1. Database Migrations: Relational and Document
            </p>
            <p>
              The Catalogue Intelligence Team (CAT) deploys a new
              product_region_profile table to PostgreSQL and extends enrichment
              documents in MongoDB.
            </p>
            <p>
              These migrations are backward-compatible to ensure existing
              services do not crash during the data layer transition.
            </p>
            <p>2. Internal Service Layer Updates</p>
            <p>
              Update internal code, repositories, and APIs within the CAT Team
              boundary to read and write the new regional fields.
            </p>
            <p>
              This affects approximately 4-6 internal components that must be
              redeployed to recognize the updated schema.
            </p>
            <p>3. Sync Pipelines and Event Schema</p>
            <p>
              Modify the CAT Team synchronization and indexing jobs to align
              data between the PostgreSQL and MongoDB stores.
            </p>
            <p>
              Update the outbound catalogue event schema to broadcast regional
              product updates to the rest of the business.
            </p>
          </div>

          <div className="scenario-questions">
            <NumericQuestion
              label="Q15. Estimated total implementation effort for this scenario"
              name="polyglot_s1_effort_story_points"
              value={formData.polyglot_s1_effort_story_points}
              required
              helper="Enter your estimate in story points. Assume 1 story point = approximately 1 working day of engineering effort. Estimate the total effort across the affected Catalogue Intelligence Team scope, not only one small service. Include PostgreSQL schema changes, MongoDB document changes, API/event updates, migration, testing, validation, and deployment effort."
              onChange={onChange}
              error={errors.polyglot_s1_effort_story_points}
            />
            <ScaleQuestion
              label="Q16. How much mental effort is required to understand the full impact of this change?"
              name="polyglot_s1_mental_effort"
              value={formData.polyglot_s1_mental_effort}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.polyglot_s1_mental_effort}
            />
            <ScaleQuestion
              label="Q17. How high is the risk of bugs or data issues?"
              name="polyglot_s1_bug_data_risk"
              value={formData.polyglot_s1_bug_data_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.polyglot_s1_bug_data_risk}
            />
            <ScaleQuestion
              label="Q18. How much coordination overhead is likely required?"
              name="polyglot_s1_coordination_overhead"
              value={formData.polyglot_s1_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.polyglot_s1_coordination_overhead}
            />
            <ScaleQuestion
              label="Q19. How much could this schema change affect developer productivity during implementation?"
              name="polyglot_s1_productivity_impact"
              value={formData.polyglot_s1_productivity_impact}
              required
              helper="Developer productivity measures iteration speed, automation efficiency, change failure rates, team collaboration, and overall developer experience."
              leftLabel="1 = No impact"
              rightLabel="5 = Very high impact"
              onChange={onChange}
              error={errors.polyglot_s1_productivity_impact}
            />
            <LimitedCheckboxGroup
              label="Q20. Given that this scenario is implemented in a Polyglot Persistence architecture, what helps the most?"
              name="polyglot_s1_architecture_benefits"
              values={formData.polyglot_s1_architecture_benefits}
              options={s1BenefitOptions}
              required
              helper="Select 1 to 3 options."
              exclusiveOption="No clear benefit from Polyglot Persistence in this scenario."
              onChange={onChange}
              error={errors.polyglot_s1_architecture_benefits}
            />
            <LimitedCheckboxGroup
              label="Q21. Given that this scenario is implemented in a Polyglot Persistence architecture, what is most likely to make the change harder?"
              name="polyglot_s1_architecture_challenges"
              values={formData.polyglot_s1_architecture_challenges}
              options={s1ChallengeOptions}
              required
              helper="Select 1 to 3 options."
              exclusiveOption="No clear disadvantage from Polyglot Persistence in this scenario."
              onChange={onChange}
              error={errors.polyglot_s1_architecture_challenges}
            />
          </div>
        </ScenarioCard>

        <ScenarioCard
        >
          <div className="scenario-description">
            <p>
              To support the same business requirement using a Multi-Model
              Persistence architecture, the Catalogue Intelligence Team (CAT)
              updates both relational/tabular and document models within Azure
              Cosmos DB.
            </p>
            <p>1. Database Migrations: Relational and Document</p>
            <p>
              The Catalogue Intelligence Team (CAT) adds the new
              product_region_profile table structure to the relational/tabular
              model and extends the regional enrichment fields in the document
              model within Azure Cosmos DB.
            </p>
            <p>
              These dual-model schema updates are backward-compatible to ensure
              existing application components do not crash during the database
              transition.
            </p>
            <p>2. Internal Service Layer Updates</p>
            <p>
              Internal data access logic, domain models, repositories, and
              catalogue APIs within the CAT Team boundary are updated to read
              and write the new regional fields from both updated data models.
            </p>
            <p>
              This affects approximately 3-5 internal components that must be
              redeployed to recognize and serve the new regional attributes.
            </p>
            <p>3. Sync Pipelines and Event Schema</p>
            <p>
              The CAT Team adjusts internal indexing or synchronization logic
              to keep the relational/tabular and document views properly
              aligned within the same multi-model database platform.
            </p>
            <p>
              The outbound catalogue event schema is updated to broadcast
              regional product updates to the rest of the business.
            </p>
            <p className="architecture-note-heading">Architecture Note</p>
            <p>
              This approach may provide a simpler codebase and lower
              operational overhead because both models are handled within one
              database platform. However, the team may still encounter
              limitations when handling complex relational-style joins or deep
              document aggregations.
            </p>
          </div>

          <div className="scenario-questions">
            <NumericQuestion
              label="Q22. Estimated total implementation effort for this scenario"
              name="multi_s1_effort"
              value={formData.multi_s1_effort}
              required
              helper="Enter your estimate in story points. Assume 1 story point = approximately 1 working day of engineering effort. Estimate the total effort across the affected Catalogue Intelligence Team scope, not only one small service. Include Azure Cosmos DB relational/tabular model changes, document model changes, API/event updates, migration, testing, validation, and deployment effort."
              onChange={onChange}
              error={errors.multi_s1_effort}
            />
            <ScaleQuestion
              label="Q23. How much mental effort is required to understand the full impact of this change?"
              name="multi_s1_cognitive_load"
              value={formData.multi_s1_cognitive_load}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.multi_s1_cognitive_load}
            />
            <ScaleQuestion
              label="Q24. How high is the risk of bugs or data issues?"
              name="multi_s1_bug_risk"
              value={formData.multi_s1_bug_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.multi_s1_bug_risk}
            />
            <ScaleQuestion
              label="Q25. How much coordination overhead is likely required?"
              name="multi_s1_coordination_overhead"
              value={formData.multi_s1_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.multi_s1_coordination_overhead}
            />
            <ScaleQuestion
              label="Q26. How much could this schema change affect developer productivity during implementation?"
              name="multi_s1_productivity_impact"
              value={formData.multi_s1_productivity_impact}
              required
              helper="Developer productivity measures iteration speed, automation efficiency, change failure rates, team collaboration, and overall developer experience."
              leftLabel="1 = No impact"
              rightLabel="5 = Very high impact"
              onChange={onChange}
              error={errors.multi_s1_productivity_impact}
            />
            <LimitedCheckboxGroup
              label="Q27. Given that this scenario is implemented in a Multi-Model Persistence architecture, what helps the most?"
              name="multi_s1_architecture_benefits"
              values={formData.multi_s1_architecture_benefits}
              options={multiS1BenefitOptions}
              required
              helper="Select 1 to 3 options."
              exclusiveOption="No clear benefit from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multi_s1_architecture_benefits}
            />
            <LimitedCheckboxGroup
              label="Q28. Given that this scenario is implemented in a Multi-Model Persistence architecture, what is most likely to make the change harder?"
              name="multi_s1_architecture_challenges"
              values={formData.multi_s1_architecture_challenges}
              options={multiS1ChallengeOptions}
              required
              helper="Select 1 to 3 options."
              exclusiveOption="No clear disadvantage from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multi_s1_architecture_challenges}
            />
          </div>
        </ScenarioCard>
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

export default ScenarioPolyglot

