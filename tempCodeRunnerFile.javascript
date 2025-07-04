import React, { useState, useEffect } from "react";

const ExamApp = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60 * 60); // 60 minutes
  const [answers, setAnswers] = useState({ 1: "", 2: "", 3: "" });

  const tasks = {
    1: {
      title: "Tâche 1",
      instruction:
        "Il s'agit de rédiger un message, un courriel ou une annonce adressé à un ou plusieurs destinataires dans le but d'inviter, décrire, raconter, informer ou exprimer une demande.\n\nJe cherche un vélo en bon état et bon marché. Contactez-moi par courriel : mathieu@gmail.com Vous avez un vélo à vendre. Vous écrivez un courriel pour décrire votre vélo et proposer un prix. Vous lui donnez un rendez-vous pour essayer le vélo.",
      wordRange: "60-80 mots"
    },
    2: {
      title: "Tâche 2",
      instruction:
        "Vous avez participé à un concours pour gagner un séjour de deux semaines dans votre ville préférée. Le thème de ce concours est “Mon artiste préféré“. Écrivez un article de blog pour parler de votre artiste préféré.",
      wordRange: "120-150 mots"
    },
    3: {
      title: "Tâche 3",
      instruction:
        "La Chasse Aux Animaux : Pour Ou Contre ? Rédigez un texte argumentatif qui présente votre opinion.",
      wordRange: "120-180 mots"
    },
  };

  // Timer effect
  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const handleStartExam = () => setStartTime(Date.now());

  const handleSaveAnswer = (taskId) => {
    alert(`Réponse pour ${tasks[taskId].title} sauvegardée !`);
  };

  const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!startTime) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl mb-6 font-bold">Choisissez une combinaison</h1>
        <button
          onClick={handleStartExam}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 text-lg hover:bg-blue-700 transition"
        >
          Commencer l’examen
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Timer */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold text-red-600">
          ⏱ Temps restant : {formatTime(remainingTime)}
        </div>
        {/* Task Selector */}
        <select
          value={selectedTask || ""}
          onChange={(e) => setSelectedTask(Number(e.target.value))}
          className="border rounded p-2 text-lg"
        >
          <option value="" disabled>Choisissez une tâche</option>
          {Object.keys(tasks).map((key) => (
            <option key={key} value={key}>
              {tasks[key].title}
            </option>
          ))}
        </select>
      </div>

      {selectedTask ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {/* Task Title */}
          <h2 className="text-2xl font-bold mb-4">{tasks[selectedTask].title}</h2>
          {/* Task Instruction */}
          <p className="whitespace-pre-line text-gray-700 mb-6">
            {tasks[selectedTask].instruction}
          </p>

          {/* Writing Area */}
          <textarea
            value={answers[selectedTask]}
            onChange={(e) =>
              setAnswers({ ...answers, [selectedTask]: e.target.value })
            }
            className="w-full border rounded-xl p-4 h-64 text-lg mb-4"
            placeholder="Écrivez votre texte ici..."
          />

          {/* Word Counter */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              Nombre de mots : {wordCount(answers[selectedTask])} mots
            </span>
            <span className="text-gray-500 text-sm italic">
              Recommandé : {tasks[selectedTask].wordRange}
            </span>
          </div>

          {/* Save Button */}
          <button
            onClick={() => handleSaveAnswer(selectedTask)}
            className="bg-green-600 text-white rounded-lg px-6 py-3 text-lg hover:bg-green-700 transition"
          >
            Sauvegarder
          </button>
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center mt-8">
          Veuillez choisir une tâche pour commencer.
        </p>
      )}
    </div>
  );
};

export default ExamApp;
