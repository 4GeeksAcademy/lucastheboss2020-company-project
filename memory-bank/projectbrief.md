# Project Brief

## Company Summary
PAB Restoration is a New York masonry and waterproofing company focused on protecting and preserving building exteriors through pointing, caulking, and waterproofing services.

## Business Context
The company needs one technical core where public web presence, internal operations, reusable business rules, and future backend/automation work can evolve together.

## Primary Users
- Property owners and potential clients: interact with the public website and contact/application flows.
- Internal operations team: uses backoffice views to understand jobs, revenue, labor costs, and validation status.
- Engineering/AI agents: use governance, memory-bank context, and reusable skills to implement changes consistently.

## Core Business Problems
- Project artifacts existed as separate pieces without shared operating rules.
- New implementation work risked duplicating business logic and introducing inconsistent behavior.
- Agents lacked required startup context and explicit workflow constraints.

## Product Objectives
The monorepo must centralize and standardize:
- public website and lead capture
- internal operational tooling
- reusable business logic and data rules
- future APIs, agents, and automations

## Current Milestone Objective
Convert the repository from disconnected milestone artifacts into a cohesive monorepo foundation with:
- agent governance (AGENTS and .agents rules)
- persistent project memory (memory-bank)
- reusable skill definitions (skills)
- Next.js + TypeScript frontends under uis
- clear backend boundary under services

## Business Constraints
- Preserve company visual identity and service narrative on the public site.
- Respect the domain model and validation rules from CONTEXT.
- Reuse Milestone 2 logic by import (no duplication).
