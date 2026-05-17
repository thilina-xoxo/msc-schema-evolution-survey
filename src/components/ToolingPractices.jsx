import CheckboxGroup from './CheckboxGroup'
import ScaleQuestion from './ScaleQuestion'
import SelectQuestion from './SelectQuestion'

const toolsPracticeOptions = [
  'Flyway',
  'Liquibase',
  'Alembic',
  'Prisma migrations',
  'Entity Framework migrations',
  'Sequelize migrations',
  'Mongoose schema validation',
  'Custom migration scripts',
  'Manual database scripts',
  'CI/CD database migration pipeline',
  'Contract testing',
  'API versioning',
  'Event schema registry',
  'Feature flags',
  'Blue-green deployment',
  'Canary deployment',
  'Database backup and rollback scripts',
  'Automated regression testing',
  'Data validation scripts',
  'Data quality checks',
  'Schema documentation',
  'Architecture decision records',
  'AI-assisted coding tools',
  'I have not used any specific tools or practices',
  'Other',
]

const effectiveToolingOptions = [
  'Formal database migration tools',
  'Custom migration scripts',
  'CI/CD migration automation',
  'Automated regression tests',
  'Contract testing',
  'API versioning',
  'Event schema registry',
  'Feature flags',
  'Backup and rollback automation',
  'Documentation and checklists',
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

const checklistItemOptions = [
  'Identify affected services',
  'Identify affected database tables/documents/models',
  'Identify affected APIs',
  'Identify affected event/message schemas',
  'Check backward compatibility',
  'Create migration script',
  'Create rollback plan',
  'Add/update automated tests',
  'Validate old and new data formats',
  'Check analytics/data warehouse impact',
  'Check BI dashboard/reporting impact',
  'Check ML feature dataset impact',
  'Review security/privacy implications',
  'Review monitoring and alerts',
  'Plan deployment sequence',
  'Communicate with dependent teams',
  'Update documentation',
  'Other',
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
  const recommendedChecklistItems =
    formData.recommended_schema_change_checklist_items || []

  return (
    <section>
      <h2>Section 7 — Tooling, Practices, and Productivity Hacks</h2>
      <p className="section-intro">
        This section identifies the tools, practices, workarounds, and
        team-level techniques practitioners use to reduce effort, risk, and
        coordination overhead during schema evolution.
      </p>
      <p className="section-intro">
        In this survey, tooling and practices may include formal migration
        tools, API versioning, event schema management, automated testing,
        CI/CD checks, rollback planning, feature flags, documentation practices,
        AI-assisted coding tools, or informal team-specific productivity hacks.
      </p>

      <div className="info-box section-definition">
        <p>
          This section is not asking for a perfect toolset. Please answer based
          on your practical experience, project exposure, or professional
          judgement.
        </p>
      </div>

      <div className="tooling-section">
        <ToolingGroup title="1. Tools and practices used">
          <CheckboxGroup label="Q124. Which tools or practices have you used for schema migration or schema evolution?" name="used_schema_tools_practices" values={usedSchemaToolsPractices} options={toolsPracticeOptions} required onChange={onChange} error={errors.used_schema_tools_practices} />
          {usedSchemaToolsPractices.includes('Other') && (
            <OtherTextField id="used_schema_tools_practices_other" label="Please specify the tool or practice" value={formData.used_schema_tools_practices_other} error={errors.used_schema_tools_practices_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q125. Which type of tooling has been most effective in reducing schema evolution effort?" name="most_effective_migration_tooling" value={formData.most_effective_migration_tooling} options={effectiveToolingOptions} required onChange={onChange} error={errors.most_effective_migration_tooling} />
          {formData.most_effective_migration_tooling === 'Other' && (
            <OtherTextField id="most_effective_migration_tooling_other" label="Please specify the effective tooling type" value={formData.most_effective_migration_tooling_other} error={errors.most_effective_migration_tooling_other} onChange={onChange} />
          )}
        </ToolingGroup>

        <ToolingGroup title="2. Usefulness of key practices">
          <ScaleQuestion label="Q126. How useful are automated migration tools in reducing developer effort?" name="automated_migration_tool_usefulness" value={formData.automated_migration_tool_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.automated_migration_tool_usefulness} />
          <ScaleQuestion label="Q127. How useful are automated tests in reducing schema evolution risk?" name="automated_test_usefulness" value={formData.automated_test_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.automated_test_usefulness} />
          <ScaleQuestion label="Q128. How useful is API versioning for handling schema changes?" name="api_versioning_usefulness" value={formData.api_versioning_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.api_versioning_usefulness} />
          <ScaleQuestion label="Q129. How useful is an event schema registry for handling event/message schema changes?" name="event_schema_registry_usefulness" value={formData.event_schema_registry_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.event_schema_registry_usefulness} />
          <ScaleQuestion label="Q130. How useful are feature flags for reducing schema evolution deployment risk?" name="feature_flag_usefulness" value={formData.feature_flag_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.feature_flag_usefulness} />
          <ScaleQuestion label="Q131. How useful are backup and rollback plans during schema evolution?" name="rollback_backup_usefulness" value={formData.rollback_backup_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.rollback_backup_usefulness} />
          <ScaleQuestion label="Q132. How useful is documentation in reducing schema evolution effort?" name="documentation_usefulness" value={formData.documentation_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.documentation_usefulness} />
          <ScaleQuestion label="Q133. How useful are AI-assisted coding tools for schema evolution tasks?" name="ai_tool_usefulness" value={formData.ai_tool_usefulness} required leftLabel="1 = Not useful" rightLabel="5 = Very useful" onChange={onChange} error={errors.ai_tool_usefulness} />
        </ToolingGroup>

        <ToolingGroup title="3. AI-assisted tooling">
          <SelectQuestion label="Q134. Have you used AI tools such as ChatGPT, GitHub Copilot, Cursor, Codex, or similar tools to support schema migration or database-related development?" name="ai_tool_usage_frequency" value={formData.ai_tool_usage_frequency} options={aiUsageOptions} required onChange={onChange} error={errors.ai_tool_usage_frequency} />
          <CheckboxGroup label="Q135. If you have used or would consider using AI tools, which tasks can they support?" name="ai_tool_supported_tasks" values={aiToolSupportedTasks} options={aiTaskOptions} required onChange={onChange} error={errors.ai_tool_supported_tasks} />
          {aiToolSupportedTasks.includes('Other') && (
            <OtherTextField id="ai_tool_supported_tasks_other" label="Please specify the AI-supported task" value={formData.ai_tool_supported_tasks_other} error={errors.ai_tool_supported_tasks_other} onChange={onChange} />
          )}
          <SelectQuestion label="Q136. How much would you trust AI-generated output for schema evolution work without human review?" name="ai_tool_trust_level" value={formData.ai_tool_trust_level} options={trustOptions} required onChange={onChange} error={errors.ai_tool_trust_level} />
        </ToolingGroup>

        <ToolingGroup title="4. Productivity hacks and checklist practices">
          <TextareaQuestion label="Q137. What is one practical productivity hack your team uses during schema changes?" name="team_productivity_hack" value={formData.team_productivity_hack} onChange={onChange} placeholder="Examples: dual-write fields temporarily, keep backward-compatible APIs, use feature flags, avoid destructive changes, create migration checklists, use staging data snapshots, add schema change reviews, or run dry-run migrations." />
          <SelectQuestion label="Q138. Does your team use a schema change checklist or review process?" name="schema_change_checklist_usage" value={formData.schema_change_checklist_usage} options={checklistUsageOptions} required onChange={onChange} error={errors.schema_change_checklist_usage} />
          <CheckboxGroup label="Q139. Which items should be included in an effective schema change checklist?" name="recommended_schema_change_checklist_items" values={recommendedChecklistItems} options={checklistItemOptions} required onChange={onChange} error={errors.recommended_schema_change_checklist_items} />
          {recommendedChecklistItems.includes('Other') && (
            <OtherTextField id="recommended_schema_change_checklist_items_other" label="Please specify the checklist item" value={formData.recommended_schema_change_checklist_items_other} error={errors.recommended_schema_change_checklist_items_other} onChange={onChange} />
          )}
        </ToolingGroup>

        <ToolingGroup title="5. Organizational improvement and tooling gaps">
          <SelectQuestion label="Q140. What should organizations improve first to make schema evolution less painful?" name="organization_improvement_priority" value={formData.organization_improvement_priority} options={improvementOptions} required onChange={onChange} error={errors.organization_improvement_priority} />
          {formData.organization_improvement_priority === 'Other' && (
            <OtherTextField id="organization_improvement_priority_other" label="Please specify the organizational improvement priority" value={formData.organization_improvement_priority_other} error={errors.organization_improvement_priority_other} onChange={onChange} />
          )}
          <TextareaQuestion label="Q141. In your experience, what is the biggest tooling gap in schema evolution for microservice systems?" name="tooling_gap_observation" value={formData.tooling_gap_observation} onChange={onChange} placeholder="You may refer to migration tools, multi-database coordination, event schema compatibility, testing, rollback, documentation, AI assistance, or analytics pipeline validation." />
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
