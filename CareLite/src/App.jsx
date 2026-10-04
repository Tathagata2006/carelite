import { useState } from "react";
import "./App.css";

function IntakeScreen({ onBack, onSaved }) {
  const [patientStory, setPatientStory] = useState("");
  const [inputMode, setInputMode] = useState("text");
  const [patientText, setPatientText] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const demoText =
    "I have had fever for two days and I feel very weak. I have taken paracetamol.";

  const handleDemo = () => {
    setPatientText(demoText);
  };

  const handleAnalyze = () => {
    if (patientText.trim()) {
      setShowAnalysis(true);
    }
  };

  const handleSave = () => {
    const newCase = {
      id: `P${Date.now()}`,
      complaint: "Fever",
      duration: "2 days",
      symptom: "Weakness",
      medication: "Paracetamol",
      status: "Human review",
      savedAt: new Date().toISOString(),
    };

    const existingCases =
      JSON.parse(localStorage.getItem("carelite_cases")) || [];

    localStorage.setItem(
      "carelite_cases",
      JSON.stringify([newCase, ...existingCases])
    );

    onSaved();
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✚</div>
          <div>
            <h1>CareLite</h1>
            <p>Offline Primary Care Assistant</p>
          </div>
        </div>

        <div className="topbar-right">
          <div className="connection-status">
            <span className="status-dot"></span>
            Offline Mode
          </div>
        </div>
      </header>

      <main className="dashboard intake-page">
        <button className="back-button" onClick={onBack}>
          ← Back to dashboard
        </button>

        <div className="intake-heading">
          <p className="eyebrow">NEW PATIENT</p>
          <h2>Patient intake</h2>
          <p className="subtitle">
            Tell us the patient's story. CareLite will structure the information
            for the health worker.
          </p>
        </div>

        <section className="intake-card">
          <div className="input-mode-tabs">
            <button
              className={inputMode === "voice" ? "active" : ""}
              onClick={() => setInputMode("voice")}
            >
              🎙 Voice
            </button>

            <button
              className={inputMode === "text" ? "active" : ""}
              onClick={() => setInputMode("text")}
            >
              ⌨ Text
            </button>
          </div>

          {inputMode === "voice" ? (
            <div className="voice-box">
              <div className="voice-circle">🎙</div>
              <h3>Voice intake</h3>
              <p>
                Local-language voice input will run on this device.
              </p>

              <button
                className="secondary-button"
                onClick={() => setInputMode("text")}
              >
                Use text instead
              </button>
            </div>
          ) : (
            <div>
              <div className="textarea-header">
                <label>Patient's story</label>

                <button className="demo-button" onClick={handleDemo}>
                  Use demo case
                </button>

                <button
                  type="button"
                  className="demo-button"
                  onClick={() =>
                    setPatientStory(
                      "मुझे दो दिन से बुखार और कमजोरी है। मैंने पैरासिटामोल लिया है।"
                    )
                  }
                >
                  Use Hindi demo
                </button>
              </div>

              <textarea
                value={patientStory}
                onChange={(e) =>
                  setPatientStory(e.target.value)
                }
                placeholder="Type what the patient says here..."
              />

              <p className="input-help">
                Example: "I have had fever for two days and I feel very weak."
              </p>
            </div>
          )}

          <div className="intake-actions">
            <div className="offline-note">
              <span>✓</span>
              Works without internet
            </div>

            <button
              type="button"
              className="analyze-button"
              onClick={handleAnalyze}
            >
              Analyze case →
            </button>
          </div>
        </section>

        {showAnalysis && (
          <section className="analysis-card">
            <div className="analysis-header">
              <div>
                <p className="eyebrow">AI-ASSISTED EXTRACTION</p>
                <h3>Structured case</h3>
              </div>

              <span className="review-badge">Human verification required</span>
            </div>

            <div className="case-fields">
              <div className="case-field">
                <span>Chief complaint</span>
                <strong>Fever</strong>
              </div>

              <div className="case-field">
                <span>Duration</span>
                <strong>2 days</strong>
              </div>

              <div className="case-field">
                <span>Additional symptom</span>
                <strong>Weakness</strong>
              </div>

              <div className="case-field">
                <span>Medication reported</span>
                <strong>Paracetamol</strong>
              </div>
            </div>

            <div className="missing-info">
              <div className="missing-icon">!</div>

              <div>
                <strong>Information to verify</strong>
                <p>
                  Age, temperature and medication details should be confirmed
                  by the health worker.
                </p>
              </div>
            </div>

            <div className="verification-actions">
              <button className="secondary-button">
                Edit information
              </button>

              <button className="confirm-button" onClick={handleSave}>
                Verify & save case
              </button>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>
          CareLite · AI-assisted care, with the health worker always in control.
        </p>
      </footer>
    </div>
  );
}

function Dashboard({ onStartIntake }) {
  const [cases, setCases] = useState(() => {
    return JSON.parse(localStorage.getItem("carelite_cases")) || [];
  });
  
  const [language, setLanguage] = useState("English");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✚</div>

          <div>
            <h1>CareLite</h1>
            <p>Offline Primary Care Assistant</p>
          </div>
        </div>

        <div className="topbar-right">
          <div className="connection-status">
            <span className="status-dot"></span>
            Offline Mode
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
            <option>Swahili</option>
          </select>
        </div>
      </header>

      <main className="dashboard">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">FRONTLINE HEALTH WORKER</p>
            <h2>Good afternoon</h2>

            <p className="subtitle">
              Capture, verify and manage patient cases even without internet.
            </p>
          </div>

          <div className="sync-card">
            <span className="sync-icon">↻</span>

            <div>
              <strong>Ready to work offline</strong>
              <p>All changes will sync when connected.</p>
            </div>
          </div>
        </section>

        <section className="primary-action">
          <div className="primary-icon">🎙️</div>

          <div className="primary-content">
            <p className="eyebrow">NEW PATIENT</p>

            <h3>Start patient intake</h3>

            <p>
              Record the patient's story using voice or text. CareLite will
              structure the information for you.
            </p>
          </div>

          <button className="start-button" onClick={onStartIntake}>
            Start Intake
            <span>→</span>
          </button>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">QUICK ACTIONS</p>
              <h3>Manage your cases</h3>
            </div>
          </div>

          <div className="action-grid">
            <button className="action-card" onClick={onStartIntake}>
              <div className="action-icon">👤</div>

              <div>
                <strong>New Patient</strong>
                <p>Start a new case</p>
              </div>
            </button>

            <button className="action-card">
              <div className="action-icon">📋</div>

              <div>
                <strong>Saved Cases</strong>
                <p>View offline records</p>
              </div>
            </button>

            <button className="action-card">
              <div className="action-icon">📍</div>

              <div>
                <strong>Referral</strong>
                <p>Find nearby facilities</p>
              </div>
            </button>

            <button className="action-card">
              <div className="action-icon">✓</div>

              <div>
                <strong>Follow-ups</strong>
                <p>Review pending cases</p>
              </div>
            </button>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h3>Recent cases</h3>
            </div>

            <button className="view-all">View all →</button>
          </div>

          <div className="cases-card">
            {cases.length === 0 ? (
              <div className="empty-sync">
                <span>✓</span>
                <p>No saved cases yet</p>
              </div>
            ) : (
              <>
                {cases.slice(0, 5).map((patient) => (
                  <div className="case-row" key={patient.id}>
                    <div className="patient-avatar">
                      P
                    </div>

                    <div className="case-info">
                      <strong>Patient {patient.id}</strong>
                      <p>
                        {patient.complaint} · {patient.duration}
                      </p>
                    </div>

                    <div className="case-status review">
                      {patient.status}
                    </div>

                    <span className="case-time">
                      Saved
                    </span>
                  </div>
                ))}

                <div className="empty-sync">
                  <span>✓</span>
                  <p>Cases saved securely on this device</p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>
          CareLite · AI-assisted care, with the health worker always in control.
        </p>
      </footer>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("dashboard");

  const handleSaved = () => {
    setScreen("dashboard");
  };

  return screen === "dashboard" ? (
    <Dashboard onStartIntake={() => setScreen("intake")} />
  ) : (
    <IntakeScreen
      onBack={() => setScreen("dashboard")}
      onSaved={handleSaved}
    />
  );
}

export default App;