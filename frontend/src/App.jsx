import { useState } from "react";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const PROJECT_TYPE = "Multi-Agent AI";
const PROJECT_SUBJECT = "Support Reply Team";
const DOMAIN_SUMMARY = "Customer support often involves repetitive tasks like categorizing tickets and drafting replies based on common issues. This project automates these initial steps using a collaborative AI agent team, improving efficiency and response times for support agents. It focuses on handling common, well-documented queries, allowing human agents to focus on complex or unique customer problems.";
const USER_PERSONA = "Support Agent Sarah: Sarah is a customer support agent who frequently receives common customer inquiries. She wants a tool that can quickly categorize tickets and provide a first draft of a reply, referencing relevant information, so she can review, refine, and send it faster. She values accuracy, context, and efficiency.";
const STARTER_QUESTIONS = ["How would you integrate this system with an existing CRM?", "What are the challenges of making AI-generated replies sound human and empathetic?", "How can you improve the knowledge base search accuracy for agents?"];

export default function App() {
  const [question, setQuestion] = useState(STARTER_QUESTIONS[0]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Request failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">{PROJECT_TYPE}</p>
        <h1>{PROJECT_SUBJECT}</h1>
        <p>{DOMAIN_SUMMARY}</p>
        <p className="persona">Built for: {USER_PERSONA}</p>
      </section>

      <section className="workspace">
        <form onSubmit={submit} className="panel question-panel">
          <label htmlFor="question">Question or task</label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows="7"
          />
          <button disabled={loading}>{loading ? "Running..." : "Run assistant"}</button>
          <div className="starter-list">
            {STARTER_QUESTIONS.map((item) => (
              <button type="button" key={item} className="starter" onClick={() => setQuestion(item)}>{item}</button>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="panel result-panel">
          <h2>Answer</h2>
          {!result && <p className="muted">The answer, sources, and agent timeline will appear here.</p>}
          {result && (
            <>
              <p className="answer">{result.answer}</p>
              <h3>Sources</h3>
              <div className="source-list">
                {result.sources.map((source) => (
                  <article key={`${source.title}-${source.score}`} className="source">
                    <strong>{source.title}</strong>
                    <span>Score {source.score}</span>
                    <p>{source.snippet}</p>
                  </article>
                ))}
              </div>
              <h3>Agent timeline</h3>
              <ol className="timeline">
                {result.steps.map((step) => (
                  <li key={step.step}>
                    <strong>{step.step}</strong>
                    <span>{step.status}</span>
                    <p>{step.detail}</p>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
