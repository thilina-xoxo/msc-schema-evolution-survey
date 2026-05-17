# MSc Schema Evolution Survey

React + Vite survey application for an MSc research study on:

**Schema Evolution and Developer Productivity in Multi-Model and Polyglot Microservices**

The survey investigates how schema evolution affects developer productivity, engineering effort, cognitive load, coordination overhead, tooling practices, and delivery planning in microservice-based systems. It compares two persistence strategies:

- **Polyglot Persistence**: services use different operational database technologies based on workload.
- **Multi-Model Persistence**: services use a unified operational persistence platform that supports multiple data models.

## Research Context

This project supports MSc research in Computer Science, specialized in Software Architecture, at the Department of Computer Science and Engineering, Faculty of Engineering, University of Moratuwa.

The survey is designed to collect practitioner perspectives on:

- schema change effort and cognitive load
- perceived complexity across experience levels
- tooling and practices that reduce schema evolution risk
- coordination, planning, estimation, and delivery impact
- comparative suitability of Polyglot and Multi-Model persistence strategies

## Application Overview

The application is a single-page multi-step survey built with React and Vite. It uses local React state for survey responses and submits data to a Google Apps Script endpoint, which writes responses into Google Sheets.

The survey currently contains 10 steps:

1. Consent and Eligibility
2. Participant Background
3. Baseline Understanding of Reference Architecture
4. General Experience with Schema Evolution
5. Scenario-Based Evaluation: Polyglot Persistence
6. Scenario-Based Evaluation: Multi-Model Persistence
7. Comparative Evaluation of Polyglot and Multi-Model Persistence
8. Tooling, Practices, and Productivity Hacks
9. Managerial and Delivery Impact
10. Final Reflection

The final survey ends at **Q109**.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Google Apps Script
- Google Sheets

No TypeScript or external UI component libraries are used.

## Project Structure

```text
.
├── google-apps-script/
│   └── Code.gs
├── public/
│   └── diagrams/
│       ├── modavista_arch_v3_clean.html
│       └── modavista_multimodel_v2_clean.html
├── src/
│   ├── components/
│   ├── services/
│   │   └── submitSurvey.js
│   ├── utils/
│   │   └── participantId.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Data Submission

Survey responses are submitted through:

[src/services/submitSurvey.js](src/services/submitSurvey.js)

The payload includes a survey token, participant ID, and section-specific response objects. The Google Apps Script endpoint validates the token and writes responses into separate Google Sheet tabs.

Google Apps Script source:

[google-apps-script/Code.gs](google-apps-script/Code.gs)

Current sheet tabs include:

- `participant_background`
- `architecture_context`
- `schema_evolution_experience`
- `scenario_polyglot`
- `scenario_multimodel`
- `comparative_evaluation`
- `tooling_practices`
- `managerial_delivery_impact`
- `final_reflection`

The `participant_id` is used as the common linking key across tabs.

## Architecture Diagrams

The survey references two high-level architecture diagrams:

- Architecture A: Polyglot Persistence  
  [public/diagrams/modavista_arch_v3_clean.html](public/diagrams/modavista_arch_v3_clean.html)

- Architecture B: Multi-Model Persistence  
  [public/diagrams/modavista_multimodel_v2_clean.html](public/diagrams/modavista_multimodel_v2_clean.html)

These diagrams are used as reference context only. Participants are instructed to answer based on likely change impact radius and practical engineering judgement, rather than exact component counts.

## Privacy and Participation Notes

The survey introduction informs participants that:

- participation is voluntary
- participants may stop before final submission
- no personally identifiable information should be entered
- names, emails, phone numbers, organization names, company names, LinkedIn profiles, or other direct identifiers should not be included in free-text responses

The application generates a participant ID for linking section responses without asking for personal identifiers.

## Deployment Notes

Before publishing or deploying:

- confirm the Google Apps Script endpoint in `submitSurvey.js`
- confirm the Apps Script deployment is active
- confirm Google Sheet headers match `Code.gs`
- run `npm run build`
- test final submission end to end
- verify architecture diagram links open correctly
- verify mobile layout and readability

## Maintenance Notes

When changing survey questions, keep these aligned:

- `initialFormData` in `src/App.jsx`
- validation functions in `src/App.jsx`
- UI fields in `src/components/`
- payload structure in `src/services/submitSurvey.js`
- sheet headers in `google-apps-script/Code.gs`

Avoid changing field names after data collection begins unless the Google Sheet schema and analysis plan are updated at the same time.
