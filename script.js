// Globale Variablen
let exercises=[], currentExercise=0, round=1, totalRounds=3;
let workTime=40, restTime=20, timeLeft=workTime, isRest=false, interval=null;

const timerEl=document.getElementById("timer");
const exerciseEl=document.getElementById("exercise");
const roundEl=document.getElementById("round");
const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

// Level-Logik
function setLevel(level){
  if(level==="anfänger"){
    exercises=["Kniebeugen","Liegestütze","Plank"];
    workTime=40; restTime=20; totalRounds=3;
  } else if(level==="fortgeschritten"){
    exercises=["Kniebeugen","Liegestütze","Ausfallschritte","Plank","Mountain Climbers"];
    workTime=45; restTime=15; totalRounds=4;
  } else if(level==="profi"){
    exercises=["Burpees","Liegestütze","Ausfallschritte","Plank","Mountain Climbers","Jump Squats"];
    workTime=50; restTime=10; totalRounds=5;
  }
}

// UI Update
function updateUI() {
  timerEl.textContent = timeLeft;
  roundEl.textContent = `Runde ${round} von ${totalRounds}`;
}

// Start Workout
function startWorkout(){
  exerciseEl.textContent = exercises[currentExercise];
  updateUI();
  interval=setInterval(()=>{
    timeLeft--;
    if(timeLeft<=0){
      if(!isRest){
        isRest=true;
        timeLeft=restTime;
        exerciseEl.textContent="Pause";
        beep.play();
        if(navigator.vibrate) navigator.vibrate(500);
      } else {
        isRest=false;
        currentExercise++;
        if(currentExercise>=exercises.length){
          currentExercise=0;
          round++;
          if(round>totalRounds){
            clearInterval(interval);
            exerciseEl.textContent="Training geschafft 🎉";
            timerEl.textContent="";
            beep.play();
            if(navigator.vibrate) navigator.vibrate([300,200,300]);
            return;
          }
        }
        timeLeft=workTime;
        exerciseEl.textContent=exercises[currentExercise];
        beep.play();
        if(navigator.vibrate) navigator.vibrate(500);
      }
    }
    updateUI();
  },1000);
}

function pauseWorkout(){clearInterval(interval); interval=null;}
function resetWorkout(){
  pauseWorkout();
  currentExercise=0;
  round=1;
  timeLeft=workTime;
  isRest=false;
  exerciseEl.textContent="Bereit?";
  updateUI();
}

// Navigation
function showTipps(){
  document.getElementById("main-screen").style.display="none";
  document.getElementById("tipps").style.display="block";
}
function backToMain(){
  document.getElementById("tipps").style.display="none";
  document.getElementById("main-screen").style.display="block";
}

function startTraining(){
  saveProfile();
  let level = document.getElementById("level").value;
  setLevel(level);
  
  // Tagessteigerung
  let lastRound = parseInt(localStorage.getItem("lastRound_"+level)||totalRounds);
  totalRounds = lastRound;
  localStorage.setItem("lastRound_"+level, lastRound+1);
  alert(`Level: ${level}\nHeute: ${lastRound} Runden\nMorgen: ${lastRound+1} Runden`);
  
  document.getElementById("main-screen").style.display="none";
  document.getElementById("training").style.display="block";
  startWorkout();
}

function startSimpleTraining(){
  let level = document.getElementById("level").value;
  setLevel(level);
  document.getElementById("main-screen").style.display="none";
  document.getElementById("training").style.display="block";
  startWorkout();
}

function backToMainFromTraining(){
  resetWorkout();
  document.getElementById("training
