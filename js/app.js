// Preguntas del cuestionario: cada respuesta correcta se indica por su índice.
const questions = [
  {
    pregunta: '¿Qué significa "desacoplar" en arquitectura de software?',
    opciones: [
      "Hacer que todos los componentes dependan entre sí.",
      "Separar responsabilidades para que las partes puedan cambiar con independencia.",
      "Eliminar toda comunicación entre los componentes.",
      "Usar una sola tecnología para toda la aplicación."
    ],
    respuestaCorrecta: 1,
    explicacion: "Desacoplar es reducir dependencias directas y definir acuerdos claros entre componentes."
  },
  {
    pregunta: "¿Cuál es un beneficio principal de la arquitectura desacoplada?",
    opciones: [
      "Cada cambio requiere desplegar toda la aplicación.",
      "Evita la necesidad de probar el software.",
      "Permite evolucionar o escalar componentes de forma independiente.",
      "Hace innecesarias las interfaces entre servicios."
    ],
    respuestaCorrecta: 2,
    explicacion: "Con límites y contratos claros, algunas partes pueden evolucionar o escalar sin modificar todo el sistema."
  },
  {
    pregunta: "¿Qué tipo de arquitectura es un ejemplo de desacoplamiento?",
    opciones: [
      "Una aplicación donde cada módulo comparte todas sus variables internas.",
      "Una arquitectura de microservicios que se comunica mediante APIs.",
      "Una aplicación sin separación entre interfaz y lógica.",
      "Un único bloque de código sin límites definidos."
    ],
    respuestaCorrecta: 1,
    explicacion: "Los microservicios suelen ser un ejemplo: servicios separados colaboran mediante interfaces explícitas. No son la única forma de desacoplar."
  },
  {
    pregunta: "¿Qué permite la separación frontend/backend?",
    opciones: [
      "Que la interfaz y la lógica del servidor evolucionen por separado usando un contrato de comunicación.",
      "Que el frontend acceda directamente a todos los datos privados.",
      "Que ambos lados deban escribirse en el mismo lenguaje.",
      "Que desaparezcan las pruebas de integración."
    ],
    respuestaCorrecta: 0,
    explicacion: "El frontend y el backend pueden cambiar de forma independiente si respetan el contrato, como una API."
  },
  {
    pregunta: "¿Cuál NO es una ventaja del desacoplamiento?",
    opciones: [
      "Poder reutilizar algunos servicios.",
      "Facilitar cambios localizados.",
      "Aumentar automáticamente la complejidad de coordinar componentes.",
      "Elegir herramientas distintas cuando el diseño lo permite."
    ],
    respuestaCorrecta: 2,
    explicacion: "La coordinación adicional es un reto posible, no una ventaja. El desacoplamiento no elimina la complejidad y requiere buen diseño."
  },
  {
    pregunta: "¿Qué rol cumple una API en la arquitectura desacoplada?",
    opciones: [
      "Define una forma acordada para que los componentes intercambien información.",
      "Reemplaza a todos los componentes del sistema.",
      "Obliga a que dos servicios compartan su código interno.",
      "Impide que un componente use otro servicio."
    ],
    respuestaCorrecta: 0,
    explicacion: "Una API establece un contrato de comunicación sin exigir que los componentes conozcan todos sus detalles internos."
  }
];

const quizPanel = document.querySelector("#quizPanel");
const questionCounter = document.querySelector("#questionCounter");
const liveScore = document.querySelector("#liveScore");
const progressBar = document.querySelector("#quizProgress");
const progressTrack = document.querySelector(".quiz-progress");
const questionText = document.querySelector("#questionText");
const answerList = document.querySelector("#answerList");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextQuestion");
const quizResult = document.querySelector("#quizResult");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answered = false;

function updateProgress(answeredCount) {
  const percentage = (answeredCount / questions.length) * 100;
  progressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", String(answeredCount));
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  currentQuestionIndex = Math.min(currentQuestionIndex, questions.length - 1);
  answered = false;
  questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
  liveScore.textContent = `${correctAnswers} ${correctAnswers === 1 ? "correcta" : "correctas"}`;
  questionText.textContent = question.pregunta;
  questionText.setAttribute("tabindex", "-1");
  answerList.replaceChildren();
  feedback.hidden = true;
  feedback.className = "feedback-box";
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestionIndex === questions.length - 1
    ? 'Ver resultado <i class="bi bi-arrow-right" aria-hidden="true"></i>'
    : 'Siguiente <i class="bi bi-arrow-right" aria-hidden="true"></i>';

  question.opciones.forEach((option, index) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const answerText = document.createElement("span");

    button.className = "answer-option";
    button.type = "button";
    button.dataset.answerIndex = String(index);
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    answerText.textContent = option;
    button.append(letter, answerText);
    answerList.append(button);
  });

  updateProgress(currentQuestionIndex);
}

function selectAnswer(selectedIndex) {
  if (answered) {
    return;
  }

  const question = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === question.respuestaCorrecta;
  answered = true;

  if (isCorrect) {
    correctAnswers += 1;
  }

  answerList.querySelectorAll(".answer-option").forEach((button, index) => {
    button.disabled = true;
    if (index === question.respuestaCorrecta) {
      button.classList.add("is-correct");
    } else if (index === selectedIndex) {
      button.classList.add("is-incorrect");
    }
  });

  feedback.classList.add(isCorrect ? "is-correct" : "is-incorrect");
  feedback.textContent = `${isCorrect ? "¡Correcto!" : "No exactamente."} ${question.explicacion}`;
  feedback.hidden = false;
  liveScore.textContent = `${correctAnswers} ${correctAnswers === 1 ? "correcta" : "correctas"}`;
  nextButton.disabled = false;
  updateProgress(currentQuestionIndex + 1);
}

function showResult() {
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  let message;

  if (percentage < 50) {
    message = "Sigue estudiando 📚";
  } else if (percentage <= 80) {
    message = "¡Buen trabajo! 👏";
  } else {
    message = "¡Experto en arquitectura desacoplada! 🏆";
  }

  quizPanel.hidden = true;
  quizResult.replaceChildren();
  quizResult.hidden = false;

  const icon = document.createElement("div");
  const heading = document.createElement("h3");
  const score = document.createElement("p");
  const restart = document.createElement("button");

  icon.className = "result-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = '<i class="bi bi-award"></i>';
  heading.textContent = message;
  heading.id = "resultHeading";
  score.className = "result-score";
  score.textContent = `Obtuviste ${correctAnswers} de ${questions.length} respuestas correctas (${percentage}%).`;
  restart.type = "button";
  restart.className = "btn btn-primary";
  restart.id = "restartQuiz";
  restart.innerHTML = 'Reiniciar Quiz <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>';
  quizResult.append(icon, heading, score, restart);
  heading.setAttribute("tabindex", "-1");
  heading.focus();
}

answerList.addEventListener("click", (event) => {
  const answerButton = event.target.closest(".answer-option");
  if (!answerButton || !answerList.contains(answerButton)) {
    return;
  }

  selectAnswer(Number(answerButton.dataset.answerIndex));
});

nextButton.addEventListener("click", () => {
  if (!answered) {
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    updateProgress(questions.length);
    showResult();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
  questionText.focus();
});

quizResult.addEventListener("click", (event) => {
  if (!event.target.closest("#restartQuiz")) {
    return;
  }

  currentQuestionIndex = 0;
  correctAnswers = 0;
  quizResult.hidden = true;
  quizPanel.hidden = false;
  renderQuestion();
  questionText.focus();
});

renderQuestion();

// El video puede añadirse después; si falta, se presenta una indicación clara.
const explanationVideo = document.querySelector("#explanationVideo");
const videoSource = explanationVideo.querySelector("source");
const videoPlaceholder = document.querySelector("#videoPlaceholder");

function showVideoPlaceholder() {
  explanationVideo.hidden = true;
  videoPlaceholder.hidden = false;
}

explanationVideo.addEventListener("error", showVideoPlaceholder);
videoSource.addEventListener("error", showVideoPlaceholder);
if (explanationVideo.error) {
  showVideoPlaceholder();
}

// La animación de entrada se activa solo cuando el navegador la puede observar.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-enabled");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Añade sombra a la barra fija después de desplazarse y mantiene el año actualizado.
const navbar = document.querySelector(".site-navbar");
function updateNavbarShadow() {
  navbar.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateNavbarShadow, { passive: true });
updateNavbarShadow();
document.querySelector("#currentYear").textContent = String(new Date().getFullYear());

// En móvil, cerrar el menú después de navegar a una sección.
document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#mainNav");
    if (menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
