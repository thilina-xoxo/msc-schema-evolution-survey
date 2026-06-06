import ScaleQuestion from './ScaleQuestion'

const s1BenefitOptions = [
  'Structured product master data and flexible enrichment content can be managed within one database platform.',
  'Azure Cosmos DB can support both relational/tabular-style product data and document-based enrichment data.',
  'The Catalogue Intelligence Team may avoid coordinating changes across two separate database products.',
  'Unified platform capabilities may simplify governance, deployment, monitoring, or backup operations.',
  'The change can remain mostly inside the Catalogue Intelligence bounded context.',
  'No clear benefit from Multi-Model Persistence in this scenario.',
]

const s1ChallengeOptions = [
  'Designing clear boundaries between relational/tabular and document models inside the same platform.',
  'Ensuring the new regional product structure stays consistent with flexible enrichment documents.',
  'Updating APIs or events that expose data coming from multiple models.',
  'Testing whether regional product data works correctly across both models.',
  'Risk of treating the multi-model platform like a shared database instead of keeping service ownership clear.',
  'No clear disadvantage from Multi-Model Persistence in this scenario.',
]

const s2BenefitOptions = [
  'Catalogue Intelligence can manage structured product data and flexible enrichment data within one platform.',
  'Personalization and Discovery can manage graph relationships and behaviour/preference documents within one platform.',
  'Fewer separate database products may reduce operational and migration complexity for teams using multi-model databases.',
  'Multi-model databases may reduce the need to synchronize related data across separate stores within the same bounded context.',
  'Teams can still preserve domain ownership while using multiple data models internally.',
  'No clear benefit from Multi-Model Persistence in this scenario.',
]

const s2ChallengeOptions = [
  'Designing and maintaining multiple data models correctly within the same database platform.',
  'Avoiding accidental coupling if multiple teams treat the platform as a shared database.',
  'Keeping API and event contracts compatible across downstream consumers.',
  'Testing consistency across Cosmos DB, ArangoDB, MongoDB, PostgreSQL, Elasticsearch, and event flows.',
  'Planning migration and rollout order across multiple teams.',
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

    if (!values.includes(option) && values.length >= 2) {
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
                values.length >= 2 &&
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

function TextareaQuestion({ label, name, value, onChange }) {
  return (
    <div className="question">
      <label className="question-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        rows="4"
        onChange={(event) => onChange(name, event.target.value)}
      />
    </div>
  )
}

function ScenarioCard({ title, complexity, scope, children }) {
  return (
    <article className="scenario-card">
      <div className="scenario-card-header">
        <h3>{title}</h3>
        <span className="complexity-badge">{complexity}</span>
      </div>
      <p className="scenario-scope">{scope}</p>
      {children}
    </article>
  )
}

function ScenarioMultiModel({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 4_2: Scenario-Based Evaluation: Multi-Model Persistence</h2>
      <p className="section-intro">
        Please evaluate the same two schema evolution scenarios under
        Architecture B: Multi-Model Persistence.
      </p>

      <div className="scenario-list">
        <ScenarioCard
          title="Catalogue Enrichment for Regional Product Experience"
          complexity="Complexity: Medium"
          scope="Scope: Mainly within one domain/team"
        >
          <div className="scenario-description">
            <p>
              ModaVista wants to launch region-specific product pages for
              different markets. For example, the same product may need
              different display content, size guidance, and enrichment details
              depending on the customer’s region.
            </p>
            <p>
              To support this business requirement, the Catalogue Intelligence
              Team must update the multi-model database used inside its bounded
              context:
            </p>
            <ul className="polyglot-scenario-points">
              <li>
                In Azure Cosmos DB relational/tabular model, the team must add
                a new product_region_profile structure linked to existing
                product master records. This stores structured regional
                catalogue data such as product_id, region_code,
                regional_status, and size_guide_code.
              </li>
              <li>
                In Azure Cosmos DB document model, the team must extend the
                product enrichment document to store flexible regional content
                such as localized descriptions, regional size advice, care
                notes, styling notes, and market-specific display attributes.
              </li>
            </ul>
            <p>Estimated affected scope:</p>
            <p>
              This change is expected to affect 1 domain/team and approximately
              3–5 internal layers or service components, such as Cosmos DB
              relational/tabular model changes, Cosmos DB document model
              changes, catalogue APIs, catalogue event schema,
              indexing/synchronization jobs, and testing/validation flows.
            </p>
            <p>Small help for estimation:</p>
            <p>
              Compared with the Polyglot version, this scenario may reduce
              effort from coordinating two separate database products inside
              the Catalogue Intelligence Team. However, the team still needs to
              update two data models, related APIs/events, migration logic, and
              tests.
            </p>
          </div>

          <div className="scenario-questions">
            <NumericQuestion
              label="Q32. Estimated total implementation effort for this scenario"
              name="multimodel_s1_effort_story_points"
              value={formData.multimodel_s1_effort_story_points}
              required
              helper="Enter your estimate in story points. Assume 1 story point = approximately 1 working day of engineering effort. Estimate the total effort across the affected Catalogue Intelligence Team scope, not only one small service. Include Cosmos DB relational/tabular model changes, Cosmos DB document model changes, API/event updates, migration, testing, validation, and deployment effort."
              onChange={onChange}
              error={errors.multimodel_s1_effort_story_points}
            />
            <ScaleQuestion
              label="Q33. How much mental effort is required to understand the full impact of this change?"
              name="multimodel_s1_mental_effort"
              value={formData.multimodel_s1_mental_effort}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.multimodel_s1_mental_effort}
            />
            <ScaleQuestion
              label="Q34. How high is the risk of bugs or data issues?"
              name="multimodel_s1_bug_data_risk"
              value={formData.multimodel_s1_bug_data_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.multimodel_s1_bug_data_risk}
            />
            <ScaleQuestion
              label="Q35. How much coordination overhead is likely required?"
              name="multimodel_s1_coordination_overhead"
              value={formData.multimodel_s1_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.multimodel_s1_coordination_overhead}
            />
            <ScaleQuestion
              label="Q36. How much could this schema change affect developer productivity during implementation?"
              name="multimodel_s1_productivity_impact"
              value={formData.multimodel_s1_productivity_impact}
              required
              leftLabel="1 = No impact"
              rightLabel="5 = Very high impact"
              onChange={onChange}
              error={errors.multimodel_s1_productivity_impact}
            />
            <LimitedCheckboxGroup
              label="Q37. Given that this scenario is implemented in a Multi-Model Persistence architecture, what helps the most?"
              name="multimodel_s1_architecture_benefits"
              values={formData.multimodel_s1_architecture_benefits}
              options={s1BenefitOptions}
              required
              helper="Select up to two."
              exclusiveOption="No clear benefit from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multimodel_s1_architecture_benefits}
            />
            <LimitedCheckboxGroup
              label="Q38. Given that this scenario is implemented in a Multi-Model Persistence architecture, what is most likely to make the change harder?"
              name="multimodel_s1_architecture_challenges"
              values={formData.multimodel_s1_architecture_challenges}
              options={s1ChallengeOptions}
              required
              helper="Select up to two."
              exclusiveOption="No clear disadvantage from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multimodel_s1_architecture_challenges}
            />
            <TextareaQuestion
              label="Q39. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="multimodel_s1_optional_comment"
              value={formData.multimodel_s1_optional_comment}
              onChange={onChange}
            />
          </div>
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 4_2.2: Personalized Product Discovery Rule Rollout"
          complexity="Complexity: High"
          scope="Scope: Across multiple domains/teams"
        >
          <div className="scenario-description">
            <p>
              ModaVista wants to introduce a personalized product discovery
              experience. The platform should recommend products using customer
              preferences, product relationships, regional catalogue
              attributes, stock availability, and recent customer behaviour.
            </p>
            <p>
              To support this business requirement, the following schema and
              data-contract changes must be implemented across the Multi-Model
              Persistence data layer:
            </p>
            <ul className="polyglot-scenario-points">
              <li>
                In the Catalogue Intelligence Team, Azure Cosmos DB
                relational/tabular model must be extended with structured
                regional discovery fields such as region_code, regional_status,
                and discovery_priority, while the Azure Cosmos DB document model
                must be extended with flexible discovery attributes such as
                style_tags, occasion_tags, localized content, and
                market-specific display attributes.
              </li>
              <li>
                In the Personalization and Discovery Team, ArangoDB graph model
                must be updated to include richer product relationship signals
                such as “similar to”, “style alternative”, and “frequently
                bought with”, while the ArangoDB document model must be
                extended to store recent customer behaviour and preference
                signals used for ranking.
              </li>
              <li>
                In the Customer Identity and Trust Team, MongoDB customer
                preference documents and related customer preference event
                schemas must expose relevant preference attributes such as
                preferred language, preferred size category, and style
                preference indicators.
              </li>
              <li>
                In the Stock and Fulfilment Team, PostgreSQL inventory and
                stock data must expose region-level product availability so
                unavailable products are not recommended.
              </li>
              <li>
                In the Search Experience Team, Elasticsearch index mappings
                must be updated to support regional discovery attributes,
                style/occasion filters, ranking signals, and
                personalization-related search filtering.
              </li>
            </ul>
            <p>Estimated affected scope:</p>
            <p>
              This change may affect approximately 4–5 core domains/teams, with
              possible wider impact depending on implementation. The affected
              areas may include data models, API contracts, event schemas,
              event consumers, search indexes, recommendation inputs, analytics
              pipelines, compatibility handling, migration logic, and testing.
            </p>
            <p>Small help for estimation:</p>
            <p>
              In this Multi-Model version, Catalogue Intelligence and
              Personalization and Discovery may benefit because each can manage
              multiple data models within one database platform. However, this
              scenario still requires cross-team coordination because customer
              preferences, stock availability, search indexes, events, APIs,
              and analytics flows may still need to evolve.
            </p>
          </div>

          <div className="scenario-questions">
            <NumericQuestion
              label="Q40. Estimated total implementation effort for this scenario"
              name="multimodel_s2_effort_story_points"
              value={formData.multimodel_s2_effort_story_points}
              required
              helper="Enter your estimate in story points. Assume 1 story point = approximately 1 working day of engineering effort. Estimate the total effort across all affected teams/domains, not only one service. Include multi-model schema changes, API/event updates, migration, compatibility handling, testing, validation, deployment, and coordination effort."
              onChange={onChange}
              error={errors.multimodel_s2_effort_story_points}
            />
            <ScaleQuestion
              label="Q41. How much mental effort is required to understand the full impact of this change?"
              name="multimodel_s2_mental_effort"
              value={formData.multimodel_s2_mental_effort}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.multimodel_s2_mental_effort}
            />
            <ScaleQuestion
              label="Q42. How high is the risk of bugs or data inconsistency?"
              name="multimodel_s2_bug_data_risk"
              value={formData.multimodel_s2_bug_data_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.multimodel_s2_bug_data_risk}
            />
            <ScaleQuestion
              label="Q43. How much coordination overhead is likely required?"
              name="multimodel_s2_coordination_overhead"
              value={formData.multimodel_s2_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.multimodel_s2_coordination_overhead}
            />
            <ScaleQuestion
              label="Q44. How difficult is it to maintain backward compatibility during this change?"
              name="multimodel_s2_backward_compatibility_difficulty"
              value={formData.multimodel_s2_backward_compatibility_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.multimodel_s2_backward_compatibility_difficulty}
            />
            <ScaleQuestion
              label="Q45. How much could this schema change affect developer productivity during implementation?"
              name="multimodel_s2_productivity_impact"
              value={formData.multimodel_s2_productivity_impact}
              required
              leftLabel="1 = No impact"
              rightLabel="5 = Very high impact"
              onChange={onChange}
              error={errors.multimodel_s2_productivity_impact}
            />
            <LimitedCheckboxGroup
              label="Q46. Given that this scenario is implemented in a Multi-Model Persistence architecture, what helps the most?"
              name="multimodel_s2_architecture_benefits"
              values={formData.multimodel_s2_architecture_benefits}
              options={s2BenefitOptions}
              required
              helper="Select up to two."
              exclusiveOption="No clear benefit from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multimodel_s2_architecture_benefits}
            />
            <LimitedCheckboxGroup
              label="Q47. Given that this scenario is implemented in a Multi-Model Persistence architecture, what is most likely to make the change harder?"
              name="multimodel_s2_architecture_challenges"
              values={formData.multimodel_s2_architecture_challenges}
              options={s2ChallengeOptions}
              required
              helper="Select up to two."
              exclusiveOption="No clear disadvantage from Multi-Model Persistence in this scenario."
              onChange={onChange}
              error={errors.multimodel_s2_architecture_challenges}
            />
            <TextareaQuestion
              label="Q48. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="multimodel_s2_optional_comment"
              value={formData.multimodel_s2_optional_comment}
              onChange={onChange}
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

export default ScenarioMultiModel
