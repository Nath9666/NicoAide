/**
 * Loads the quiz data from "quiz.json" and displays the quiz.
 * @returns {Promise<void>} A promise that resolves when the quiz is loaded and displayed.
 */
async function chargerQuizz() {
    try {
        const response = await fetch("quiz.json");
        const data = await response.json();
        afficherQuizz(data.quizz);
    } catch (error) {
        console.error("Erreur lors du chargement du quizz:", error);
    }
}

function afficherQuizz(quizz) {
    const score = document.getElementById("score");
    let scoreValue = 0;
    const container = document.getElementById("quizz-container");
    const button_div = document.getElementById("next");
    let index = 0;
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    afficherQuestion(index, quizz, container, questionElement);
    // Création du bouton pour valider les réponses
    const boutonValider = document.createElement("button");
    boutonValider.textContent = "Next";
    boutonValider.onclick = function() {
        const reponses = document.querySelectorAll('input[type="checkbox"]:checked');
        let reponsesCorrectes = true;
        // Vérifier si toutes les réponses sélectionnées sont correctes
        reponses.forEach(reponse => {
            if (reponse.value !== "true") {
                reponsesCorrectes = false;
            }
        });
        // Vérifier si des réponses correctes n'ont pas été sélectionnées
        const toutesReponses = document.querySelectorAll('input[type="checkbox"]');
        toutesReponses.forEach(reponse => {
            if (reponse.value === "true" && !reponse.checked) {
                reponsesCorrectes = false;
            }
        });
        if (reponsesCorrectes && reponses.length > 0) {
            scoreValue++;
        }
        score.textContent = `Score: ${scoreValue}`;
        index++;
        if (index < quizz.length) {
            afficherQuestion(index, quizz, container, questionElement);
            if (index === quizz.length - 1) {
                boutonValider.textContent = "Terminer";
            }
        } else {
            alert("Fin du quizz");
        }
    };
    button_div.appendChild(boutonValider);
}

function afficherQuestion(index, quizz, container, questionElement) {
    questionElement.innerHTML = `<h3>${quizz[index].question}</h3>`;
    const reponsesListe = document.createElement("div");
    quizz[index].reponses.forEach(reponseObj => {
        const reponseButton = document.createElement("input");
        const reponseLabel = document.createElement("label");
        reponseButton.type = "checkbox";
        reponseButton.value = reponseObj.correct;
        reponseLabel.textContent = reponseObj.reponse;
        reponseButton.classList.add("reponse");
        reponsesListe.appendChild(reponseButton);
        reponsesListe.appendChild(reponseLabel);
    });
    questionElement.appendChild(reponsesListe);
    container.innerHTML = ''; // Nettoyer le conteneur avant d'ajouter la nouvelle question
    container.appendChild(questionElement);
}

// Appel de la fonction pour charger et afficher le quizz
chargerQuizz();