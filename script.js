$(document).ready(function () {
  const wordSets = {
      beginner: [
          { word: "always", translation: "завжди" },
          { word: "house", translation: "будинок" },
          { word: "friend", translation: "друг" },
          { word: "water", translation: "вода" },
          { word: "book", translation: "книга" }
      ],
      intermediate: [
          { word: "opinion", translation: "думка" },
          { word: "problem", translation: "проблема" },
          { word: "decision", translation: "рішення" },
          { word: "freedom", translation: "свобода" },
          { word: "success", translation: "успіх" }
      ],
      advanced: [
          { word: "inevitable", translation: "неминучий" },
          { word: "meticulous", translation: "прискіпливий" },
          { word: "boor", translation: "грубіян" },
          { word: "glib", translation: "спритний" },
          { word: "convoluted", translation: "складний" }
      ]
  };

  let currentWords = wordSets.beginner;
  let currentStep = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
  }

  function loadWords(difficulty) {
      currentWords = shuffle([...wordSets[difficulty]]);
      resetGame();
  }

  function updateCard() {
      $("#word-card").text(currentWords[currentStep].word);
      $("#current-step").text(currentStep + 1);
      $("#total-steps").text(currentWords.length);
      $("#translation-input").val("");
  }

  function resetGame() {
      currentStep = 0;
      correctCount = 0;
      incorrectCount = 0;
      $("#correct-count").text(correctCount);
      $("#incorrect-count").text(incorrectCount);
      updateCard();
  }

  function showModal() {
      const percentage = (correctCount / currentWords.length) * 100;
      let level = "Початківець";
      if (percentage > 80) level = "Просунутий";
      else if (percentage > 50) level = "Середній";

      $("#language-level").text(level);
      $("#result-modal").fadeIn();
  }

  $("input[name='difficulty']").change(function () {
      const selectedLevel = $(this).val();
      loadWords(selectedLevel);
  });

  $("#check-button").click(function () {
      const userTranslation = $("#translation-input").val().trim();
      const correctTranslation = currentWords[currentStep].translation;

      if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
          correctCount++;
          $("#correct-count").text(correctCount);
      } else {
          incorrectCount++;
          $("#incorrect-count").text(incorrectCount);
      }

      currentStep++;
      if (currentStep < currentWords.length) {
          updateCard();
      } else {
          showModal();
      }
  });

  $("#restart-button").click(function () {
      resetGame();
      $("#result-modal").fadeOut();
  });

  loadWords("beginner");
});
