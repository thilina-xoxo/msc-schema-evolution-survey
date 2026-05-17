import CheckboxGroup from './CheckboxGroup'
import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const effortOptionsS1 = [
  'Very low effort — less than 1 hour',
  'Low effort — 1–3 hours',
  'Medium effort — half day to 1 day',
  'High effort — 1–2 days',
  'Very high effort — more than 2 days',
  'Not sure',
]

const effortOptionsS2 = [
  'Very low effort — less than 1 hour',
  'Low effort — 1–3 hours',
  'Medium effort — half day to 1 day',
  'High effort — 1–3 days',
  'Very high effort — more than 3 days',
  'Not sure',
]

const effortOptionsHigh = [
  'Low effort — less than half day',
  'Medium effort — 1 day',
  'High effort — 2–3 days',
  'Very high effort — 4–7 days',
  'Extremely high effort — more than 1 week',
  'Not sure',
]

const componentOptionsS1 = [
  '1 component',
  '2–3 components',
  '4–5 components',
  'More than 5 components',
  'Not sure',
]

const componentOptionsS2 = [
  '1 component',
  '2–3 components',
  '4–5 components',
  '6–8 components',
  'More than 8 components',
  'Not sure',
]

const componentOptionsHigh = [
  '1–2 components',
  '3–5 components',
  '6–8 components',
  'More than 8 components',
  'Not sure',
]

const polyS1AffectedAreas = [
  'MongoDB customer profile document',
  'Customer Service API response',
  'API documentation',
  'CustomerProfileUpdated event payload',
  'Event schema registry',
  'Personalization Service consumer logic',
  'Recommendation Service consumer logic',
  'Data lake / data warehouse pipeline',
  'BI dashboard or reporting field',
  'Automated tests',
  'Monitoring/logging',
  'No downstream area likely',
  'Not sure',
  'Other',
]

const polyS2AffectedAreas = [
  'Product Catalogue database',
  'Product Catalogue Service API',
  'Cart Service data/cache',
  'Order Service database',
  'Recommendation graph database',
  'Search index',
  'Kafka event payloads',
  'Event schema registry',
  'Data lake / data warehouse pipelines',
  'BI dashboards or reports',
  'ML feature datasets',
  'Automated tests',
  'Deployment pipeline',
  'Rollback plan',
  'Not sure',
  'Other',
]

const polyS3AffectedAreas = [
  'MongoDB customer document structure',
  'Customer Service API',
  'Authentication logic',
  'Customer profile update logic',
  'GDPR/privacy workflows',
  'CustomerProfileUpdated event payload',
  'Event schema registry',
  'Personalization Service',
  'Recommendation Service',
  'Search Experience / BFF',
  'Data lake / warehouse pipelines',
  'BI dashboards or reports',
  'ML feature datasets',
  'Automated regression tests',
  'Security testing',
  'Rollback plan',
  'Not sure',
  'Other',
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

const polyS4AffectedAreas = [
  'Customer Service',
  'Order Service',
  'Fulfilment Service',
  'Returns Service',
  'MongoDB customer records',
  'PostgreSQL order records',
  'Fulfilment/returns relational database',
  'API contracts',
  'Kafka event payloads',
  'Event schema registry',
  'GDPR/customer deletion workflow',
  'Data lake / warehouse pipelines',
  'BI dashboards or compliance reports',
  'Automated integration tests',
  'Monitoring and alerting',
  'Rollback/failure handling',
  'Not sure',
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

function ScenarioCard({ title, complexity, description, children }) {
  return (
    <article className="scenario-card">
      <div className="scenario-card-header">
        <div>
          <h3>{title}</h3>
          <span className={`complexity-badge ${complexity.toLowerCase().replaceAll(' ', '-')}`}>
            {complexity}
          </span>
        </div>
      </div>
      <div className="scenario-description">{description}</div>
      <div className="scenario-questions">{children}</div>
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
  const selectedPolyS1AffectedAreas = formData.poly_s1_affected_areas || []
  const selectedPolyS2AffectedAreas = formData.poly_s2_affected_areas || []
  const selectedPolyS3AffectedAreas = formData.poly_s3_affected_areas || []
  const selectedPolyS4AffectedAreas = formData.poly_s4_affected_areas || []

  return (
    <section>
      <h2>Section 5_1 — Scenario-Based Evaluation: Polyglot Persistence</h2>
      <p className="section-intro">
        This section asks you to evaluate schema evolution scenarios under
        Architecture A — Polyglot Persistence.
      </p>
      <p className="section-intro">
        In this architecture, ModaVista Group uses different database
        technologies for different services. Each engineering team owns its
        service and its operational data store. Services integrate through APIs,
        events, search indexes, and analytical pipelines.
      </p>

      <div className="info-box section-definition">
        <p>
          Important clarification: The central data platform is not the
          operational source of truth. It is used for analytics, reporting, and
          ML.
        </p>
      </div>

      <div className="architecture-reminder">
        <div>
          <h3>Architecture A Reminder — Polyglot Persistence</h3>
          <p>Before answering the scenarios, please keep this context in mind.</p>
        </div>
        <dl>
          <div><dt>Customer Service</dt><dd>MongoDB</dd></div>
          <div><dt>Product Catalogue Service</dt><dd>PostgreSQL/MySQL</dd></div>
          <div><dt>Cart Service</dt><dd>Redis</dd></div>
          <div><dt>Order/Payment Services</dt><dd>PostgreSQL</dd></div>
          <div><dt>Inventory/Fulfilment/Returns Services</dt><dd>Relational DB</dd></div>
          <div><dt>Recommendation Service</dt><dd>Neo4j</dd></div>
          <div><dt>Search Service</dt><dd>Elasticsearch/OpenSearch</dd></div>
          <div><dt>Events</dt><dd>Kafka + Schema Registry</dd></div>
          <div><dt>Analytics</dt><dd>Data Lakehouse + Data Warehouse</dd></div>
        </dl>
        <a
          href="/diagrams/modavista_arch_v3_clean.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full Polyglot architecture diagram
        </a>
      </div>

      <div className="scenario-list">
        <ScenarioCard
          title="Scenario 5_1.1 — Customer Profile Attribute Extension"
          complexity="Low"
          description={
            <>
              <p>
                The Customer Identity and Trust Team (CIT Team) receives a
                business request to support improved localization and
                personalized communication.
              </p>
              <p>
                The Customer Service must add two new optional fields to the
                customer profile: <code>preferred_language</code> and{' '}
                <code>preferred_size_category</code>.
              </p>
              <p>
                These fields should be stored in the customer profile and
                returned through the Customer Service API. Existing customers
                may not have these values.
              </p>
              <p>
                In the Polyglot architecture, the Customer Service stores
                customer profiles in MongoDB. Customer profile updates may also
                be published as events and may later be used by Personalization,
                Recommendation, Search Experience, and analytics pipelines.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q35. Under the Polyglot Persistence architecture, how much implementation effort would this change likely require?" name="poly_s1_effort" value={formData.poly_s1_effort} options={effortOptionsS1} required onChange={onChange} error={errors.poly_s1_effort} />
          <SelectQuestion label="Q36. How many technical components would likely need to be modified or checked?" name="poly_s1_components_affected" value={formData.poly_s1_components_affected} options={componentOptionsS1} required onChange={onChange} error={errors.poly_s1_components_affected} />
          <ScaleQuestion label="Q37. How much mental effort would be required to understand and implement this change?" name="poly_s1_cognitive_load" value={formData.poly_s1_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.poly_s1_cognitive_load} />
          <ScaleQuestion label="Q38. What is the risk of introducing bugs or inconsistencies?" name="poly_s1_bug_risk" value={formData.poly_s1_bug_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.poly_s1_bug_risk} />
          <ScaleQuestion label="Q39. How much coordination with other teams would be required?" name="poly_s1_coordination_overhead" value={formData.poly_s1_coordination_overhead} required leftLabel="1 = No coordination" rightLabel="5 = High coordination" onChange={onChange} error={errors.poly_s1_coordination_overhead} />
          <CheckboxGroup label="Q40. Which areas would most likely need to be updated or checked?" name="poly_s1_affected_areas" values={selectedPolyS1AffectedAreas} options={polyS1AffectedAreas} required onChange={onChange} error={errors.poly_s1_affected_areas} />
          {selectedPolyS1AffectedAreas.includes('Other') && <OtherTextField id="poly_s1_affected_areas_other" label="Please specify the affected area" value={formData.poly_s1_affected_areas_other || ''} error={errors.poly_s1_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q41. What would be the main challenge in implementing this change?" name="poly_s1_main_challenge" value={formData.poly_s1_main_challenge} onChange={onChange} />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.2 — Product Identifier Type Change"
          complexity="Medium to High"
          description={
            <>
              <p>
                The Catalogue Intelligence Team (CAT Team) currently uses
                product_id as an integer in the Product Catalogue Service.
              </p>
              <p>
                A new enterprise-wide requirement requires changing product_id
                from Integer to UUID string.
              </p>
              <p>This identifier is used across multiple parts of ModaVista’s platform:</p>
              <ul>
                <li>Product Catalogue Service</li>
                <li>Order Service</li>
                <li>Cart Service</li>
                <li>Recommendation Service</li>
                <li>Search Service</li>
                <li>APIs</li>
                <li>Kafka event payloads</li>
                <li>Elasticsearch/OpenSearch indexes</li>
                <li>Data lakehouse and warehouse pipelines</li>
                <li>BI and ML datasets</li>
              </ul>
              <p>
                In the Polyglot architecture, this change may affect multiple
                database technologies, including PostgreSQL/MySQL, Redis, Neo4j,
                Elasticsearch/OpenSearch, and analytical pipelines.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q42. Under the Polyglot Persistence architecture, how much implementation effort would this change likely require?" name="poly_s2_effort" value={formData.poly_s2_effort} options={effortOptionsS2} required onChange={onChange} error={errors.poly_s2_effort} />
          <SelectQuestion label="Q43. How many technical components would likely need to be modified or checked?" name="poly_s2_components_affected" value={formData.poly_s2_components_affected} options={componentOptionsS2} required onChange={onChange} error={errors.poly_s2_components_affected} />
          <ScaleQuestion label="Q44. How much mental effort would be required to understand the full impact of this change?" name="poly_s2_cognitive_load" value={formData.poly_s2_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.poly_s2_cognitive_load} />
          <ScaleQuestion label="Q45. What is the risk of introducing bugs or inconsistent data?" name="poly_s2_bug_risk" value={formData.poly_s2_bug_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.poly_s2_bug_risk} />
          <ScaleQuestion label="Q46. How much coordination with other teams would be required?" name="poly_s2_coordination_overhead" value={formData.poly_s2_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.poly_s2_coordination_overhead} />
          <ScaleQuestion label="Q47. How difficult would backward compatibility be during this change?" name="poly_s2_backward_compatibility_difficulty" value={formData.poly_s2_backward_compatibility_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.poly_s2_backward_compatibility_difficulty} />
          <CheckboxGroup label="Q48. Which areas would most likely be affected?" name="poly_s2_affected_areas" values={selectedPolyS2AffectedAreas} options={polyS2AffectedAreas} required onChange={onChange} error={errors.poly_s2_affected_areas} />
          {selectedPolyS2AffectedAreas.includes('Other') && <OtherTextField id="poly_s2_affected_areas_other" label="Please specify the affected area" value={formData.poly_s2_affected_areas_other || ''} error={errors.poly_s2_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q49. What would be the most difficult part of changing product_id from Integer to UUID?" name="poly_s2_main_challenge" value={formData.poly_s2_main_challenge} onChange={onChange} />
          <TextareaQuestion label="Q50. What strategy would you use to avoid breaking existing services?" name="poly_s2_compatibility_strategy" value={formData.poly_s2_compatibility_strategy} onChange={onChange} placeholder="Examples: API versioning, event schema versioning, dual-field support, dual-write strategy, migration script, feature flag, gradual rollout, backward-compatible read logic." />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.3 — Customer Entity Split for Security and Compliance"
          complexity="High"
          description={
            <>
              <p>
                The Customer Identity and Trust Team (CIT Team) currently
                stores all customer-related data in one customer profile
                document in MongoDB.
              </p>
              <p>
                Due to new security and compliance requirements, the customer
                profile must be split into two logical structures.
              </p>
              <p><strong>Authentication Profile:</strong></p>
              <ul>
                <li>username</li>
                <li>password hash</li>
                <li>MFA status</li>
                <li>login metadata</li>
                <li>security audit fields</li>
              </ul>
              <p><strong>Public Customer Profile:</strong></p>
              <ul>
                <li>name</li>
                <li>address</li>
                <li>preferred language</li>
                <li>size preferences</li>
                <li>communication preferences</li>
              </ul>
              <p>
                Existing customer records must be migrated without data loss.
                Services consuming customer data should continue to work during
                the transition.
              </p>
              <p>This change may affect:</p>
              <ul>
                <li>MongoDB document structure</li>
                <li>Customer Service API</li>
                <li>CustomerProfileUpdated events</li>
                <li>Personalization Service</li>
                <li>Recommendation Service</li>
                <li>Data lakehouse pipelines</li>
                <li>BI/reporting datasets</li>
                <li>GDPR-related data handling</li>
              </ul>
            </>
          }
        >
          <SelectQuestion label="Q51. Under the Polyglot Persistence architecture, how much implementation effort would this change likely require?" name="poly_s3_effort" value={formData.poly_s3_effort} options={effortOptionsHigh} required onChange={onChange} error={errors.poly_s3_effort} />
          <SelectQuestion label="Q52. How many technical components would likely need to be modified or checked?" name="poly_s3_components_affected" value={formData.poly_s3_components_affected} options={componentOptionsHigh} required onChange={onChange} error={errors.poly_s3_components_affected} />
          <ScaleQuestion label="Q53. How much mental effort would be required to understand and implement this structural split?" name="poly_s3_cognitive_load" value={formData.poly_s3_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.poly_s3_cognitive_load} />
          <ScaleQuestion label="Q54. What is the risk of introducing bugs, data loss, or data inconsistency?" name="poly_s3_data_risk" value={formData.poly_s3_data_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.poly_s3_data_risk} />
          <ScaleQuestion label="Q55. How much coordination with other teams would be required?" name="poly_s3_coordination_overhead" value={formData.poly_s3_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.poly_s3_coordination_overhead} />
          <ScaleQuestion label="Q56. How difficult would the data migration be?" name="poly_s3_migration_difficulty" value={formData.poly_s3_migration_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.poly_s3_migration_difficulty} />
          <ScaleQuestion label="Q57. How difficult would testing and validation be?" name="poly_s3_testing_difficulty" value={formData.poly_s3_testing_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.poly_s3_testing_difficulty} />
          <CheckboxGroup label="Q58. Which areas would most likely be affected?" name="poly_s3_affected_areas" values={selectedPolyS3AffectedAreas} options={polyS3AffectedAreas} required onChange={onChange} error={errors.poly_s3_affected_areas} />
          {selectedPolyS3AffectedAreas.includes('Other') && <OtherTextField id="poly_s3_affected_areas_other" label="Please specify the affected area" value={formData.poly_s3_affected_areas_other || ''} error={errors.poly_s3_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q59. What would be your preferred approach to implement this structural split?" name="poly_s3_implementation_approach" value={formData.poly_s3_implementation_approach} onChange={onChange} />
          <TextareaQuestion label="Q60. What would be the biggest risk in this change?" name="poly_s3_biggest_risk" value={formData.poly_s3_biggest_risk} onChange={onChange} />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_1.4 — Cross-Service Delete Rule"
          complexity="Extreme"
          description={
            <>
              <p>A new business rule must be enforced:</p>
              <p>
                <strong>
                  A customer cannot be permanently deleted if they have pending
                  orders, active shipments, or unresolved returns.
                </strong>
              </p>
              <p>
                Customer information is owned by the Customer Identity and Trust
                Team (CIT Team) through the Customer Service.
              </p>
              <p>
                Order information is owned by the Checkout and Orders Team (COT
                Team) through the Order Service.
              </p>
              <p>
                Fulfilment and returns information are owned by the Stock and
                Fulfilment Team (SFT Team).
              </p>
              <p>
                The rule must be enforced without causing data inconsistency or
                service failure.
              </p>
              <p>
                In the Polyglot architecture, this may require coordination
                across MongoDB, PostgreSQL, relational fulfilment data, Kafka
                events, API contracts, and possibly GDPR/customer deletion
                workflows.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q61. Under the Polyglot Persistence architecture, how much implementation effort would this change likely require?" name="poly_s4_effort" value={formData.poly_s4_effort} options={effortOptionsHigh} required onChange={onChange} error={errors.poly_s4_effort} />
          <SelectQuestion label="Q62. How many technical components would likely need to be modified or checked?" name="poly_s4_components_affected" value={formData.poly_s4_components_affected} options={componentOptionsHigh} required onChange={onChange} error={errors.poly_s4_components_affected} />
          <ScaleQuestion label="Q63. How much mental effort would be required to understand and implement this rule reliably?" name="poly_s4_cognitive_load" value={formData.poly_s4_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.poly_s4_cognitive_load} />
          <ScaleQuestion label="Q64. What is the risk of bugs, inconsistent data, or incorrect deletion behaviour?" name="poly_s4_consistency_risk" value={formData.poly_s4_consistency_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.poly_s4_consistency_risk} />
          <ScaleQuestion label="Q65. How much coordination with other teams would be required?" name="poly_s4_coordination_overhead" value={formData.poly_s4_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.poly_s4_coordination_overhead} />
          <ScaleQuestion label="Q66. How difficult would it be to enforce this rule reliably across services?" name="poly_s4_rule_enforcement_difficulty" value={formData.poly_s4_rule_enforcement_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.poly_s4_rule_enforcement_difficulty} />
          <ScaleQuestion label="Q67. How difficult would rollback or failure handling be?" name="poly_s4_failure_handling_difficulty" value={formData.poly_s4_failure_handling_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.poly_s4_failure_handling_difficulty} />
          <SelectQuestion label="Q68. Which implementation approach would you most likely use?" name="poly_s4_preferred_implementation_approach" value={formData.poly_s4_preferred_implementation_approach} options={implementationApproachOptions} required onChange={onChange} error={errors.poly_s4_preferred_implementation_approach} />
          {formData.poly_s4_preferred_implementation_approach === 'Other' && <OtherTextField id="poly_s4_preferred_implementation_approach_other" label="Please specify the implementation approach" value={formData.poly_s4_preferred_implementation_approach_other} error={errors.poly_s4_preferred_implementation_approach_other} onChange={onChange} />}
          <CheckboxGroup label="Q69. Which areas would most likely be affected?" name="poly_s4_affected_areas" values={selectedPolyS4AffectedAreas} options={polyS4AffectedAreas} required onChange={onChange} error={errors.poly_s4_affected_areas} />
          {selectedPolyS4AffectedAreas.includes('Other') && <OtherTextField id="poly_s4_affected_areas_other" label="Please specify the affected area" value={formData.poly_s4_affected_areas_other || ''} error={errors.poly_s4_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q70. What is the biggest productivity challenge in this scenario?" name="poly_s4_productivity_challenge" value={formData.poly_s4_productivity_challenge} onChange={onChange} />
          <TextareaQuestion label="Q71. What tools, patterns, or team practices would help reduce this complexity?" name="poly_s4_complexity_reduction_practices" value={formData.poly_s4_complexity_reduction_practices} onChange={onChange} />
        </ScenarioCard>
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

export default ScenarioPolyglot
