# Routing Rules — Which Agents to Engage

## Purpose

This file guides the Chief Architect in selecting which agents to consult for a given request. Engaging unnecessary agents wastes cycles; missing a relevant agent risks blind spots.

## Primary Routing Table

| Request Topic | Domain Agents | Cross-Cut Agents |
|---|---|---|
| New application adoption | Application, Integration, Tech & Infra | Security, Risk & Compliance |
| Application decommission | Application, Integration, Business | Risk & Compliance |
| Cloud migration | Tech & Infra, Application, Integration | Security, Risk & Compliance |
| New integration / API | Integration, Application | Security |
| Business capability mapping | Business | — |
| Strategy-to-technology alignment | Business, Application, Tech & Infra | — |
| Data platform or data governance | Data & AI, Application, Integration | Security, Risk & Compliance |
| AI/ML initiative | Data & AI, Application, Tech & Infra | Security, Risk & Compliance, Red Team |
| Security architecture review | (all relevant domain agents) | Security (lead), Risk & Compliance |
| Regulatory compliance assessment | Business, Application | Risk & Compliance (lead), Security |
| Technology radar update | Application, Tech & Infra, Integration, Data & AI | — |
| Reference architecture creation | All domain agents | Security, Risk & Compliance, Red Team |
| Major platform replacement | All domain agents | All cross-cut agents |
| Vendor / SaaS evaluation | Application, Integration, Tech & Infra | Security, Risk & Compliance |
| Incident-driven architecture review | Tech & Infra, Application | Security (lead), Risk & Compliance, Red Team |
| OT connectivity / IIoT / Industry 4.0 | **Manufacturing & OT**, Integration, Tech & Infra | Security, Risk & Compliance |
| MES / SCADA / DCS change | **Manufacturing & OT** | Security |
| Plant historian integration | **Manufacturing & OT**, Integration, Data & AI | Security |
| EDA infrastructure / HPC cluster | **R&D & EDA**, Tech & Infra | Security, Risk & Compliance |
| PLM change or digital thread | **R&D & EDA**, Integration, Application | Security |
| Research data management / ELN | **R&D & EDA**, Data & AI | Security, Risk & Compliance |
| Export-controlled system or data | **R&D & EDA** | Security, Risk & Compliance (always) |
| External R&D collaboration | **R&D & EDA**, Integration | Security, Risk & Compliance |
| Predictive maintenance (plant) | **Manufacturing & OT**, Data & AI, Tech & Infra | Security |
| Lab / instrument connectivity | **R&D & EDA**, **Manufacturing & OT** (if GMP lab), Integration | Security |

## Routing Logic

```
IF impact = Minor:
    → Consult 1–2 most relevant domain agents only
    → Skip cross-cut agents unless topic is security-sensitive

IF impact = Standard:
    → Consult all relevant domain agents
    → Always include Security
    → Include Risk & Compliance if regulatory/risk keywords present

IF impact = Major:
    → Consult all relevant domain agents
    → Always include Security + Risk & Compliance
    → Consider Red Team if proposal is novel or high-stakes

IF impact = Critical:
    → Engage full council (all domain + all cross-cut agents)
    → Red Team is mandatory
    → Human sponsor review is mandatory before finalizing
```

## Keyword Signals for Cross-Cut Agents

### Always include Security if request mentions:
- authentication, authorization, identity, IAM, SSO, OAuth
- data encryption, key management, TLS/HTTPS
- external-facing systems, public APIs, internet exposure
- cloud egress, network perimeter, firewall
- personal data, PII, sensitive data classification
- zero-trust, micro-segmentation
- SaaS onboarding, third-party access

### Always include Risk & Compliance if request mentions:
- GDPR, NIS2, SOX, ISO 27001, DORA, PCI-DSS
- data residency, data sovereignty, cross-border transfer
- audit trail, logging, regulatory reporting
- vendor risk, third-party dependency
- business continuity, disaster recovery
- risk appetite, tolerance, waiver, exception

### Always include Manufacturing & OT if request mentions:
- OT, ICS, SCADA, DCS, HMI, PLC, RTU, fieldbus, historian
- MES, MOM, production scheduling, batch management
- IIoT, OPC UA, MQTT, Modbus, industrial protocol
- plant floor, shop floor, control room, production line
- Purdue model, IT/OT convergence, OT network, DMZ
- Safety Instrumented System, SIS, ESD, fire & gas
- Industry 4.0, Smart Factory, digital twin (manufacturing)
- GxP manufacturing, FDA manufacturing, ISO 22000, ISO 13485 (manufacturing)

### Always include R&D & EDA if request mentions:
- EDA, RTL, synthesis, place & route, FPGA, ASIC, chip design
- CAD, CAE, CAM, FEA, CFD, simulation (engineering)
- PLM, Teamcenter, Windchill, Enovia, PDM, product structure
- HPC, high-performance compute, simulation cluster, Slurm
- ELN, LIMS, laboratory informatics, research data
- ITAR, EAR, dual-use, export control, technology control plan
- R&D, research, pre-competitive IP, patent, invention disclosure
- DesignSync, Perforce (EDA context), Cadence, Synopsys, Mentor

### Always include Red Team if request mentions:
- new AI system or autonomous agent
- irreversible architectural change
- single point of failure in critical path
- "we're confident this is safe" (flag groupthink)
- novel architecture pattern not in reference architectures

## Ambiguous Requests

If the request topic is unclear:
1. Ask the requester one clarifying question (topic + impact level)
2. Make a provisional routing decision and state it
3. Adjust routing if new information changes the scope
