import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import ScaleQuestion from './ScaleQuestion'

const architectureUnderstandingOptions = [
  'I clearly understand both architectures and the role of the analytical data platform',
  'I understand Architecture A: Polyglot Persistence better',
  'I understand Architecture B: Multi-Model Persistence better',
  'I understand the service architectures, but the analytical data platform is less clear',
  'I have a basic understanding, but I can continue',
  'I do not understand the difference clearly',
]

const operationalComplexityOptions = [
  'Architecture A: Polyglot Persistence',
  'Architecture B: Multi-Model Persistence',
  'Both appear equally complex',
  'It depends on the implementation',
  'I am not sure',
]

const schemaReasoningOptions = [
  'Architecture A: Polyglot Persistence',
  'Architecture B: Multi-Model Persistence',
  'Both appear equally easy',
  'It depends on the change type',
  'I am not sure',
]

const downstreamImpactOptions = [
  'API contract changes',
  'Event payload changes',
  'Database migration changes',
  'Search index changes',
  'Data lake / data warehouse pipeline changes',
  'BI dashboard/reporting changes',
  'ML feature dataset changes',
  'Cross-team coordination',
  'Deployment sequencing',
  'Testing and validation effort',
  'I am not sure',
  'Other',
]

const teams = [
  {
    name: 'Customer Identity and Trust Team (CIT Team)',
    responsibilities: [
      'customer registration',
      'login and authentication',
      'customer profile management',
      'customer address book',
      'communication preferences',
      'language and regional preferences',
      'privacy and consent preferences',
      'GDPR-related customer data operations',
    ],
    servicesLabel: 'Main service',
    services: ['Customer Service'],
  },
  {
    name: 'Catalogue Intelligence Team (CAT Team)',
    responsibilities: [
      'product master data',
      'product variants',
      'product categories',
      'brand information',
      'product size and color metadata',
      'pricing metadata',
      'regional product availability',
      'product enrichment for search and discovery',
    ],
    servicesLabel: 'Main service',
    services: ['Product Catalogue Service'],
  },
  {
    name: 'Checkout and Orders Team (COT Team)',
    responsibilities: [
      'cart management',
      'checkout workflow',
      'order creation',
      'order state transitions',
      'payment reference handling',
      'invoice metadata',
      'customer order history',
    ],
    servicesLabel: 'Main services',
    services: ['Cart Service', 'Order Service', 'Payment Reference Service'],
  },
  {
    name: 'Stock and Fulfilment Team (SFT Team)',
    responsibilities: [
      'warehouse stock levels',
      'stock reservation',
      'shipment planning',
      'delivery tracking',
      'return initiation',
      'return status tracking',
      'replenishment signals',
    ],
    servicesLabel: 'Main services',
    services: ['Inventory Service', 'Fulfilment Service', 'Returns Service'],
  },
  {
    name: 'Personalization and Discovery Team (PDT Team)',
    responsibilities: [
      'personalized product recommendations',
      'customer behaviour modelling',
      'product similarity relationships',
      '"customers also bought" suggestions',
      'campaign targeting support',
      'recommendation feedback loops',
    ],
    servicesLabel: 'Main services',
    services: ['Recommendation Service', 'Personalization Service'],
  },
  {
    name: 'Search Experience Team (SET Team)',
    responsibilities: [
      'product search',
      'filtering',
      'search indexing',
      'ranking signals',
      'autocomplete',
      'product discovery APIs',
      'search result optimization',
    ],
    servicesLabel: 'Main services',
    services: ['Search Service', 'Experience API Service'],
  },
  {
    name: 'Platform Reliability Team (PRT Team)',
    responsibilities: [
      'CI/CD pipelines',
      'observability',
      'infrastructure automation',
      'database provisioning',
      'deployment standards',
      'security policies',
      'backup and recovery standards',
      'monitoring and alerting',
      'incident response support',
    ],
    servicesLabel: 'Main responsibilities',
    services: [
      'Kubernetes platform',
      'cloud infrastructure',
      'monitoring dashboards',
      'release automation',
      'database governance support',
      'production reliability standards',
    ],
  },
  {
    name: 'Data Platform and Analytics Team (DPA Team)',
    responsibilities: [
      'data lake / lakehouse management',
      'data warehouse modelling',
      'event ingestion pipelines',
      'ETL/ELT pipelines',
      'data quality monitoring',
      'analytical dataset preparation',
      'reporting and dashboard support',
      'customer behaviour analytics',
      'product performance analytics',
      'inventory forecasting',
      'campaign performance analysis',
      'ML feature dataset preparation',
    ],
    servicesLabel: 'Main platforms',
    services: [
      'Data Lake / Lakehouse',
      'Data Warehouse',
      'BI and Reporting Layer',
      'ML Feature Store / Analytical Dataset Layer',
    ],
  },
]

const principles = [
  {
    title: 'Database-per-service ownership',
    text: 'Each microservice owns its operational data. Other services cannot directly modify another service’s database. Data is exposed through APIs or events.',
  },
  {
    title: 'Domain-driven service boundaries',
    text: 'Services are aligned with business domains such as customer, product, order, inventory, fulfilment, search, recommendation, and analytics.',
  },
  {
    title: 'API-first integration',
    text: 'Synchronous communication between services happens through REST, GraphQL, or internal APIs.',
  },
  {
    title: 'Event-driven integration',
    text: 'Important business state changes are published as domain events such as CustomerRegistered, CustomerProfileUpdated, ProductUpdated, PriceChanged, OrderCreated, OrderCancelled, InventoryReserved, ShipmentDispatched, ReturnRequested, and CustomerConsentChanged.',
  },
  {
    title: 'Independent deployment',
    text: 'Each team can deploy its services independently, provided that API contracts, event contracts, and data compatibility are maintained.',
  },
  {
    title: 'Continuous delivery',
    text: 'Services are deployed using automated CI/CD pipelines with testing, monitoring, rollback procedures, and production release controls.',
  },
  {
    title: 'Schema evolution discipline',
    text: 'Database schema changes, API changes, event schema changes, and analytical pipeline changes must be planned carefully because downstream services, dashboards, ML datasets, and reporting pipelines may depend on existing structures.',
  },
  {
    title: 'Separation of operational and analytical data',
    text: 'Operational service databases are used for real-time business transactions. The central data platform is used for analytics, reporting, forecasting, experimentation, and machine learning. The data platform is not treated as the operational source of truth for microservice transactions.',
  },
]

const services = [
  ['Customer Service', 'CIT Team', 'Customer identity, profile, preferences', 'customer ID, name, email, addresses, language, preferences'],
  ['Product Catalogue Service', 'CAT Team', 'Product and variant data', 'product ID, SKU, brand, size, color, category'],
  ['Cart Service', 'COT Team', 'Temporary shopping cart state', 'cart ID, customer ID, product items, quantity'],
  ['Order Service', 'COT Team', 'Order lifecycle', 'order ID, customer ID, order lines, order status'],
  ['Payment Reference Service', 'COT Team', 'Payment references and invoice metadata', 'payment reference, invoice ID, payment status'],
  ['Inventory Service', 'SFT Team', 'Stock and reservations', 'SKU, warehouse ID, available quantity'],
  ['Fulfilment Service', 'SFT Team', 'Shipment and delivery', 'shipment ID, order ID, delivery status'],
  ['Returns Service', 'SFT Team', 'Product return workflow', 'return ID, order ID, reason, refund status'],
  ['Recommendation Service', 'PDT Team', 'Product and customer relationship modelling', 'viewed products, similar products, customer-product graph'],
  ['Personalization Service', 'PDT Team', 'Customer preference modelling', 'customer preferences, behaviour signals'],
  ['Search Service', 'SET Team', 'Search index and filtering', 'indexed product documents, keywords, filters'],
  ['Experience API Service', 'SET Team', 'Aggregated frontend API', 'customer view, product details, order summaries'],
]

const relationshipExamples = [
  'A customer places many orders.',
  'An order contains many product items.',
  'Product items must be checked against inventory.',
  'A payment reference belongs to an order.',
  'Fulfilment depends on order and inventory status.',
  'Returns depend on order history and delivery status.',
  'Recommendations depend on customer behaviour and product similarity.',
  'Search results depend on product catalogue updates.',
  'Customer preferences may influence personalization, recommendations, and campaign targeting.',
  'Analytical reports depend on customer, product, order, inventory, fulfilment, returns, and campaign data.',
]

const schemaImpactChannels = [
  'API contracts',
  'event payloads',
  'read models',
  'replicated data',
  'search indexes',
  'reporting views',
  'ETL/ELT pipelines',
  'analytical tables',
  'ML feature datasets',
  'integration tests',
  'business rule validations',
  'deployment sequencing',
  'monitoring and rollback plans',
]

const analyticsMechanisms = [
  'domain events',
  'change data capture',
  'ETL/ELT pipelines',
  'scheduled data exports',
  'streaming ingestion',
]

const analyticsUses = [
  'executive dashboards',
  'sales and revenue reporting',
  'product performance analytics',
  'customer behaviour analysis',
  'inventory forecasting',
  'return-rate analysis',
  'campaign performance analysis',
  'recommendation model training',
  'data quality monitoring',
]

const polyglotExamples = [
  'Customer profile data is stored in a document database.',
  'Orders are stored in a relational database for transactional consistency.',
  'Product catalogue data is stored using relational and document-style structures.',
  'Recommendations are stored in a graph database.',
  'Search data is stored in a search index.',
  'Carts and sessions are stored in a key-value store.',
  'Inventory and fulfilment data are stored in a relational database.',
  'Analytical data is collected asynchronously into a central data lakehouse and warehouse.',
]

const polyglotStrengths = [
  'MongoDB supports flexible customer profile structures.',
  'PostgreSQL/MySQL support structured product and order data.',
  'Redis provides fast cart and session access.',
  'Elasticsearch/OpenSearch supports fast product search and filtering.',
  'Neo4j supports graph-based recommendation logic.',
  'A relational inventory database supports stock and fulfilment consistency.',
  'A central data lakehouse and warehouse support analytics, BI, and ML.',
]

const polyglotChangeImpacts = [
  'MongoDB documents',
  'PostgreSQL/MySQL tables',
  'Redis cached objects',
  'Elasticsearch/OpenSearch indexes',
  'Neo4j nodes and relationships',
  'API response models',
  'event payloads',
  'downstream consumers',
  'ETL/ELT pipelines',
  'analytical warehouse tables',
  'BI dashboards',
  'ML feature datasets',
  'testing pipelines',
  'deployment sequencing',
]

const multiModelExamples = [
  'Customer profiles are stored using a document model.',
  'Orders are stored using structured collections or relational-style tables.',
  'Product relationships and recommendations are stored using graph features.',
  'Cart and session-like data are stored using key-value or document structures.',
  'Product search projections may still be optimized separately using a search index if required.',
  'Analytical data is still collected into a central lakehouse and warehouse for reporting and ML.',
]

const multiModelAdvantages = [
  'common governance model',
  'unified backup and recovery strategy',
  'more consistent access control',
  'reduced operational overhead',
  'reduced need to maintain many database engines',
  'easier cross-model query support in some cases',
  'more centralized schema evolution visibility',
  'more consistent database provisioning and monitoring',
  'simpler data extraction into the analytical platform',
]

const multiModelChangeNeeds = [
  'API changes',
  'event schema changes',
  'data migration',
  'consumer compatibility checks',
  'deployment coordination',
  'regression testing',
  'team communication',
  'release planning',
  'updates to analytical pipelines',
  'dashboard validation',
  'ML feature dataset updates',
]

const differenceRows = [
  ['Operational database strategy', 'Different databases for different services', 'One unified operational database platform supporting multiple models'],
  ['Technology diversity', 'High', 'Medium to low'],
  ['Operational complexity', 'Higher due to many database engines', 'Lower due to unified platform'],
  ['Service autonomy', 'High', 'Medium to high, depending on governance'],
  ['Database specialization', 'Very strong', 'Moderate to strong'],
  ['Cross-model querying', 'Usually handled in application/services', 'May be supported by unified query layer'],
  ['Schema migration tooling', 'Different tools per database', 'More centralized tooling may be possible'],
  ['Cognitive load', 'Higher when developers handle many technologies', 'Lower for infrastructure, but logical complexity remains'],
  ['Coordination need', 'High when changes cross service boundaries', 'Still high when changes cross service boundaries'],
  ['Analytical data layer', 'Data lakehouse/warehouse populated from multiple operational databases and events', 'Data lakehouse/warehouse populated from unified platform and events'],
  ['Main schema evolution risk', 'Fragmentation across multiple database technologies and analytical pipelines', 'Shared platform coupling, governance complexity, and analytical dependency updates'],
  ['Typical benefit', 'Best-fit database per service', 'Unified governance and reduced operational fragmentation'],
  ['Typical concern', 'Multiple engines, tools, and skills required', 'Risk of logical coupling inside one platform'],
]

function BulletList({ items, columns = false }) {
  return (
    <ul className={columns ? 'reading-list columns' : 'reading-list'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ReadingBlock({ title, children }) {
  return (
    <article className="reading-block">
      <h3>{title}</h3>
      {children}
    </article>
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
      <h2>Section 3 — Baseline Understanding of the Reference Architecture</h2>
      <p className="section-intro">
        Please read the architecture context before answering the understanding
        questions at the end of this section.
      </p>

      <div className="reading-section">
        <ReadingBlock title="1. Purpose of this section">
          <p>
            This section introduces the reference system that will be used in
            the scenario-based questions that follow. Later sections will ask
            participants to evaluate schema evolution tasks under two different
            persistence strategies:
          </p>
          <BulletList
            items={[
              'Architecture A — Polyglot Persistence',
              'Architecture B — Multi-Model Persistence',
            ]}
          />
          <p>
            The business domain, services, engineering teams, business
            workflows, and analytical data platform remain the same in both
            architectures. The main difference is how the operational
            persistence layer is designed and managed.
          </p>
        </ReadingBlock>

        <ReadingBlock title="2. Company Background Story">
          <p>
            ModaVista Group is a leading European fashion distributor and
            digital commerce platform operating across multiple countries. The
            company supplies clothing, footwear, accessories, and lifestyle
            products through online storefronts, mobile applications, partner
            boutiques, and regional fulfilment networks.
          </p>
          <p>
            ModaVista’s business model is similar to large-scale digital
            fashion-commerce platforms where customer experience, product
            discovery, personalization, stock accuracy, fulfilment speed, return
            handling, and campaign targeting directly influence business
            success.
          </p>
          <p>ModaVista serves:</p>
          <BulletList
            columns
            items={[
              'millions of registered customers across Europe',
              'multiple regional online storefronts',
              'partner fashion brands and suppliers',
              'warehouses and fulfilment centers',
              'mobile and web applications',
              'customer support and return-processing teams',
              'marketing and campaign-management teams',
              'business intelligence and executive reporting teams',
            ]}
          />
          <p>
            The company originally operated a large monolithic commerce
            platform. Over time, the platform became difficult to scale,
            release, and modify. Business capabilities such as customer
            profiles, product catalogues, orders, recommendations, payments,
            fulfilment, returns, and analytics were tightly coupled through a
            shared database and a shared release cycle.
          </p>
          <p>
            To improve agility, ModaVista migrated to a microservice
            architecture. Each major business capability is now owned by an
            independent domain-aligned engineering team. The goal is to allow
            teams to deploy independently, choose suitable technologies, and
            evolve their services according to business needs while maintaining
            reliable service contracts, data quality, and strong governance.
          </p>
        </ReadingBlock>

        <ReadingBlock title="3. Engineering Division">
          <p>
            ModaVista Group has a mature engineering division organized into
            long-lived, domain-aligned engineering teams. Each team owns one or
            more microservices and is responsible for design, development,
            testing, deployment, monitoring, and operational support of its
            services.
          </p>
          <div className="team-grid">
            {teams.map((team) => (
              <div className="team-card" key={team.name}>
                <h4>{team.name}</h4>
                <p className="card-label">Responsibilities</p>
                <BulletList items={team.responsibilities} />
                <p className="card-label">{team.servicesLabel}</p>
                <BulletList items={team.services} />
              </div>
            ))}
          </div>
        </ReadingBlock>

        <ReadingBlock title="4. Shared Architectural Principles">
          <div className="principle-grid">
            {principles.map((principle) => (
              <div className="principle-card" key={principle.title}>
                <h4>{principle.title}</h4>
                <p>{principle.text}</p>
              </div>
            ))}
          </div>
        </ReadingBlock>

        <ReadingBlock title="5. Core Business Services">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Owning Team</th>
                  <th>Responsibility</th>
                  <th>Example Data</th>
                </tr>
              </thead>
              <tbody>
                {services.map(([service, team, responsibility, example]) => (
                  <tr key={service}>
                    <td>{service}</td>
                    <td>{team}</td>
                    <td>{responsibility}</td>
                    <td>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReadingBlock>

        <ReadingBlock title="6. Common Data Relationships">
          <p>
            Although each service owns its own data, real business workflows
            require relationships across services.
          </p>
          <p>Examples:</p>
          <BulletList columns items={relationshipExamples} />
          <p>Therefore, schema changes in one service can affect other services through:</p>
          <BulletList columns items={schemaImpactChannels} />
        </ReadingBlock>

        <ReadingBlock title="7. Central Data and Analytics Platform">
          <p>
            In addition to operational microservice databases, ModaVista
            maintains a central data and analytics platform. This platform is
            owned by the Data Platform and Analytics Team (DPA Team) and is
            used for business intelligence, reporting, forecasting,
            experimentation, and machine learning workloads.
          </p>
          <p>
            The central data platform receives data from operational services
            through asynchronous mechanisms such as:
          </p>
          <BulletList columns items={analyticsMechanisms} />
          <p>The platform supports:</p>
          <BulletList columns items={analyticsUses} />
          <div className="info-box">
            <h4>Important clarification</h4>
            <p>
              This central data layer is not used as the operational database
              for microservice transactions. Each microservice still owns its
              operational data and exposes it through APIs or events. The data
              warehouse or lakehouse is used mainly for analytical and
              decision-support workloads.
            </p>
          </div>
          <p>
            Schema evolution may affect both operational systems and analytical
            pipelines. For example, changing customer_id, product_id,
            product_category, or customer profile structure may require updates
            not only in service databases and APIs, but also in data ingestion
            pipelines, analytical tables, dashboards, and ML datasets.
          </p>
        </ReadingBlock>

        <ReadingBlock title="8. Architecture A — Polyglot Persistence">
          <p>
            In the Polyglot Persistence version of the ModaVista platform, each
            service team chooses the database technology that best fits its
            workload. This gives teams flexibility and allows each service to
            optimize for its own data access pattern.
          </p>
          <p>Examples:</p>
          <BulletList columns items={polyglotExamples} />
          <p>
            This architecture is professionally designed and technically valid.
            It gives strong database specialization, but it also introduces
            technology diversity across teams.
          </p>
        </ReadingBlock>

        <figure className="diagram-frame">
          <div className="iframe-wrap">
            <iframe
              src="/diagrams/modavista_arch_v3_clean.html"
              title="ModaVista Group Polyglot Persistence Reference Architecture"
            />
          </div>
          <figcaption>
            Figure 1. ModaVista Group — Polyglot Persistence Reference
            Architecture
          </figcaption>
          <a
            href="/diagrams/modavista_arch_v3_clean.html"
            target="_blank"
            rel="noreferrer"
          >
            Open diagram in a new tab
          </a>
        </figure>

        <ReadingBlock title="10. Important characteristics of Architecture A">
          <p>
            This architecture is technically strong because each service uses
            the most suitable database for its workload.
          </p>
          <p>Examples:</p>
          <BulletList columns items={polyglotStrengths} />
          <p>
            However, schema evolution may become complex because changes must
            be coordinated across different database technologies, query
            languages, migration mechanisms, service teams, and analytical
            pipelines.
          </p>
          <p>
            For example, changing customer_id, product_id, customer profile
            structure, or product variant structure may affect:
          </p>
          <BulletList columns items={polyglotChangeImpacts} />
        </ReadingBlock>

        <ReadingBlock title="11. Architecture B — Multi-Model Persistence">
          <p>
            In the Multi-Model Persistence version of the ModaVista platform,
            the company uses a unified multi-model database platform. The
            platform supports multiple data models such as document, graph,
            key-value, and relational-style structures within one database
            ecosystem.
          </p>
          <p>
            The services still keep logical ownership of their data. Each team
            remains responsible for its own service boundaries, APIs, event
            contracts, and data lifecycle. However, instead of managing many
            separate operational database engines, the company uses one unified
            persistence platform.
          </p>
          <p>Examples:</p>
          <BulletList columns items={multiModelExamples} />
          <p>
            This architecture is also professionally designed and technically
            valid. It reduces operational fragmentation, but service ownership,
            API contracts, event contracts, and distributed business logic still
            remain.
          </p>
        </ReadingBlock>

        <figure className="diagram-frame">
          <div className="diagram-placeholder">
            <h4>Architecture B — Multi-Model Persistence Diagram</h4>
            <p>
              The Multi-Model Persistence diagram will be added in the next
              development phase. This space is reserved to keep the survey
              structure consistent.
            </p>
          </div>
          <figcaption>
            Figure 2. ModaVista Group — Multi-Model Persistence Reference
            Architecture
          </figcaption>
        </figure>

        <ReadingBlock title="13. Important characteristics of Architecture B">
          <p>
            This architecture is technically strong because it reduces
            operational fragmentation. Instead of maintaining many independent
            operational database engines, ModaVista uses a unified persistence
            platform that supports multiple data models.
          </p>
          <p>Potential advantages:</p>
          <BulletList columns items={multiModelAdvantages} />
          <p>
            However, schema evolution may still be complex because service
            boundaries, API contracts, event payloads, business ownership, and
            analytical dependencies remain distributed.
          </p>
          <p>
            For example, even if customer data and order data are stored within
            the same multi-model platform, the Customer Identity and Trust Team
            and the Checkout and Orders Team still own different services.
            Therefore, changing a shared identifier or restructuring customer
            data may still require:
          </p>
          <BulletList columns items={multiModelChangeNeeds} />
        </ReadingBlock>

        <ReadingBlock title="14. Key Difference Table">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Architecture A — Polyglot Persistence</th>
                  <th>Architecture B — Multi-Model Persistence</th>
                </tr>
              </thead>
              <tbody>
                {differenceRows.map(([aspect, polyglot, multiModel]) => (
                  <tr key={aspect}>
                    <td>{aspect}</td>
                    <td>{polyglot}</td>
                    <td>{multiModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReadingBlock>

        <ReadingBlock title="15. Important clarification for respondents">
          <div className="info-box">
            <p>
              Both architectures are considered professionally designed and
              technically valid.
            </p>
            <p>
              This survey does not assume that one architecture is always
              better than the other. Instead, the purpose is to understand how
              each architecture affects developer effort, cognitive load,
              coordination, risk, and productivity when schema changes occur.
            </p>
            <p>
              The central data platform is included because it is realistic for
              an enterprise fashion-commerce company. However, it should not be
              interpreted as a shared operational database. It is used mainly
              for analytics, BI, forecasting, experimentation, and ML.
            </p>
            <p>
              Please answer based on how you would reason about the scenario as
              a practitioner.
            </p>
          </div>
        </ReadingBlock>
      </div>

      <div className="question-section">
        <h3>Section 3 Questions</h3>
        <ScaleQuestion
          label="Q14. How clear is the business and technical context of ModaVista Group?"
          name="architecture_context_clarity"
          value={formData.architecture_context_clarity}
          required
          leftLabel="1 = Not clear"
          rightLabel="5 = Very clear"
          onChange={onChange}
          error={errors.architecture_context_clarity}
        />
        <ScaleQuestion
          label="Q15. How clear is the difference between Architecture A: Polyglot Persistence and Architecture B: Multi-Model Persistence?"
          name="architecture_difference_clarity"
          value={formData.architecture_difference_clarity}
          required
          leftLabel="1 = Not clear"
          rightLabel="5 = Very clear"
          onChange={onChange}
          error={errors.architecture_difference_clarity}
        />
        <ScaleQuestion
          label="Q16. How clear is the role of the central Data Lakehouse / Data Warehouse in the architecture?"
          name="analytics_layer_clarity"
          value={formData.analytics_layer_clarity}
          required
          leftLabel="1 = Not clear"
          rightLabel="5 = Very clear"
          onChange={onChange}
          error={errors.analytics_layer_clarity}
        />
        <RadioGroup
          label="Q17. Which statement best describes your understanding before continuing?"
          name="architecture_understanding"
          value={formData.architecture_understanding}
          options={architectureUnderstandingOptions}
          required
          onChange={onChange}
          error={errors.architecture_understanding}
        />
        <RadioGroup
          label="Q18. Based on the architecture descriptions, which architecture appears more operationally complex?"
          name="perceived_operational_complexity"
          value={formData.perceived_operational_complexity}
          options={operationalComplexityOptions}
          required
          onChange={onChange}
          error={errors.perceived_operational_complexity}
        />
        <RadioGroup
          label="Q19. Based on the architecture descriptions, which architecture appears easier for developers to reason about during schema changes?"
          name="perceived_schema_reasoning_ease"
          value={formData.perceived_schema_reasoning_ease}
          options={schemaReasoningOptions}
          required
          onChange={onChange}
          error={errors.perceived_schema_reasoning_ease}
        />
        <CheckboxGroup
          label="Q20. In your opinion, what additional downstream impact could schema evolution have in this architecture?"
          name="perceived_downstream_impacts"
          values={formData.perceived_downstream_impacts}
          options={downstreamImpactOptions}
          required
          onChange={onChange}
          error={errors.perceived_downstream_impacts}
        />
        {formData.perceived_downstream_impacts.includes('Other') && (
          <div
            className={`question nested ${
              errors.perceived_downstream_impacts_other ? 'has-error' : ''
            }`}
          >
            <label
              className="question-label"
              htmlFor="perceived_downstream_impacts_other"
            >
              Please specify the downstream impact
              <span className="required"> *</span>
            </label>
            <input
              id="perceived_downstream_impacts_other"
              name="perceived_downstream_impacts_other"
              type="text"
              value={formData.perceived_downstream_impacts_other}
              onChange={(event) =>
                onChange('perceived_downstream_impacts_other', event.target.value)
              }
            />
            {errors.perceived_downstream_impacts_other && (
              <p className="error-message">
                {errors.perceived_downstream_impacts_other}
              </p>
            )}
          </div>
        )}
        <div className="question">
          <label className="question-label" htmlFor="biggest_architecture_challenge">
            Q21. Briefly explain your understanding of the biggest architectural
            challenge in this system.
          </label>
          <textarea
            id="biggest_architecture_challenge"
            name="biggest_architecture_challenge"
            value={formData.biggest_architecture_challenge}
            onChange={(event) =>
              onChange('biggest_architecture_challenge', event.target.value)
            }
            rows="5"
          />
        </div>
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

export default SectionThreeArchitecture
