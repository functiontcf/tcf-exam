import React, { useState, useEffect } from "react";
import "./App.css";

const tasksData = {
  "Combinaison 1": {
    T1: { title: "Tâche 1", description: "Rédigez un message pour inviter votre ami(e) à passer ses vacances dans votre ville.", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Vous avez participé à un concours pour gagner un séjour de deux semaines dans votre ville préférée. Écrivez un article de blog pour parler de votre artiste préféré.", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "La Chasse Aux Animaux : Pour Ou Contre ?", wordRange: "120-180 mots" },
  },
  "Combinaison 2": {
    T1: { title: "Tâche 1", description: "Salut, j’ai appris que tu vas à une salle de sport et qu’elle est magnifique. Peux-tu…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Vous avez lu sur un forum un débat concernant les formations en ligne. Écrivez un…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Les Produits Faits Maison : Pour Ou Contre ?", wordRange: "120-180 mots" },
  },
  "Combinaison 3": {
    T1: { title: "Tâche 1", description: "Votre ami(e) veut découvrir la région dans laquelle vous habitez. Écrivez-lui un…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Vous avez participé à un cours de sport dans une salle. Écrivez un article dans…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Livraison Des Repas Au Bureau : Pour Ou Contre ?", wordRange: "120-180 mots" },
  },
  "Combinaison 4": {
    T1: { title: "Tâche 1", description: "Vous allez déménager à Nice, en France. Vous écrivez un message sur le site…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Vous avez commencé à prendre des cours dans une école de langues. Vous…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Caméras De Surveillance : Pour Ou Contre ?", wordRange: "120-180 mots" },
  },
  "Combinaison 5": {
    T1: { title: "Tâche 1", description: "Votre amie Carole et sa famille prévoient de visiter votre ville prochainement…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Écrivez un article de blog pour partager votre expérience d’apprentissage…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Les Jeux Vidéo.", wordRange: "120-180 mots" },
  },
  "Combinaison 6": {
    T1: { title: "Tâche 1", description: "Salut ! Je sais que tu fais du sport depuis le mois dernier. Ça m’intéresse…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Tout quitter pour changer de vie ? Il y a deux ans, nous avons décidé…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Le Bien-être Au Travail.", wordRange: "120-180 mots" },
  },
  "Combinaison 7": {
    T1: { title: "Tâche 1", description: "Votre amie Jeanne envisage de visiter votre pays. Rédigez un message personnalisé…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Racontez votre expérience personnelle de participation à une émission…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "Égalité Homme/Femme en Milieu de Travail.", wordRange: "120-180 mots" },
  },
  "Combinaison 8": {
    T1: { title: "Tâche 1", description: "Je cherche un vélo en bon état et bon marché. Contactez-moi par courriel…", wordRange: "60-120 mots" },
    T2: { title: "Tâche 2", description: "Écrivez un message à vos amis pour leur partager votre expérience de travail…", wordRange: "120-150 mots" },
    T3: { title: "Tâche 3", description: "La Gratuité Des Transports En Commun : Pour Ou Contre ?", wordRange: "120-180 mots" },
  },
};

function App() {
  const [selectedCombinaison, setSelectedCombinaison] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, timerActive]);

  const startTimer = () => {
    if (!timerActive) setTimerActive(true);
  };

  useEffect(() => {
    setSelectedTask("");
    setText("");
    setTimeLeft(60 * 60);
    setTimerActive(false);
  }, [selectedCombinaison]);

  const handleSave = () => {
    const element = document.createElement("a");
    const file = new Blob([`Combinaison: ${selectedCombinaison}\nTâche: ${selectedTask}\n\n${text}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedCombinaison}_${selectedTask}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const currentTask = selectedCombinaison && selectedTask ? tasksData[selectedCombinaison][selectedTask] : null;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Examen TCF - Production Écrite</h1>

      {timerActive && (
        <div style={{ fontSize: "20px", color: timeLeft <= 300 ? "red" : "black", marginBottom: 20 }}>
          ⏰ Temps restant: {formatTime(timeLeft)}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label>Choisir une combinaison:</label>
        <select value={selectedCombinaison} onChange={(e) => setSelectedCombinaison(e.target.value)}>
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
            startTimer();
          }}>
            <option value="">-- Sélectionnez --</option>
            {Object.keys(tasksData[selectedCombinaison]).map((taskKey, idx) => (
              <option key={idx} value={taskKey}>{tasksData[selectedCombinaison][taskKey].title}</option>
            ))}
          </select>
        </div>
      )}

      {currentTask && (
        <>
          <h3>{currentTask.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{currentTask.description}</p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écrivez votre réponse ici..."
            rows={10}
            style={{ width: "100%", fontSize: "16px" }}
            disabled={timeLeft === 0}
          />

          <div style={{ marginTop: 10 }}>
            Mots: {wordCount} (conseillé: {currentTask.wordRange})
          </div>

          <button onClick={handleSave} style={{ marginTop: 20, padding: "10px 20px" }} disabled={timeLeft === 0}>
            Sauvegarder
          </button>

          {timeLeft === 0 && (
            <div style={{ color: "red", marginTop: 20 }}>
              ⛔ Temps écoulé ! Vous ne pouvez plus écrire.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
