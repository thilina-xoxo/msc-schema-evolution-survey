import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const changeRadiusOptions = [
  'Very narrow — mainly one service/team',
  'Narrow — one service plus limited downstream updates',
  'Moderate — multiple services or downstream consumers',
  'Broad — multiple teams, APIs/events, and data stores/models',
  'Very broad — cross-team, cross-data, release, analytics, and operational impact',
  'Not sure',
]

const scenarioOneEffortOptions = [
  'Very low — less than 0.5 story points',
  'Low — 0.5 to 1 story point',
  'Medium — 2 story points',
  'High — 3 to 5 story points',
  'Very high — more than 5 story points',
  'Not sure',
]

const scenarioTwoEffortOptions = [
  'Low — 1 to 2 story points',
  'Medium — 3 to 5 story points',
  'High — 6 to 10 story points',
  'Very high — 11 to 20 story points',
  'Extremely high — more than 20 story points',
  'Not sure',
]

const scenarioThreeEffortOptions = [
  'Medium — 3 to 5 story points',
  'High — 6 to 10 story points',
  'Very high — 11 to 20 story points',
  'Extremely high — 21 to 40 story points',
  'Very large initiative — more than 40 story points',
  'Not sure',
]

const scenarioFourEffortOptions = [
  'High — 6 to 10 story points',
  'Very high — 11 to 20 story points',
  'Extremely high — 21 to 40 story points',
  'Very large initiative — more than 40 story points',
  'Requires architectural redesign / not feasible as a simple change',
  'Not sure',
]

const implementationApproachOptions = [
  'Synchronous API validation before deletion',
  'Saga pattern',
  'Event-driven validation',
  'Soft delete with asynchronous verification',
  'Read model / projection for delete eligibility',
  'Central policy service',
  'Manual operational approval',
  'I am not sure',
  'Other',
]

function SelectWithHelper({
  label,
  name,
  value,
  options,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

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

function TextareaQuestion({
  label,
  name,
  value,
  placeholder,
  onChange,
}) {
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

function ScenarioCard({ title, complexity, complexityClass, children }) {
  return (
    <article className="scenario-card">
      <div className="scenario-card-header">
        <h3>{title}</h3>
        <span className={`complexity-badge ${complexityClass}`}>
          {complexity}
        </span>
      </div>
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
  const storyPointHelper =
    'Assume 1 story point is approximately equal to 1 working day of engineering effort.'

  return (
    <section>
      <h2>Section 5_1 — Scenario-Based Evaluation: Polyglot Persistence</h2>
      <p className="section-intro">
        This section asks you to evaluate four schema evolution scenarios under
        Architecture A — Polyglot Persistence.
      </p>
      <p className="section-intro">
        In this architecture, different services use different operational
        databases based on workload, such as document, relational, key-value,
        graph, and search-oriented stores.
      </p>
      <div className="info-box">
        <p>
          The architecture diagram is a high-level reference only. In a real
          microservice system, each team may own multiple services, background
          jobs, event consumers, APIs, pipelines, or deployment units.
          Therefore, please do not try to count exact internal components.
          Instead, answer based on the likely change impact radius and your
          practical engineering judgement.
        </p>
        <p>{storyPointHelper}</p>
      </div>

      <div className="architecture-reminder diagram-link-card">
        <div>
          <h3>Architecture A — Polyglot Persistence Diagram</h3>
          <p>
            Open the diagram if you need a quick reminder of the high-level
            Polyglot Persistence architecture before answering the scenarios.
          </p>
        </div>
        <a
          href="/diagrams/modavista_arch_v3_clean.html"
          target="_blank"
          rel="noreferrer"
        >
          View Architecture A — Polyglot Persistence Diagram
        </a>
      </div>

      <div className="scenario-list">
        <ScenarioCard
          title="Scenario 5_1.1 — Customer Profile Attribute Extension"
          complexity="Low"
          complexityClass=""
        >
          <div className="scenario-description">
            <p>
              The Customer Identity and Trust Team needs to add two optional
              customer profile fields: <code>preferred_language</code> and{' '}
              <code>preferred_size_category</code>.
            </p>
            <p>
              Customer profiles are stored in a document database. These fields
              may also be exposed through APIs/events and used by downstream
              personalization, recommendation, customer experience, or analytics
              flows.
            </p>
          </div>

          <div className="scenario-questions">
            <SelectWithHelper
              label="Q22. Estimated implementation effort"
              name="poly_s1_effort"
              value={formData.poly_s1_effort}
              options={scenarioOneEffortOptions}
              required
              helper={storyPointHelper}
              onChange={onChange}
              error={errors.poly_s1_effort}
            />
            <SelectQuestion
              label="Q23. How broad is the likely change impact radius for this scenario?"
              name="poly_s1_change_radius"
              value={formData.poly_s1_change_radius}
              options={changeRadiusOptions}
              required
              onChange={onChange}
              error={errors.poly_s1_change_radius}
            />
            <ScaleQuestion
              label="Q24. How much mental effort is required to understand the full impact of this change?"
              name="poly_s1_cognitive_load"
              value={formData.poly_s1_cognitive_load}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.poly_s1_cognitive_load}
            />
            <ScaleQuestion
              label="Q25. How high is the risk of bugs or data issues?"
              name="poly_s1_bug_risk"
              value={formData.poly_s1_bug_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.poly_s1_bug_risk}
            />
            <ScaleQuestion
              label="Q26. How much coordination overhead is likely required?"
              name="poly_s1_coordination_overhead"
              value={formData.poly_s1_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.poly_s1_coordination_overhead}
            />
            <TextareaQuestion
              label="Q27. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="poly_s1_comment"
              value={formData.poly_s1_comment}
              onChange={onChange}
            />
          </div>
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.2 — Product Identifier Type Change"
          complexity="Medium to High"
          complexityClass="medium-to-high"
        >
          <div className="scenario-description">
            <p>
              The Catalogue Intelligence Team needs to change{' '}
              <code>product_id</code> from Integer to UUID string.
            </p>
            <p>
              This identifier may be used across catalogue, cart, order,
              recommendation, search, event messages, and analytical pipelines.
            </p>
          </div>

          <div className="scenario-questions">
            <SelectWithHelper
              label="Q28. Estimated implementation effort"
              name="poly_s2_effort"
              value={formData.poly_s2_effort}
              options={scenarioTwoEffortOptions}
              required
              helper={storyPointHelper}
              onChange={onChange}
              error={errors.poly_s2_effort}
            />
            <SelectQuestion
              label="Q29. How broad is the likely change impact radius for this scenario?"
              name="poly_s2_change_radius"
              value={formData.poly_s2_change_radius}
              options={changeRadiusOptions}
              required
              onChange={onChange}
              error={errors.poly_s2_change_radius}
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
              label="Q33. How difficult is it to maintain backward compatibility during this change?"
              name="poly_s2_backward_compatibility_difficulty"
              value={formData.poly_s2_backward_compatibility_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.poly_s2_backward_compatibility_difficulty}
            />
            <TextareaQuestion
              label="Q34. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="poly_s2_comment"
              value={formData.poly_s2_comment}
              onChange={onChange}
            />
          </div>
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.3 — Customer Entity Split for Security and Compliance"
          complexity="High"
          complexityClass="high"
        >
          <div className="scenario-description">
            <p>
              The Customer Identity and Trust Team needs to split the existing
              customer profile into two parts: an authentication profile and a
              public customer profile.
            </p>
            <p>
              This change is required to improve security, privacy, and
              compliance separation. It may affect document structure, APIs,
              events, consumers, data migration, testing, and analytics flows.
            </p>
          </div>

          <div className="scenario-questions">
            <SelectWithHelper
              label="Q35. Estimated implementation effort"
              name="poly_s3_effort"
              value={formData.poly_s3_effort}
              options={scenarioThreeEffortOptions}
              required
              helper={storyPointHelper}
              onChange={onChange}
              error={errors.poly_s3_effort}
            />
            <SelectQuestion
              label="Q36. How broad is the likely change impact radius for this scenario?"
              name="poly_s3_change_radius"
              value={formData.poly_s3_change_radius}
              options={changeRadiusOptions}
              required
              onChange={onChange}
              error={errors.poly_s3_change_radius}
            />
            <ScaleQuestion
              label="Q37. How much mental effort is required to understand the full impact of this change?"
              name="poly_s3_cognitive_load"
              value={formData.poly_s3_cognitive_load}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.poly_s3_cognitive_load}
            />
            <ScaleQuestion
              label="Q38. How high is the data, privacy, or compliance risk?"
              name="poly_s3_data_risk"
              value={formData.poly_s3_data_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.poly_s3_data_risk}
            />
            <ScaleQuestion
              label="Q39. How much coordination overhead is likely required?"
              name="poly_s3_coordination_overhead"
              value={formData.poly_s3_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.poly_s3_coordination_overhead}
            />
            <ScaleQuestion
              label="Q40. How difficult is the data migration likely to be?"
              name="poly_s3_migration_difficulty"
              value={formData.poly_s3_migration_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.poly_s3_migration_difficulty}
            />
            <ScaleQuestion
              label="Q41. How difficult is testing and validation likely to be?"
              name="poly_s3_testing_difficulty"
              value={formData.poly_s3_testing_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.poly_s3_testing_difficulty}
            />
            <TextareaQuestion
              label="Q42. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="poly_s3_comment"
              value={formData.poly_s3_comment}
              onChange={onChange}
            />
          </div>
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.4 — Cross-Service Delete Rule"
          complexity="Extreme"
          complexityClass="extreme"
        >
          <div className="scenario-description">
            <p>
              The business requires that a customer cannot be permanently
              deleted if they have pending orders, active shipments, or
              unresolved returns.
            </p>
            <p>
              This rule may affect Customer Service, Order Service, Fulfilment
              Service, Returns Service, APIs, events, consistency handling,
              failure handling, and compliance workflows.
            </p>
          </div>

          <div className="scenario-questions">
            <SelectWithHelper
              label="Q43. Estimated implementation effort"
              name="poly_s4_effort"
              value={formData.poly_s4_effort}
              options={scenarioFourEffortOptions}
              required
              helper={storyPointHelper}
              onChange={onChange}
              error={errors.poly_s4_effort}
            />
            <SelectQuestion
              label="Q44. How broad is the likely change impact radius for this scenario?"
              name="poly_s4_change_radius"
              value={formData.poly_s4_change_radius}
              options={changeRadiusOptions}
              required
              onChange={onChange}
              error={errors.poly_s4_change_radius}
            />
            <ScaleQuestion
              label="Q45. How much mental effort is required to understand the full impact of this change?"
              name="poly_s4_cognitive_load"
              value={formData.poly_s4_cognitive_load}
              required
              leftLabel="1 = Very low effort"
              rightLabel="5 = Very high effort"
              onChange={onChange}
              error={errors.poly_s4_cognitive_load}
            />
            <ScaleQuestion
              label="Q46. How high is the consistency or compliance risk?"
              name="poly_s4_consistency_risk"
              value={formData.poly_s4_consistency_risk}
              required
              leftLabel="1 = Very low risk"
              rightLabel="5 = Very high risk"
              onChange={onChange}
              error={errors.poly_s4_consistency_risk}
            />
            <ScaleQuestion
              label="Q47. How much coordination overhead is likely required?"
              name="poly_s4_coordination_overhead"
              value={formData.poly_s4_coordination_overhead}
              required
              leftLabel="1 = Very low coordination"
              rightLabel="5 = Very high coordination"
              onChange={onChange}
              error={errors.poly_s4_coordination_overhead}
            />
            <ScaleQuestion
              label="Q48. How difficult is it to enforce this rule across services?"
              name="poly_s4_rule_enforcement_difficulty"
              value={formData.poly_s4_rule_enforcement_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.poly_s4_rule_enforcement_difficulty}
            />
            <ScaleQuestion
              label="Q49. How difficult is failure handling or rollback likely to be?"
              name="poly_s4_failure_handling_difficulty"
              value={formData.poly_s4_failure_handling_difficulty}
              required
              leftLabel="1 = Very easy"
              rightLabel="5 = Very difficult"
              onChange={onChange}
              error={errors.poly_s4_failure_handling_difficulty}
            />
            <SelectQuestion
              label="Q50. Which implementation approach would you most likely consider?"
              name="poly_s4_preferred_implementation_approach"
              value={formData.poly_s4_preferred_implementation_approach}
              options={implementationApproachOptions}
              required
              onChange={onChange}
              error={errors.poly_s4_preferred_implementation_approach}
            />
            {formData.poly_s4_preferred_implementation_approach === 'Other' && (
              <OtherTextField
                id="poly_s4_preferred_implementation_approach_other"
                label="Please specify the implementation approach"
                value={formData.poly_s4_preferred_implementation_approach_other}
                error={errors.poly_s4_preferred_implementation_approach_other}
                onChange={onChange}
              />
            )}
            <TextareaQuestion
              label="Q51. Optional: What is the main challenge, assumption, or practice you would consider for this scenario?"
              name="poly_s4_comment"
              value={formData.poly_s4_comment}
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

export default ScenarioPolyglot
