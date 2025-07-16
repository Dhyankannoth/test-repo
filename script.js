let timer;
let totalSeconds = 0;

const display = document.getElementById("timer-display");
const hourInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");

document.getElementById("start-btn").addEventListener('click',startTimer);
document.getElementById("stop-btn").addEventListener('click',stopTimer);
document.getElementById("reset-btn").addEventListener('click',resetTimer);

function updateDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  display.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const alarmSound = document.getElementById("alarm-sound");

function startTimer()
{
    const hour = parseInt(hourInput.value) || 0;
    const min = parseInt(minutesInput.value) || 0;
    const sec = parseInt(secondsInput.value) || 0;
    totalSeconds = hour*3600 + min*60 + sec;
    if (totalSeconds <= 0) {
        alert("Please enter a valid time");
        return;
    }
    alarmSound.play().then(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset to start
    }).catch(e => console.log("Audio warmup failed:", e));
    
    updateDisplay();

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alarmSound.play().catch(error => {
        console.error("Audio playback failed:", error);
        // Fallback to a beep or visual alert
        alert("Time's up!");
      });
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  totalSeconds = 0;
  updateDisplay();
}
