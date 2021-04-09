var recognizer;

function stopListening() {
  if (recognizer.isListening()) {
        recognizer.stopListening()
      }
}

function listen() {
  // Array of words that the recognizer is trained to recognize.
  const words = recognizer.wordLabels();
  recognizer.listen(({scores}) => {
    // Turn scores into a list of (score,word) pairs.
    scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
    // Find the most probable word.
    scores.sort((s1, s2) => s2.score - s1.score);
    let predictedWord = scores[0].word;
    
    switch(predictedWord) {
      case 'up':  bird.up();
                    break;
      case 'down': bird.down();
                    break;
      case 'stop': togglePause();
                  break;
    }
    document.querySelector('#console').textContent = scores[0].word;
  }, {probabilityThreshold: 0.75});
 }

async function app() {
 recognizer = speechCommands.create('BROWSER_FFT');
 await recognizer.ensureModelLoaded();
}

app()


function toggleVoiceControl(e) {
  if (!isGameOver) {
      if (!isMicOn) { //mic is off, enable it
          enableVoiceControl(e)
      } else {
          // disable mic
          disableVoiceControl(e)
      }
  }
}

function enableVoiceControl(e) {
  if (e && e.target)
      e.target.classList.add("listening");

  document.getElementById("mic-tooltip").innerHTML = "Disable Voice Control";
  document.getElementById("listening-txt").style.display = "block";
  listen();
  isMicOn = true;
}

function disableVoiceControl(e) {
  if (e && e.target)
      e.target.classList.remove("listening");

  stopListening();
  document.getElementById("mic-tooltip").innerHTML = "Enable Voice Control";
  document.getElementById("listening-txt").style.display = "none";
  document.querySelector('#console').textContent = '';
  isMicOn = false;
}
