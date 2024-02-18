document.addEventListener("DOMContentLoaded", function () {
  afficherQuestion();
});

var questions = [
  {
    question: "Quelle est la capitale du Japon ?",
    choix: ["a) Pékin", "b) Tokyo", "c) Séoul", "d) Bangkok"],
    reponseCorrecte: "b",
  },
  {
    question: "Quel est le plus grand océan de la planète ?",
    choix: ["a) Océan Atlantique", "b) Océan Indien", "c) Océan Arctique", "d) Océan Pacifique"],
    reponseCorrecte: "d",
  },
  {
    question: 'Qui a écrit "Romeo et Juliette" ?',
    choix: ["a) Charles Dickens", "b) William Shakespeare", "c) Jane Austen", "d) Mark Twain"],
    reponseCorrecte: "b",
  },
  {
    question: "Quelle est la plus haute montagne du monde ?",
    choix: ["a) Mont Everest", "b) Mont Kilimandjaro", "c) Mont McKinley", "d) Mont Blanc"],
    reponseCorrecte: "a",
  },
  {
    question: "Quel est le plus grand désert du monde ?",
    choix: ["a) Désert du Sahara", "b) Désert de Gobi", "c) Désert de l'Arabie", "d) Désert d'Atacama"],
    reponseCorrecte: "a",
  },
  {
    question: "Quelle est la capitale de la France ?",
    choix: ["a) Rome", "b) Paris", "c) Berlin", "d) Londres"],
    reponseCorrecte: "b",
  },
  {
    question: "Qui a peint la Joconde ?",
    choix: ["a) Vincent van Gogh", "b) Pablo Picasso", "c) Leonardo da Vinci", "d) Michel-Ange"],
    reponseCorrecte: "c",
  },
  {
    question: "Quelle est la monnaie officielle du Japon ?",
    choix: ["a) Won", "b) Yen", "c) Yuan", "d) Baht"],
    reponseCorrecte: "b",
  },
  {
    question: "En quelle année a eu lieu la Première Guerre mondiale ?",
    choix: ["a) 1905-1910", "b) 1914-1918", "c) 1939-1945", "d) 1870-1871"],
    reponseCorrecte: "b",
  },
  {
    question: "Quel est le plus grand mammifère terrestre ?",
    choix: ["a) Éléphant d'Afrique", "b) Girafe", "c) Baleine bleue", "d) Rhinocéros blanc"],
    reponseCorrecte: "c",
  },
];

var questionActuelle = 0;
var nombreBonnesReponses = 0;
var nombreTotalQuestions = questions.length;

function afficherQuestion() {
  var formulaire = document.getElementById("qcm-form");
  var questionContainer = document.getElementById("question-container");
  var choicesContainer = document.getElementById("choices-container");

  questionContainer.innerHTML = "";
  choicesContainer.innerHTML = "";

  if (questionActuelle < questions.length) {
    var questionElement = document.createElement("p");
    questionElement.textContent = questions[questionActuelle].question;
    questionContainer.appendChild(questionElement);

    for (var i = 0; i < questions[questionActuelle].choix.length; i++) {
      var choiceButton = document.createElement("button");
      choiceButton.type = "button";
      choiceButton.value = String.fromCharCode(97 + i);
      choiceButton.textContent = questions[questionActuelle].choix[i];
      choiceButton.addEventListener("click", function (event) {
        var reponseUtilisateur = event.target.value;
        verifierReponse(reponseUtilisateur);
      });
      choicesContainer.appendChild(choiceButton);
    }
  } else {
    cacherSectionQuestions();
    afficherPageFin();
  }
}

function cacherSectionQuestions() {
  var qcmSection = document.querySelector(".qcm-section");
  qcmSection.classList.add("hidden");
}

function afficherPageFin() {
  var finSection = document.getElementById("fin-section");
  finSection.classList.remove("hidden");

  var note = (nombreBonnesReponses / nombreTotalQuestions) * 10;
  var noteElement = document.getElementById("note");
  noteElement.textContent = note.toFixed(2);
}

function verifierReponse(reponseUtilisateur) {
  var reponseCorrecte = questions[questionActuelle].reponseCorrecte;
  var choixButtons = document.querySelectorAll('#choices-container button');

  choixButtons.forEach(function (button) {
    button.disabled = true;

    if (button.value === reponseUtilisateur) {
      if (reponseUtilisateur === reponseCorrecte) {
        nombreBonnesReponses++;
        button.style.backgroundColor = '#2ecc71';
        button.style.color = '#ffffff';
      } else {
        button.style.backgroundColor = '#e74c3c';
        button.style.color = '#ffffff';
      }
    } else if (button.value === reponseCorrecte) {
      button.style.backgroundColor = '#2ecc71';
      button.style.color = '#ffffff';
    }
  });

  setTimeout(function () {
    questionActuelle++;
    if (questionActuelle < questions.length) {
      afficherQuestion();
    } else {
      afficherPageFin();
    }
  }, 2000);
}

function recommencer() {
  questionActuelle = 0;
  nombreBonnesReponses = 0;

  var choixButtons = document.querySelectorAll('#choices-container button');
  choixButtons.forEach(function (button) {
    button.disabled = false;
    button.style.backgroundColor = '';
    button.style.color = '';
  });

  cacherSectionFin();
  afficherQuestion();
}

function cacherSectionFin() {
  var finSection = document.getElementById("fin-section");
  finSection.classList.add("hidden");
}
