import ScaleQuestion from './ScaleQuestion'

const teams = [
  'Customer Identity and Trust Team',
  'Catalogue Intelligence Team',
  'Checkout and Orders Team',
  'Stock and Fulfilment Team',
  'Personalization and Discovery Team',
  'Search Experience Team',
  'Platform Reliability Team',
  'Data Platform and Analytics Team',
]

const principles = [
  'Database-per-service ownership',
  'Domain-driven service boundaries',
  'API-first integration',
  'Event-driven integration',
  'Independent deployment',
  'Continuous delivery',
  'Schema evolution discipline',
  'Separation of operational and analytical data',
]

function CompactList({ items }) {
  return (
    <ul className="compact-list-grid">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ConceptCard({ title, children }) {
  return (
    <article className="concept-card">
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

function DiagramCard({ title, description, src, caption }) {
  return (
    <figure className="diagram-frame compact-diagram">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="iframe-wrap">
        <iframe src={src} title={title} />
      </div>
      <figcaption>{caption}</figcaption>
      <a href={src} target="_blank" rel="noreferrer">
        Open diagram in a new tab
      </a>
    </figure>
  )
}

function SectionThreeArchitecture({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <section>
      <h2>Section 3 — Baseline Understanding of Reference Architecture</h2>
      <p className="section-intro">
        This survey uses a hypothetical microservice-based company system to
        evaluate schema evolution under two persistence strategies: Polyglot
        Persistence and Multi-Model Persistence.
      </p>
      <p className="section-intro">
        The following architecture overview is provided only to give enough
        context before the later scenario-based questions.
      </p>

      <div className="section-three-compact">
        <div className="concept-card-grid">
          <ConceptCard title="Architecture A — Polyglot Persistence">
            In Polyglot Persistence, different microservices use different
            database technologies based on their workload. For example, one
            service may use a document database, another may use a relational
            database, and another may use a graph database. This provides
            technology specialization but can increase coordination, tooling,
            and migration complexity during schema evolution.
          </ConceptCard>
          <ConceptCard title="Architecture B — Multi-Model Persistence">
            In Multi-Model Persistence, services use a unified operational
            database platform that supports multiple data models such as
            document, relational/tabular, graph, and key-value models. This can
            reduce operational fragmentation, but service ownership, API
            contracts, event schemas, and data governance still need careful
            management.
          </ConceptCard>
        </div>

        <article className="compact-context-card">
          <h3>ModaVista Group Reference System</h3>
          <p>
            ModaVista Group is a fictional fashion-commerce platform used as
            the reference system for this survey. It contains several
            domain-aligned microservices such as customer, product, order,
            inventory, fulfilment, returns, recommendation, personalization,
            search, and experience API services.
          </p>
          <p>
            The system is evaluated under two different persistence strategies,
            while the business domain and service boundaries remain the same.
          </p>
        </article>

        <article className="compact-context-card">
          <h3>Engineering Teams</h3>
          <CompactList items={teams} />
        </article>

        <article className="compact-context-card">
          <h3>Architectural Principles</h3>
          <CompactList items={principles} />
        </article>

        <DiagramCard
          title="Architecture A — Polyglot Persistence"
          description="Polyglot architecture shows service-owned operational databases using different database technologies such as document, relational, key-value, graph, and search-oriented stores."
          src="/diagrams/modavista_arch_v3_clean.html"
          caption="Figure 1. ModaVista Group — Polyglot Persistence Reference Architecture"
        />

        <DiagramCard
          title="Architecture B — Multi-Model Persistence"
          description="Multi-Model architecture shows service-owned logical data models managed through a unified operational persistence platform, while search and analytics remain separate supporting capabilities."
          src="/diagrams/modavista_multimodel_v2_clean.html"
          caption="Figure 2. ModaVista Group — Multi-Model Persistence Reference Architecture"
        />
      </div>

      <div className="question-section compact-question-section">
        <h3>Section 3 Questions</h3>
        <ScaleQuestion
          label="Q14. How clear is the reference architecture context?"
          name="architecture_context_clarity"
          value={formData.architecture_context_clarity}
          required
          leftLabel="1 = Not clear"
          rightLabel="5 = Very clear"
          onChange={onChange}
          error={errors.architecture_context_clarity}
        />
        <ScaleQuestion
          label="Q15. How clear is the difference between Polyglot Persistence and Multi-Model Persistence?"
          name="architecture_difference_clarity"
          value={formData.architecture_difference_clarity}
          required
          leftLabel="1 = Not clear"
          rightLabel="5 = Very clear"
          onChange={onChange}
          error={errors.architecture_difference_clarity}
        />
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

export default SectionThreeArchitecture
