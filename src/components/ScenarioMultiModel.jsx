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

const multiS1AffectedAreas = [
  'Customer document model',
  'Customer Service API response',
  'API documentation',
  'CustomerProfileUpdated event payload',
  'Event schema registry',
  'Unified platform schema/governance rules',
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

const multiS2AffectedAreas = [
  'Product catalogue document model',
  'Product catalogue relational/tabular model',
  'Product Catalogue Service API',
  'Cart key-value model',
  'Order relational/tabular model',
  'Recommendation graph model',
  'Search index',
  'Kafka event payloads',
  'Event schema registry',
  'Unified platform schema/governance rules',
  'Data lake / data warehouse pipelines',
  'BI dashboards or reports',
  'ML feature datasets',
  'Automated tests',
  'Deployment pipeline',
  'Rollback plan',
  'Not sure',
  'Other',
]

const multiS3AffectedAreas = [
  'Customer document model structure',
  'Customer Service API',
  'Authentication logic',
  'Customer profile update logic',
  'GDPR/privacy workflows',
  'CustomerProfileUpdated event payload',
  'Event schema registry',
  'Unified platform access-control rules',
  'Unified platform schema/governance rules',
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
  'Cross-model query within the unified platform',
  'Central policy service',
  'Manual operational approval',
  'I am not sure',
  'Other',
]

const multiS4AffectedAreas = [
  'Customer Service',
  'Order Service',
  'Fulfilment Service',
  'Returns Service',
  'Customer document model',
  'Order relational/tabular model',
  'Fulfilment/returns relational/tabular model',
  'Unified platform access-control rules',
  'Unified platform schema/governance rules',
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

function ScenarioMultiModel({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const selectedMultiS1AffectedAreas = formData.multi_s1_affected_areas || []
  const selectedMultiS2AffectedAreas = formData.multi_s2_affected_areas || []
  const selectedMultiS3AffectedAreas = formData.multi_s3_affected_areas || []
  const selectedMultiS4AffectedAreas = formData.multi_s4_affected_areas || []

  return (
    <section>
      <h2>Section 5_2 — Scenario-Based Evaluation: Multi-Model Persistence</h2>
      <p className="section-intro">
        This section asks you to evaluate the same schema evolution scenarios
        under Architecture B — Multi-Model Persistence.
      </p>
      <p className="section-intro">
        In this architecture, ModaVista Group uses a unified multi-model
        operational persistence platform. The platform supports multiple data
        models such as document, relational/tabular, graph, and key-value models
        within one database ecosystem.
      </p>
      <p className="section-intro">
        Each engineering team still owns its own service boundaries, APIs, data
        lifecycle, and business logic. However, instead of using separate
        operational database engines for each service, the services use
        different models inside a shared multi-model persistence platform.
      </p>

      <div className="info-box section-definition">
        <p>
          Important clarification: The unified multi-model platform is the
          operational persistence platform, but service ownership is still
          logically separated. The central Data Lakehouse / Data Warehouse is
          still used only for analytics, reporting, and ML, not for operational
          transactions.
        </p>
      </div>

      <div className="architecture-reminder architecture-reminder-multimodel">
        <div>
          <h3>Architecture B Reminder — Multi-Model Persistence</h3>
          <p>Before answering the scenarios, please keep this context in mind.</p>
        </div>
        <dl>
          <div><dt>Customer Service</dt><dd>Document Model</dd></div>
          <div><dt>Product Catalogue Service</dt><dd>Document + Relational/Tabular Models</dd></div>
          <div><dt>Cart Service</dt><dd>Key-Value Model</dd></div>
          <div><dt>Order/Payment Services</dt><dd>Relational/Tabular Model</dd></div>
          <div><dt>Inventory/Fulfilment/Returns Services</dt><dd>Relational/Tabular Model</dd></div>
          <div><dt>Recommendation Service</dt><dd>Graph Model</dd></div>
          <div><dt>Personalization Service</dt><dd>Document + Graph Models</dd></div>
          <div><dt>Search Service</dt><dd>Elasticsearch/OpenSearch as specialised search projection</dd></div>
          <div><dt>Events</dt><dd>Kafka + Schema Registry</dd></div>
          <div><dt>Analytics</dt><dd>Data Lakehouse + Data Warehouse</dd></div>
          <div><dt>Governance</dt><dd>Unified query, access control, backup, monitoring, schema versioning</dd></div>
        </dl>
        <a
          href="/diagrams/modavista_multimodel_v2_clean.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full Multi-Model architecture diagram
        </a>
      </div>

      <div className="scenario-list">
        <ScenarioCard
          title="Scenario 5_2.1 — Customer Profile Attribute Extension"
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
                In the Multi-Model architecture, the Customer Service stores
                customer profiles using the Document Model within the unified
                multi-model persistence platform. Customer profile updates may
                also be published as events and may later be used by
                Personalization, Recommendation, Search Experience, and
                analytics pipelines.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q72. Under the Multi-Model Persistence architecture, how much implementation effort would this change likely require?" name="multi_s1_effort" value={formData.multi_s1_effort} options={effortOptionsS1} required onChange={onChange} error={errors.multi_s1_effort} />
          <SelectQuestion label="Q73. How many technical components would likely need to be modified or checked?" name="multi_s1_components_affected" value={formData.multi_s1_components_affected} options={componentOptionsS1} required onChange={onChange} error={errors.multi_s1_components_affected} />
          <ScaleQuestion label="Q74. How much mental effort would be required to understand and implement this change?" name="multi_s1_cognitive_load" value={formData.multi_s1_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.multi_s1_cognitive_load} />
          <ScaleQuestion label="Q75. What is the risk of introducing bugs or inconsistencies?" name="multi_s1_bug_risk" value={formData.multi_s1_bug_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.multi_s1_bug_risk} />
          <ScaleQuestion label="Q76. How much coordination with other teams would be required?" name="multi_s1_coordination_overhead" value={formData.multi_s1_coordination_overhead} required leftLabel="1 = No coordination" rightLabel="5 = High coordination" onChange={onChange} error={errors.multi_s1_coordination_overhead} />
          <CheckboxGroup label="Q77. Which areas would most likely need to be updated or checked?" name="multi_s1_affected_areas" values={selectedMultiS1AffectedAreas} options={multiS1AffectedAreas} required onChange={onChange} error={errors.multi_s1_affected_areas} />
          {selectedMultiS1AffectedAreas.includes('Other') && <OtherTextField id="multi_s1_affected_areas_other" label="Please specify the affected area" value={formData.multi_s1_affected_areas_other || ''} error={errors.multi_s1_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q78. What would be the main challenge in implementing this change?" name="multi_s1_main_challenge" value={formData.multi_s1_main_challenge} onChange={onChange} />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_2.2 — Product Identifier Type Change"
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
                In the Multi-Model architecture, this change may affect
                multiple models inside the same unified persistence platform,
                including document, relational/tabular, graph, and key-value
                models. It may also affect search projections and analytical
                pipelines.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q79. Under the Multi-Model Persistence architecture, how much implementation effort would this change likely require?" name="multi_s2_effort" value={formData.multi_s2_effort} options={effortOptionsS2} required onChange={onChange} error={errors.multi_s2_effort} />
          <SelectQuestion label="Q80. How many technical components would likely need to be modified or checked?" name="multi_s2_components_affected" value={formData.multi_s2_components_affected} options={componentOptionsS2} required onChange={onChange} error={errors.multi_s2_components_affected} />
          <ScaleQuestion label="Q81. How much mental effort would be required to understand the full impact of this change?" name="multi_s2_cognitive_load" value={formData.multi_s2_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.multi_s2_cognitive_load} />
          <ScaleQuestion label="Q82. What is the risk of introducing bugs or inconsistent data?" name="multi_s2_bug_risk" value={formData.multi_s2_bug_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.multi_s2_bug_risk} />
          <ScaleQuestion label="Q83. How much coordination with other teams would be required?" name="multi_s2_coordination_overhead" value={formData.multi_s2_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.multi_s2_coordination_overhead} />
          <ScaleQuestion label="Q84. How difficult would backward compatibility be during this change?" name="multi_s2_backward_compatibility_difficulty" value={formData.multi_s2_backward_compatibility_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.multi_s2_backward_compatibility_difficulty} />
          <CheckboxGroup label="Q85. Which areas would most likely be affected?" name="multi_s2_affected_areas" values={selectedMultiS2AffectedAreas} options={multiS2AffectedAreas} required onChange={onChange} error={errors.multi_s2_affected_areas} />
          {selectedMultiS2AffectedAreas.includes('Other') && <OtherTextField id="multi_s2_affected_areas_other" label="Please specify the affected area" value={formData.multi_s2_affected_areas_other || ''} error={errors.multi_s2_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q86. What would be the most difficult part of changing product_id from Integer to UUID?" name="multi_s2_main_challenge" value={formData.multi_s2_main_challenge} onChange={onChange} />
          <TextareaQuestion label="Q87. What strategy would you use to avoid breaking existing services?" name="multi_s2_compatibility_strategy" value={formData.multi_s2_compatibility_strategy} onChange={onChange} placeholder="Examples: API versioning, event schema versioning, dual-field support, dual-write strategy, migration script, feature flag, gradual rollout, backward-compatible read logic, unified platform migration plan." />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_2.3 — Customer Entity Split for Security and Compliance"
          complexity="High"
          description={
            <>
              <p>
                The Customer Identity and Trust Team (CIT Team) currently
                stores all customer-related data using the Document Model inside
                the unified multi-model persistence platform.
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
                <li>document model structure</li>
                <li>Customer Service API</li>
                <li>CustomerProfileUpdated events</li>
                <li>unified platform governance/security rules</li>
                <li>Personalization Service</li>
                <li>Recommendation Service</li>
                <li>Data lakehouse pipelines</li>
                <li>BI/reporting datasets</li>
                <li>GDPR-related data handling</li>
              </ul>
            </>
          }
        >
          <SelectQuestion label="Q88. Under the Multi-Model Persistence architecture, how much implementation effort would this change likely require?" name="multi_s3_effort" value={formData.multi_s3_effort} options={effortOptionsHigh} required onChange={onChange} error={errors.multi_s3_effort} />
          <SelectQuestion label="Q89. How many technical components would likely need to be modified or checked?" name="multi_s3_components_affected" value={formData.multi_s3_components_affected} options={componentOptionsHigh} required onChange={onChange} error={errors.multi_s3_components_affected} />
          <ScaleQuestion label="Q90. How much mental effort would be required to understand and implement this structural split?" name="multi_s3_cognitive_load" value={formData.multi_s3_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.multi_s3_cognitive_load} />
          <ScaleQuestion label="Q91. What is the risk of introducing bugs, data loss, or data inconsistency?" name="multi_s3_data_risk" value={formData.multi_s3_data_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.multi_s3_data_risk} />
          <ScaleQuestion label="Q92. How much coordination with other teams would be required?" name="multi_s3_coordination_overhead" value={formData.multi_s3_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.multi_s3_coordination_overhead} />
          <ScaleQuestion label="Q93. How difficult would the data migration be?" name="multi_s3_migration_difficulty" value={formData.multi_s3_migration_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.multi_s3_migration_difficulty} />
          <ScaleQuestion label="Q94. How difficult would testing and validation be?" name="multi_s3_testing_difficulty" value={formData.multi_s3_testing_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.multi_s3_testing_difficulty} />
          <CheckboxGroup label="Q95. Which areas would most likely be affected?" name="multi_s3_affected_areas" values={selectedMultiS3AffectedAreas} options={multiS3AffectedAreas} required onChange={onChange} error={errors.multi_s3_affected_areas} />
          {selectedMultiS3AffectedAreas.includes('Other') && <OtherTextField id="multi_s3_affected_areas_other" label="Please specify the affected area" value={formData.multi_s3_affected_areas_other || ''} error={errors.multi_s3_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q96. What would be your preferred approach to implement this structural split?" name="multi_s3_implementation_approach" value={formData.multi_s3_implementation_approach} onChange={onChange} />
          <TextareaQuestion label="Q97. What would be the biggest risk in this change?" name="multi_s3_biggest_risk" value={formData.multi_s3_biggest_risk} onChange={onChange} />
        </ScenarioCard>

        <ScenarioCard
          title="Scenario 5_2.4 — Cross-Service Delete Rule"
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
                In the Multi-Model architecture, customer, order, fulfilment,
                and returns data may exist inside the same unified multi-model
                persistence platform but under different logical service
                ownership and data models. This may make cross-model querying
                or unified governance easier in some cases, but the system still
                has distributed service ownership, API contracts, event
                contracts, and business process boundaries.
              </p>
            </>
          }
        >
          <SelectQuestion label="Q98. Under the Multi-Model Persistence architecture, how much implementation effort would this change likely require?" name="multi_s4_effort" value={formData.multi_s4_effort} options={effortOptionsHigh} required onChange={onChange} error={errors.multi_s4_effort} />
          <SelectQuestion label="Q99. How many technical components would likely need to be modified or checked?" name="multi_s4_components_affected" value={formData.multi_s4_components_affected} options={componentOptionsHigh} required onChange={onChange} error={errors.multi_s4_components_affected} />
          <ScaleQuestion label="Q100. How much mental effort would be required to understand and implement this rule reliably?" name="multi_s4_cognitive_load" value={formData.multi_s4_cognitive_load} required leftLabel="1 = Very low mental effort" rightLabel="5 = Very high mental effort" onChange={onChange} error={errors.multi_s4_cognitive_load} />
          <ScaleQuestion label="Q101. What is the risk of bugs, inconsistent data, or incorrect deletion behaviour?" name="multi_s4_consistency_risk" value={formData.multi_s4_consistency_risk} required leftLabel="1 = Very low risk" rightLabel="5 = Very high risk" onChange={onChange} error={errors.multi_s4_consistency_risk} />
          <ScaleQuestion label="Q102. How much coordination with other teams would be required?" name="multi_s4_coordination_overhead" value={formData.multi_s4_coordination_overhead} required leftLabel="1 = Very low coordination" rightLabel="5 = Very high coordination" onChange={onChange} error={errors.multi_s4_coordination_overhead} />
          <ScaleQuestion label="Q103. How difficult would it be to enforce this rule reliably across services?" name="multi_s4_rule_enforcement_difficulty" value={formData.multi_s4_rule_enforcement_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.multi_s4_rule_enforcement_difficulty} />
          <ScaleQuestion label="Q104. How difficult would rollback or failure handling be?" name="multi_s4_failure_handling_difficulty" value={formData.multi_s4_failure_handling_difficulty} required leftLabel="1 = Very easy" rightLabel="5 = Very difficult" onChange={onChange} error={errors.multi_s4_failure_handling_difficulty} />
          <SelectQuestion label="Q105. Which implementation approach would you most likely use?" name="multi_s4_preferred_implementation_approach" value={formData.multi_s4_preferred_implementation_approach} options={implementationApproachOptions} required onChange={onChange} error={errors.multi_s4_preferred_implementation_approach} />
          {formData.multi_s4_preferred_implementation_approach === 'Other' && <OtherTextField id="multi_s4_preferred_implementation_approach_other" label="Please specify the implementation approach" value={formData.multi_s4_preferred_implementation_approach_other} error={errors.multi_s4_preferred_implementation_approach_other} onChange={onChange} />}
          <CheckboxGroup label="Q106. Which areas would most likely be affected?" name="multi_s4_affected_areas" values={selectedMultiS4AffectedAreas} options={multiS4AffectedAreas} required onChange={onChange} error={errors.multi_s4_affected_areas} />
          {selectedMultiS4AffectedAreas.includes('Other') && <OtherTextField id="multi_s4_affected_areas_other" label="Please specify the affected area" value={formData.multi_s4_affected_areas_other || ''} error={errors.multi_s4_affected_areas_other} onChange={onChange} />}
          <TextareaQuestion label="Q107. What is the biggest productivity challenge in this scenario?" name="multi_s4_productivity_challenge" value={formData.multi_s4_productivity_challenge} onChange={onChange} />
          <TextareaQuestion label="Q108. What tools, patterns, or team practices would help reduce this complexity?" name="multi_s4_complexity_reduction_practices" value={formData.multi_s4_complexity_reduction_practices} onChange={onChange} />
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

export default ScenarioMultiModel
