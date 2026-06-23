# Generation Notes

Mode: ai

Model: gemini / gemini-2.5-flash

Fallback reason: OpenAI limit reached. Automatically switched to Gemini.

Architecture: Content Writing Team

Template path: templates/multi-agent-ai/content-writing-team

Short description:

An AI-powered multi-agent system to assist support teams by categorizing incoming tickets and drafting initial replies using a knowledge base.

Architecture notes:

- For a beginner project, SQLite is chosen for simplicity and zero-configuration setup. The LLM provider can be a cloud-based API (requiring API keys, which are external to this blueprint) or a local LLM run via a lightweight server. Vector database for KB is optional but recommended for better retrieval, a simple in-memory or file-backed vector store is sufficient. The multi-agent system will reside within the FastAPI application for direct control and easier debugging. Frontend will display ticket states and agent-generated outputs. Communication is primarily RESTful HTTP.

Project planner agent workflow:

- Architecture Agent: Define app boundaries, data flow, runtime stack, and integration points. Outputs: 
- Backend Agent: Design FastAPI modules, service contracts, validation, and error handling. Outputs: 
- Frontend Agent: Design React screens, state flow, controls, and user feedback states. Outputs: 
- Database Agent: Design persistence models, sample data, indexes, and audit records. Outputs: 
- Testing Agent: Define contract tests, smoke tests, and generated project validation. Outputs: 
