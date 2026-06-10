import ScaleQuestion from './ScaleQuestion'

const polyS2BenefitOptions = [
  'Right database for each data model.',
  'Mature tooling for schema migrations.',
  'Separate evolution within CAT and PDT boundaries.',
  'Flexible modelling across relational, document, and graph data.',
  'Clear ownership of catalogue and recommendation data.',
  'No clear benefit from Polyglot Persistence in this scenario.',
]

const polyS2ChallengeOptions = [
  'Coordinating changes across multiple database technologies.',
  'Keeping API and event contracts compatible between CAT and PDT.',
  'Testing consistency across databases, services, and pipelines.',
  'Managing deployment order and backward compatibility.',
  'Debugging issues across split data stores and service layers.',
  'No clear disadvantage from Polyglot Persistence in this scenario.',
]

const multiS2BenefitOptions = [
  'One platform per team for multiple data models.',
  'Unified platform tooling for schema and model changes.',
  'Simpler cross-model querying within PDT.',
  'Lower operational overhead for deployment, monitoring, and backup.',
  'Streamlined event integration between CAT and PDT.',
  'No clear benefit from Multi-Model Persistence in this scenario.',
]

const multiS2ChallengeOptions = [
  'Defining clear boundaries between models inside each platform.',
  'Risk of hidden coupling through shared platform features.',
  'Platform-specific query or modelling limitations.',
  'Keeping CAT and PDT contracts compatible.',
  'Testing cross-model changes and event feeds.',
  'No clear disadvantage from Multi-Model Persistence in this scenario.',
]

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
      {values.length >= 3 && (
        <p className="question-helper">You can select up to 3 options.</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </fieldset>
  )
}

function ScenarioCard({ title, complexity, scope, children }) {
  return (
    <article className="scenario-card">
      <div className="scenario-card-header">
        <h3>{title}</h3>
        {complexity && <span className="complexity-badge">{complexity}</span>}
      </div>
      {scope && <p className="scenario-scope">{scope}</p>}
      {children}
    </article>
  )
}

function WorkStep({ title, children }) {
  return (
    <div className="scenario-work-step">
      <h4>{title}</h4>
      {children}
    </div>
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
      <div className="scenario-list">
        <ScenarioCard
          title="Scenario 4.2: Regionalized Style Alternatives"
          complexity="Complexity: High"
          scope="Scope: Across two domain teams"
        >
          <div className="scenario-description">
            <h4>Business Requirement</h4>
            <p>
              ModaVista wants to recommend Style Alternatives on product pages,
              such as alternative matching items or direct substitutes. However,
              recommended items should appear only if they are actively approved
              for sale in the customer’s shopping region.
            </p>
            <p>The change involves two domain teams:</p>
            <p>
              Catalogue Intelligence Team (CAT): Must track and provide the
              regional eligibility of products.
            </p>
            <p>
              Personalization and Discovery Team (PDT): Must map style
              relationships between products and update the recommendation
              engine logic to filter out regionally restricted items.
            </p>
          </div>
        </ScenarioCard>

        <ScenarioCard title="High-Level Polyglot Approach: PostgreSQL, MongoDB, and Neo4j">
          <div className="scenario-description">
            <p>
              This approach requires coordination across four separate data
              stores across the two teams.
            </p>
            <WorkStep title="1. Database Schema Migrations: Intra-Team">
              <p>
                CAT Team: Adds a regional restriction flag, is_recommendable,
                to PostgreSQL and extends MongoDB enrichment documents with
                localized style_tags.
              </p>
              <p>
                PDT Team: Updates Neo4j to include a new edge type,
                STYLE_ALTERNATIVE, between product nodes, and extends MongoDB
                behaviour documents to track regional preference weights.
              </p>
            </WorkStep>
            <WorkStep title="2. Cross-Team Contract and Code Changes: Business Logic">
              <p>
                Collaboration: Both teams agree on a shared data contract, such
                as an API or Kafka event payload, so PDT can read CAT’s new
                regional flags.
              </p>
              <p>
                Code Change: PDT developers rewrite the core recommendation
                engine logic. The code now performs a two-part operation: it
                fetches style relationships from Neo4j, then cross-references
                them against the incoming CAT event stream to remove any
                products marked is_recommendable = false for that region.
              </p>
            </WorkStep>
            <WorkStep title="3. Multi-Database Pipeline Synchronization">
              <p>
                Execution: The CAT Team updates its internal
                PostgreSQL-to-MongoDB sync jobs. At the same time, the PDT Team
                updates its graph-to-document indexing workers.
              </p>
              <p>
                Outcome: Both teams deploy code updates to their respective
                internal service layers to ensure data is translated correctly
                across PostgreSQL, MongoDB, and Neo4j.
              </p>
            </WorkStep>
          </div>
        </ScenarioCard>

        <div className="scenario-questions">
          <ScaleQuestion
            label="Q29. How complex would this cross-team schema evolution task be to implement?"
            name="poly_s2_implementation_complexity"
            value={formData.poly_s2_implementation_complexity}
            required
            leftLabel="1 = Very low complexity"
            rightLabel="5 = Very high complexity"
            onChange={onChange}
            error={errors.poly_s2_implementation_complexity}
          />
          <ScaleQuestion
            label="Q30. How much mental effort is required to understand the full impact of this change?"
            name="poly_s2_cognitive_load"
            value={formData.poly_s2_cognitive_load}
            required
            leftLabel="1 = Very low effort"
            rightLabel="5 = Very high effort"
            onChange={onChange}
            error={errors.poly_s2_cognitive_load}
          />
          <ScaleQuestion
            label="Q31. How high is the risk of bugs or data inconsistency?"
            name="poly_s2_bug_risk"
            value={formData.poly_s2_bug_risk}
            required
            leftLabel="1 = Very low risk"
            rightLabel="5 = Very high risk"
            onChange={onChange}
            error={errors.poly_s2_bug_risk}
          />
          <ScaleQuestion
            label="Q32. How much coordination overhead is likely required?"
            name="poly_s2_coordination_overhead"
            value={formData.poly_s2_coordination_overhead}
            required
            leftLabel="1 = Very low coordination"
            rightLabel="5 = Very high coordination"
            onChange={onChange}
            error={errors.poly_s2_coordination_overhead}
          />
          <ScaleQuestion
            label="Q33. How difficult is it to maintain API or event backward compatibility during this change?"
            name="poly_s2_backward_compatibility_difficulty"
            value={formData.poly_s2_backward_compatibility_difficulty}
            required
            leftLabel="1 = Very easy"
            rightLabel="5 = Very difficult"
            onChange={onChange}
            error={errors.poly_s2_backward_compatibility_difficulty}
          />
          <ScaleQuestion
            label="Q34. How difficult would it be to update and validate the recommendation business logic?"
            name="poly_s2_business_logic_validation_difficulty"
            value={formData.poly_s2_business_logic_validation_difficulty}
            required
            leftLabel="1 = Very easy"
            rightLabel="5 = Very difficult"
            onChange={onChange}
            error={errors.poly_s2_business_logic_validation_difficulty}
          />
          <ScaleQuestion
            label="Q35. How much operational effort would be required for deployment, synchronization, and monitoring?"
            name="poly_s2_operational_effort"
            value={formData.poly_s2_operational_effort}
            required
            leftLabel="1 = Very low effort"
            rightLabel="5 = Very high effort"
            onChange={onChange}
            error={errors.poly_s2_operational_effort}
          />
          <ScaleQuestion
            label="Q36. How much could this schema change affect developer productivity during implementation?"
            name="poly_s2_productivity_impact"
            value={formData.poly_s2_productivity_impact}
            required
            helper="Developer productivity measures iteration speed, automation efficiency, change failure rates, team collaboration, and overall developer experience."
            leftLabel="1 = No impact"
            rightLabel="5 = Very high impact"
            onChange={onChange}
            error={errors.poly_s2_productivity_impact}
          />
          <LimitedCheckboxGroup
            label="Q37. Given that this scenario is implemented in a Polyglot Persistence architecture, what helps the most?"
            name="poly_s2_architecture_benefits"
            values={formData.poly_s2_architecture_benefits}
            options={polyS2BenefitOptions}
            required
            helper="Select 1 to 3 options."
            exclusiveOption="No clear benefit from Polyglot Persistence in this scenario."
            onChange={onChange}
            error={errors.poly_s2_architecture_benefits}
          />
          <LimitedCheckboxGroup
            label="Q38. Given that this scenario is implemented in a Polyglot Persistence architecture, what is most likely to make the change harder?"
            name="poly_s2_architecture_challenges"
            values={formData.poly_s2_architecture_challenges}
            options={polyS2ChallengeOptions}
            required
            helper="Select 1 to 3 options."
            exclusiveOption="No clear disadvantage from Polyglot Persistence in this scenario."
            onChange={onChange}
            error={errors.poly_s2_architecture_challenges}
          />
        </div>

        <ScenarioCard title="High-Level Multi-Model Approach: Azure Cosmos DB and ArangoDB">
          <div className="scenario-description">
            <p>
              This approach streamlines the process by using multi-model
              database platforms within each team.
            </p>
            <WorkStep title="1. Multi-Model Schema Migrations: Intra-Team">
              <p>
                CAT Team: Modifies Azure Cosmos DB by adding the regional flag
                to the relational/tabular model and adding style tags to the
                document model.
              </p>
              <p>
                PDT Team: Modifies ArangoDB by establishing the
                STYLE_ALTERNATIVE edge in the graph model and updating customer
                preference attributes in the document model.
              </p>
            </WorkStep>
            <WorkStep title="2. Cross-Team Contract and Code Changes: Business Logic">
              <p>
                Collaboration: The teams align on a single data contract stream
                from Cosmos DB to PDT’s ArangoDB-based recommendation workflow.
              </p>
              <p>
                Code Change: PDT developers update the recommendation business
                logic. Because ArangoDB supports both graph and document
                models, the developer can query style relationships and apply
                the regional filter within the same database platform.
              </p>
            </WorkStep>
            <WorkStep title="3. Streamlined Event Broadcasting">
              <p>
                Execution: The CAT Team sets up a change-feed event from Cosmos
                DB to broadcast regional eligibility updates. PDT’s ingestion
                service listens to this feed.
              </p>
            </WorkStep>
          </div>
        </ScenarioCard>

        <div className="scenario-questions">
          <ScaleQuestion
            label="Q39. How complex would this cross-team schema evolution task be to implement?"
            name="multi_s2_implementation_complexity"
            value={formData.multi_s2_implementation_complexity}
            required
            leftLabel="1 = Very low complexity"
            rightLabel="5 = Very high complexity"
            onChange={onChange}
            error={errors.multi_s2_implementation_complexity}
          />
          <ScaleQuestion
            label="Q40. How much mental effort is required to understand the full impact of this change?"
            name="multi_s2_cognitive_load"
            value={formData.multi_s2_cognitive_load}
            required
            leftLabel="1 = Very low effort"
            rightLabel="5 = Very high effort"
            onChange={onChange}
            error={errors.multi_s2_cognitive_load}
          />
          <ScaleQuestion
            label="Q41. How high is the risk of bugs or data inconsistency?"
            name="multi_s2_bug_risk"
            value={formData.multi_s2_bug_risk}
            required
            leftLabel="1 = Very low risk"
            rightLabel="5 = Very high risk"
            onChange={onChange}
            error={errors.multi_s2_bug_risk}
          />
          <ScaleQuestion
            label="Q42. How much coordination overhead is likely required?"
            name="multi_s2_coordination_overhead"
            value={formData.multi_s2_coordination_overhead}
            required
            leftLabel="1 = Very low coordination"
            rightLabel="5 = Very high coordination"
            onChange={onChange}
            error={errors.multi_s2_coordination_overhead}
          />
          <ScaleQuestion
            label="Q43. How difficult is it to maintain API or event backward compatibility during this change?"
            name="multi_s2_backward_compatibility_difficulty"
            value={formData.multi_s2_backward_compatibility_difficulty}
            required
            leftLabel="1 = Very easy"
            rightLabel="5 = Very difficult"
            onChange={onChange}
            error={errors.multi_s2_backward_compatibility_difficulty}
          />
          <ScaleQuestion
            label="Q44. How difficult would it be to update and validate the recommendation business logic?"
            name="multi_s2_business_logic_validation_difficulty"
            value={formData.multi_s2_business_logic_validation_difficulty}
            required
            leftLabel="1 = Very easy"
            rightLabel="5 = Very difficult"
            onChange={onChange}
            error={errors.multi_s2_business_logic_validation_difficulty}
          />
          <ScaleQuestion
            label="Q45. How much operational effort would be required for deployment, synchronization, and monitoring?"
            name="multi_s2_operational_effort"
            value={formData.multi_s2_operational_effort}
            required
            leftLabel="1 = Very low effort"
            rightLabel="5 = Very high effort"
            onChange={onChange}
            error={errors.multi_s2_operational_effort}
          />
          <ScaleQuestion
            label="Q46. How much could this schema change affect developer productivity during implementation?"
            name="multi_s2_productivity_impact"
            value={formData.multi_s2_productivity_impact}
            required
            helper="Developer productivity measures iteration speed, automation efficiency, change failure rates, team collaboration, and overall developer experience."
            leftLabel="1 = No impact"
            rightLabel="5 = Very high impact"
            onChange={onChange}
            error={errors.multi_s2_productivity_impact}
          />
          <LimitedCheckboxGroup
            label="Q47. Given that this scenario is implemented in a Multi-Model Persistence architecture, what helps the most?"
            name="multi_s2_architecture_benefits"
            values={formData.multi_s2_architecture_benefits}
            options={multiS2BenefitOptions}
            required
            helper="Select 1 to 3 options."
            exclusiveOption="No clear benefit from Multi-Model Persistence in this scenario."
            onChange={onChange}
            error={errors.multi_s2_architecture_benefits}
          />
          <LimitedCheckboxGroup
            label="Q48. Given that this scenario is implemented in a Multi-Model Persistence architecture, what is most likely to make the change harder?"
            name="multi_s2_architecture_challenges"
            values={formData.multi_s2_architecture_challenges}
            options={multiS2ChallengeOptions}
            required
            helper="Select 1 to 3 options."
            exclusiveOption="No clear disadvantage from Multi-Model Persistence in this scenario."
            onChange={onChange}
            error={errors.multi_s2_architecture_challenges}
          />
        </div>
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
