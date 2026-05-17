import CheckboxGroup from './CheckboxGroup'
import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const underestimationOptions = [
  'Rarely',
  'Sometimes',
  'Often',
  'Very often',
  'I am not sure',
]

const missedPlanningFactorOptions = [
  'Data migration time',
  'Backward compatibility work',
  'API contract updates',
  'Event/message schema updates',
  'Cross-service dependencies',
  'Coordination with other teams',
  'Testing and regression effort',
  'Deployment sequencing',
  'Rollback planning',
  'Production monitoring after release',
  'Data cleanup or correction',
  'Documentation updates',
  'Security/privacy review',
  'Analytics/data warehouse pipeline impact',
  'BI dashboard/reporting impact',
  'ML feature dataset impact',
  'Support/operations handover',
  'I am not sure',
  'Other',
]

const estimationOwnerOptions = [
  'Individual developer implementing the change',
  'Senior developer / tech lead',
  'Software architect',
  'Database engineer / data engineer',
  'DevOps / platform engineer',
  'Delivery manager / project manager',
  'Joint estimation by technical and delivery roles',
  'It depends on the change type',
  'I am not sure',
]

const warningSignOptions = [
  'Multiple services or teams need to coordinate',
  'Existing data must be migrated',
  'Backward compatibility is required',
  'Event/message schemas must change',
  'API contracts must change',
  'Rollback is difficult',
  'Production data quality is uncertain',
  'Automated test coverage is weak',
  'Documentation is missing or outdated',
  'Analytics/reporting systems depend on the data',
  'Security or compliance rules are involved',
  'The change affects customer-facing features',
  'The deployment sequence is unclear',
  'I am not sure',
  'Other',
]

const bufferOptions = [
  'No additional buffer needed',
  '10–20% additional time',
  '25–50% additional time',
  'More than 50% additional time',
  'Buffer depends on change complexity',
  'I am not sure',
]

const metricOptions = [
  'Number of services or teams affected',
  'Number of databases or data models affected',
  'Estimated migration effort',
  'Backward compatibility difficulty',
  'Testing effort',
  'Coordination effort',
  'Risk of production failure',
  'Number of downstream systems affected',
  'Release rollback difficulty',
  'Developer confidence score',
  'Historical effort from similar schema changes',
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

function DeliveryGroup({ title, children }) {
  return (
    <div className="delivery-group">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function ManagerialDeliveryImpact({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const missedPlanningFactors = formData.missed_planning_factors || []
  const deliveryRiskWarningSigns = formData.delivery_risk_warning_signs || []

  return (
    <section>
      <h2>Section 8 — Managerial and Delivery Impact</h2>
      <p className="section-intro">
        This section asks about planning and delivery impact during schema
        evolution in microservice systems. Please answer based on your overall
        experience. You may consider Polyglot Persistence, Multi-Model
        Persistence, or both where relevant. This helps understand how schema
        evolution affects estimation, release timelines, coordination, delivery
        confidence, and resource planning.
      </p>

      <div className="delivery-section">
        <DeliveryGroup title="Planning and delivery impact">
          <SelectQuestion label="Q98. How often are schema changes underestimated during planning?" name="schema_change_underestimation_frequency" value={formData.schema_change_underestimation_frequency} options={underestimationOptions} required onChange={onChange} error={errors.schema_change_underestimation_frequency} />
          <CheckboxGroup label="Q99. Which planning factors are often missed when estimating schema evolution work?" name="missed_planning_factors" values={missedPlanningFactors} options={missedPlanningFactorOptions} required onChange={onChange} error={errors.missed_planning_factors} />
          {missedPlanningFactors.includes('Other') && (
            <OtherTextField id="missed_planning_factors_other" label="Please specify the missed planning factor" value={formData.missed_planning_factors_other} error={errors.missed_planning_factors_other} onChange={onChange} />
          )}
          <ScaleQuestion label="Q100. How strongly do schema changes affect release timelines?" name="release_timeline_impact" value={formData.release_timeline_impact} required leftLabel="1 = No impact" rightLabel="5 = Very high impact" onChange={onChange} error={errors.release_timeline_impact} />
          <ScaleQuestion label="Q101. How strongly do schema changes affect delivery confidence before release?" name="delivery_confidence_impact" value={formData.delivery_confidence_impact} required leftLabel="1 = No impact" rightLabel="5 = Very high impact" onChange={onChange} error={errors.delivery_confidence_impact} />
        </DeliveryGroup>

        <DeliveryGroup title="Ownership, risk, and planning metrics">
          <SelectQuestion label="Q102. Who should mainly be responsible for estimating schema evolution effort?" name="schema_change_estimation_owner" value={formData.schema_change_estimation_owner} options={estimationOwnerOptions} required onChange={onChange} error={errors.schema_change_estimation_owner} />
          <CheckboxGroup label="Q103. What are the strongest warning signs that a schema change may become a delivery risk?" name="delivery_risk_warning_signs" values={deliveryRiskWarningSigns} options={warningSignOptions} required onChange={onChange} error={errors.delivery_risk_warning_signs} />
          {deliveryRiskWarningSigns.includes('Other') && (
            <OtherTextField id="delivery_risk_warning_signs_other" label="Please specify the delivery risk warning sign" value={formData.delivery_risk_warning_signs_other} error={errors.delivery_risk_warning_signs_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q104. When planning schema evolution work, how much estimation buffer should usually be added?" name="recommended_estimation_buffer" value={formData.recommended_estimation_buffer} options={bufferOptions} required onChange={onChange} error={errors.recommended_estimation_buffer} />
          <SelectQuestion label="Q105. Which metric would be most useful for managers when planning schema evolution work?" name="most_useful_managerial_metric" value={formData.most_useful_managerial_metric} options={metricOptions} required onChange={onChange} error={errors.most_useful_managerial_metric} />
          {formData.most_useful_managerial_metric === 'Other' && (
            <OtherTextField id="most_useful_managerial_metric_other" label="Please specify the managerial metric" value={formData.most_useful_managerial_metric_other} error={errors.most_useful_managerial_metric_other} onChange={onChange} />
          )}
          <TextareaQuestion label="Q106. Optional: What planning or resource allocation advice would you give for complex schema evolution tasks?" name="planning_resource_advice" value={formData.planning_resource_advice} onChange={onChange} placeholder="You may mention estimation, coordination, impact analysis, testing, rollback planning, documentation, stakeholder communication, or resource allocation." />
        </DeliveryGroup>
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

export default ManagerialDeliveryImpact
