# EA Architecture Council — Multi-Agent Knowledge Base

A multi-agent AI system built on **Microsoft Copilot Studio** that simulates a functioning Enterprise Architecture Board with a Chief Architect orchestrator and 8 specialist domain agents.

## Architecture

```
                    ┌──────────────────────────────┐
                    │      Chief Architect Agent    │
                    │        (Orchestrator)         │
                    └──────┬───────────────┬────────┘
                           │               │
              ┌────────────┴───┐     ┌─────┴────────────┐
              │  Domain Agents │     │  Cross-Cut Agents │
              ├────────────────┤     ├───────────────────┤
              │ Business Arch  │     │ Security Arch     │
              │ Application    │     │ Risk & Compliance │
              │ Integration    │     │ Red Team          │
              │ Tech & Infra   │     │                   │
              │ Data & AI      │     │                   │
              └───────┬────────┘     └────────┬─────────┘
                      │                       │
              ┌───────┴───────────────────────┴─────────┐
              │           Shared Knowledge Layer         │
              │  ┌──────────┐  ┌───────────┐  ┌──────┐  │
              │  │ LeanIX   │  │ServiceNow │  │ File  │  │
              │  │  (MCP)   │  │  (API)    │  │ Store │  │
              │  └──────────┘  └───────────┘  └──────┘  │
              └─────────────────────────────────────────┘
```

## Repository Structure

```
├── council-config.md                  # Global council rules & configuration
├── orchestration/                     # Chief Architect orchestrator
│   ├── chief-architect.md             # System prompt & behaviour
│   ├── deliberation-protocol.md       # 6-phase deliberation process
│   ├── routing-rules.md               # Which agents to consult per topic
│   └── escalation-matrix.md           # When to escalate to humans
├── agents/                            # All 8 specialist agents
│   ├── business-architecture/         # Strategy & capability alignment
│   ├── application-architecture/      # Portfolio management & rationalization
│   ├── integration-architecture/      # APIs, events, middleware
│   ├── technology-infrastructure/     # Cloud, infra, DevOps
│   ├── data-ai/                       # Data governance & AI/ML strategy
│   ├── security/                      # Threat modeling, zero-trust (veto power)
│   ├── risk-compliance/               # Regulatory, risk appetite, GRC
│   └── red-team/                      # Adversarial review & assumption testing
├── shared/                            # Enterprise-wide knowledge
│   ├── architecture-principles.md     # 12 enterprise architecture principles
│   ├── tech-radar.md                  # Technology radar (ADOPT/TRIAL/ASSESS/HOLD)
│   ├── glossary.md                    # Common terminology
│   ├── standards/                     # ADR template, naming, documentation
│   └── reference-architectures/       # Cloud-native, integration patterns
└── copilot-studio/                    # Implementation guide (11 files)
    ├── 00-implementation-guide.md     # Overview & build order
    ├── 01-platform-overview.md        # Copilot Studio concepts mapped
    ├── 02-agent-topology.md           # Agent creation & wiring
    ├── 03-orchestrator-design.md      # Chief Architect config (paste-ready)
    ├── 04-sub-agent-design.md         # Sub-agent pattern + per-agent config
    ├── 05-leanix-mcp-integration.md   # SAP LeanIX MCP setup
    ├── 06-servicenow-integration.md   # ServiceNow REST + Power Automate flows
    ├── 07-prompt-injection-patterns.md # Knowledge layering strategy
    ├── 08-knowledge-sources.md        # SharePoint setup & Git sync
    ├── 09-testing-and-validation.md   # Test cases & go-live checklist
    └── 10-governance-and-operations.md # Monitoring, maintenance, evolution
```

Each agent has:
- `agent.md` — identity, scope, output format
- `policies.md` — mandatory and standard policies enforced
- `principles.md` — architectural principles for the domain
- `guidelines.md` — methodologies, frameworks, how-to guides

## Integrations

| System | Protocol | Purpose |
|---|---|---|
| SAP LeanIX | MCP (Model Context Protocol) | Application landscape, capabilities, interfaces, tech stack |
| ServiceNow | REST API via Power Automate | CMDB, change management, GRC risk register |

## Getting Started

See [`copilot-studio/00-implementation-guide.md`](copilot-studio/00-implementation-guide.md) for the full build guide.

## License

Internal use only.
