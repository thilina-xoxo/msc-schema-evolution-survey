import ScaleQuestion from './ScaleQuestion'

function DiagramCard({ title, description, src, caption, showTitle = true }) {
  return (
    <figure className="diagram-frame compact-diagram">
      {showTitle && <h3>{title}</h3>}
      <p>{description}</p>
      <div className="image-diagram-wrap">
        <img src={src} alt={title} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
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
      <h2>Section 3: Baseline Understanding of Reference Architecture</h2>
      <p className="section-intro">
        The following reference architecture context is provided before the
        scenario-based questions.
      </p>

      <div className="section-three-layout">
        <article className="section-three-card">
          <h3>Reference Company Context</h3>
          <p>
            This survey uses a hypothetical EU-based microservice company
            system called ModaVista Group to evaluate schema evolution under
            two persistence strategies: Polyglot Persistence and Multi-Model
            Persistence.
          </p>
          <p>
            The company contains domain-oriented teams such as Customer
            Identity and Trust, Catalogue Intelligence, Checkout and Orders,
            Stock and Fulfilment, Personalization and Discovery, Search
            Experience, Platform Reliability, and Data Platform and Analytics.
          </p>
          <p>
            These teams can be modelled as microservice teams. Each team owns a
            bounded context, and services communicate mainly through
            asynchronous events such as CustomerUpdated, ProductChanged,
            OrderPlaced, and StockReserved.
          </p>
        </article>

        <article className="section-three-card persistence-card">
          <h3>Persistence Layer Model A: Polyglot Persistence</h3>
          <p>
            Polyglot Persistence means using different database technologies
            for different domain or workload requirements.
          </p>
          <p>
            For example, a bounded context may need both a relational database
            for transactional records and a NoSQL document database for
            flexible profile or catalogue data. In that case, the team may use
            two separate database technologies inside its own service boundary.
          </p>
          <p>
            In this model, different teams may use different database products
            depending on their domain needs.
          </p>

          <DiagramCard
            title="Persistence Layer Model A: Polyglot Persistence"
            description="Diagram: Polyglot persistence data-layer diagram."
            src="/diagrams/Polyglot%20diagram.png"
            caption="Figure 1. ModaVista Group: Polyglot Persistence Data-Layer Reference Architecture"
            showTitle={false}
          />
        </article>

        <article className="section-three-card persistence-card">
          <h3>Persistence Layer Model B: Multi-Model Persistence</h3>
          <p>
            Multi-Model Persistence means using a database platform that
            supports multiple data models, such as document, graph, key-value,
            and relational/tabular models, within the same database platform.
          </p>
          <p>
            If ModaVista is modelled using Multi-Model Persistence, some domain
            teams can take advantage of this when their bounded context requires
            multiple data models. For example, one team may use document data
            for product details and graph data for relationships within the
            same database platform.
          </p>
          <p>
            However, this does not mean every team must use multiple models.
            Some teams may still use only one data model if their domain
            requirement is simple.
          </p>
          <p>
            The important point is that service ownership still remains with
            the domain team. Other teams should not directly access another
            team’s internal collections, tables, or graph structures. They
            should interact through APIs or events.
          </p>

          <DiagramCard
            title="Persistence Layer Model B: Multi-Model Persistence"
            description="Diagram: Multi-model persistence data-layer diagram."
            src="/diagrams/multimodel.png"
            caption="Figure 2. ModaVista Group: Multi-Model Persistence Data-Layer Reference Architecture"
            showTitle={false}
          />
        </article>
      </div>

      <div className="question-section compact-question-section">
        <h3>Section 3 Questions</h3>
        <ScaleQuestion
          label="Q14. How clear is the difference between Polyglot Persistence and Multi-Model Persistence usage for ModaVista’s persistence-layer implementation?"
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
