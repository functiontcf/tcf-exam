import React, { useState, useEffect } from "react";
import "./App.css";

const tasksData = {
  "Combinaison 1": {
    T1: { title: "Tâche 1", description: "Rédigez un message...", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Écrivez un article...", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Sujet argumentatif...", wordRange: "120-180 mots" },
  },
  // Ajoute ici les autres combinaisons comme avant...
};

function App() {
  const [selectedCombinaison, setSelectedCombinaison] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [texts, setTexts] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timerActive && timeLeft === 0) {
      handleAutoSaveAll();
    }
  }, [timeLeft, timerActive]);

  const handleStartExam = () => {
    setExamStarted(true);
    setTimerActive(true);
  };

  const handleSave = () => {
    if (!selectedCombinaison || !selectedTask) return;
    const text = texts[selectedTask] || "";
    const element = document.createElement("a");
    const file = new Blob([`Combinaison: ${selectedCombinaison}\nTâche: ${selectedTask}\n\n${text}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedCombinaison}_${selectedTask}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleAutoSaveAll = () => {
    let allText = `Combinaison: ${selectedCombinaison}\n\n`;
    Object.keys(tasksData[selectedCombinaison] || {}).forEach((taskKey) => {
      allText += `----- ${taskKey} -----\n${texts[taskKey] || "(vide)"}\n\n`;
    });
    const element = document.createElement("a");
    const file = new Blob([allText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedCombinaison}_autosave.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const wordCount = (texts[selectedTask] || "").trim().split(/\s+/).filter(Boolean).length;
  const currentTask = selectedCombinaison && selectedTask ? tasksData[selectedCombinaison][selectedTask] : null;

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Examen TCF - Production Écrite</h1>

      {examStarted && (
        <div style={{ fontSize: "20px", color: timeLeft <= 300 ? "red" : "black", marginBottom: 20 }}>
          ⏰ Temps restant: {formatTime(timeLeft)}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label>Choisir une combinaison:</label>
        <select value={selectedCombinaison} onChange={(e) => {
          setSelectedCombinaison(e.target.value);
          setSelectedTask("");
          setTexts({});
          setTimeLeft(60 * 60);
          setTimerActive(false);
          setExamStarted(false);
        }}>
          <option value="">-- Sélectionnez --</option>
          {Object.keys(tasksData).map((comb, idx) => (
            <option key={idx} value={comb}>{comb}</option>
          ))}
        </select>
      </div>

      {selectedCombinaison && (
        <div style={{ marginBottom: 20 }}>
          <label>Choisir une tâche:</label>
          <select value={selectedTask} onChange={(e) => {
            setSelectedTask(e.target.value);
          }}>
            <option value="">-- Sélectionnez --</option>
            {Object.keys(tasksData[selectedCombinaison]).map((taskKey, idx) => (
              <option key={idx} value={taskKey}>{tasksData[selectedCombinaison][taskKey].title}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCombinaison && selectedTask && !examStarted && (
        <button onClick={handleStartExam} style={{ padding: "10px 20px", marginBottom: 20 }}>
          🟢 Commencer l'examen
        </button>
      )}

      {currentTask && examStarted && (
        <>
          <h3>{currentTask.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{currentTask.description} ({currentTask.wordRange})</p>

          <textarea
            value={texts[selectedTask] || ""}
            onChange={(e) => setTexts({ ...texts, [selectedTask]: e.target.value })}
            placeholder="Écrivez votre réponse ici..."
            rows={10}
            style={{ width: "100%", fontSize: "16px" }}
            disabled={timeLeft === 0}
          />

          <div style={{ marginTop: 10 }}>
            Mots: {wordCount} / {currentTask.wordRange}
          </div>

          <button onClick={handleSave} style={{ marginTop: 20, padding: "10px 20px" }} disabled={timeLeft === 0}>
            Sauvegarder
          </button>

          {timeLeft === 0 && (
            <div style={{ color: "red", marginTop: 20 }}>
              ⛔ Temps écoulé ! Sauvegarde automatique effectuée.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
