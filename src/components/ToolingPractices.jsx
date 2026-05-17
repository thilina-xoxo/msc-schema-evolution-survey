import CheckboxGroup from './CheckboxGroup'
import SelectQuestion from './SelectQuestion'

const toolsPracticeOptions = [
  'Relational migration tools',
  'ORM/ODM migration tools',
  'Custom migration scripts',
  'Manual database scripts',
  'CI/CD migration automation',
  'API versioning',
  'Event schema management',
  'Contract testing',
  'Automated regression testing',
  'Data validation or data quality checks',
  'Feature flags',
  'Blue-green or canary deployment',
  'Backup and rollback practices',
  'Documentation or checklists',
  'Architecture decision records',
  'AI-assisted coding tools',
  'I have not used any specific tools or practices',
  'Other',
]

const effectiveToolingOptions = [
  'Migration tools',
  'Custom scripts',
  'CI/CD migration automation',
  'Automated testing',
  'Contract testing',
  'API or event versioning',
  'Feature flags',
  'Backup and rollback practices',
  'Documentation or checklists',
  'AI-assisted coding tools',
  'Team communication practices',
  'I have not used any effective tooling',
  'I am not sure',
  'Other',
]

const aiUsageOptions = [
  'Yes, frequently',
  'Yes, occasionally',
  'Tried once or twice',
  'No, but I would consider it',
  'No, and I would not prefer it',
]

const aiTaskOptions = [
  'Understanding legacy schema',
  'Explaining unfamiliar database structures',
  'Generating migration scripts',
  'Refactoring API models',
  'Generating test cases',
  'Writing data validation queries',
  'Creating rollback scripts',
  'Explaining migration errors',
  'Creating documentation',
  'Generating schema change checklists',
  'Comparing old and new schema versions',
  'Suggesting backward compatibility strategies',
  'I have not used AI tools for these tasks',
  'I would not use AI tools for schema evolution',
  'Other',
]

const trustOptions = [
  'I would not trust it without review',
  'I would use it only for suggestions, never directly',
  'I would use it after senior engineer review',
  'I would use it after automated testing and validation',
  'I would use it directly for low-risk changes only',
  'I am not sure',
]

const checklistUsageOptions = [
  'Yes, formal checklist',
  'Yes, informal checklist',
  'Sometimes, depending on the change',
  'No',
  'I am not sure',
]

const improvementOptions = [
  'Better migration tooling',
  'Better automated test coverage',
  'Better API and event versioning',
  'Better documentation',
  'Better cross-team communication',
  'Better CI/CD validation',
  'Better rollback and recovery process',
  'Better data ownership clarity',
  'Better architecture governance',
  'Better AI-assisted development workflow',
  'Better training for developers',
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

function ToolingGroup({ title, children }) {
  return (
    <div className="tooling-group">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function ToolingPractices({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const usedSchemaToolsPractices = formData.used_schema_tools_practices || []
  const aiToolSupportedTasks = formData.ai_tool_supported_tasks || []

  return (
    <section>
      <h2>Section 7 — Tooling, Practices, and Productivity Hacks</h2>
      <p className="section-intro">
        This section asks about tools and practices used during schema evolution
        in microservice systems. Please answer based on your overall
        experience. You may consider Polyglot Persistence, Multi-Model
        Persistence, or both where relevant. This helps identify the tools,
        practices, and productivity techniques that practitioners use to reduce
        schema evolution effort, risk, and coordination overhead.
      </p>

      <div className="tooling-section">
        <ToolingGroup title="Tools and practices">
          <CheckboxGroup label="Q90. Which tool or practice categories have you used for schema migration or schema evolution?" name="used_schema_tools_practices" values={usedSchemaToolsPractices} options={toolsPracticeOptions} required onChange={onChange} error={errors.used_schema_tools_practices} />
          {usedSchemaToolsPractices.includes('Other') && (
            <OtherTextField id="used_schema_tools_practices_other" label="Please specify the tool or practice" value={formData.used_schema_tools_practices_other} error={errors.used_schema_tools_practices_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q91. Which tool or practice has been most effective in reducing schema evolution effort?" name="most_effective_migration_tooling" value={formData.most_effective_migration_tooling} options={effectiveToolingOptions} required onChange={onChange} error={errors.most_effective_migration_tooling} />
          {formData.most_effective_migration_tooling === 'Other' && (
            <OtherTextField id="most_effective_migration_tooling_other" label="Please specify the effective tool or practice" value={formData.most_effective_migration_tooling_other} error={errors.most_effective_migration_tooling_other} onChange={onChange} />
          )}
        </ToolingGroup>

        <ToolingGroup title="AI-assisted support">
          <SelectQuestion label="Q92. Have you used AI tools such as ChatGPT, GitHub Copilot, Cursor, Codex, or similar tools to support schema migration or database-related development?" name="ai_tool_usage_frequency" value={formData.ai_tool_usage_frequency} options={aiUsageOptions} required onChange={onChange} error={errors.ai_tool_usage_frequency} />
          <CheckboxGroup label="Q93. Which schema evolution tasks can AI tools support?" name="ai_tool_supported_tasks" values={aiToolSupportedTasks} options={aiTaskOptions} required onChange={onChange} error={errors.ai_tool_supported_tasks} />
          {aiToolSupportedTasks.includes('Other') && (
            <OtherTextField id="ai_tool_supported_tasks_other" label="Please specify the AI-supported task" value={formData.ai_tool_supported_tasks_other} error={errors.ai_tool_supported_tasks_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q94. How much would you trust AI-generated output for schema evolution work without human review?" name="ai_tool_trust_level" value={formData.ai_tool_trust_level} options={trustOptions} required onChange={onChange} error={errors.ai_tool_trust_level} />
        </ToolingGroup>

        <ToolingGroup title="Review process and improvement priorities">
          <SelectQuestion label="Q95. Does your team use a schema change checklist or review process?" name="schema_change_checklist_usage" value={formData.schema_change_checklist_usage} options={checklistUsageOptions} required onChange={onChange} error={errors.schema_change_checklist_usage} />
          <SelectQuestion label="Q96. What should organizations improve first to make schema evolution less painful?" name="organization_improvement_priority" value={formData.organization_improvement_priority} options={improvementOptions} required onChange={onChange} error={errors.organization_improvement_priority} />
          {formData.organization_improvement_priority === 'Other' && (
            <OtherTextField id="organization_improvement_priority_other" label="Please specify the organizational improvement priority" value={formData.organization_improvement_priority_other} error={errors.organization_improvement_priority_other} onChange={onChange} />
          )}
          <TextareaQuestion label="Q97. Optional: What is one practical productivity hack or tooling gap you have observed during schema evolution?" name="tooling_gap_observation" value={formData.tooling_gap_observation} onChange={onChange} placeholder="You may mention migration tools, testing, rollback, documentation, event schema compatibility, AI assistance, analytics pipeline validation, or team practices." />
        </ToolingGroup>
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

export default ToolingPractices
