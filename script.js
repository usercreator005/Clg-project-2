let subjects = [];
let routineData = "";
let sessionSubjects = [];
let finalDailyHours = 0;

const quotes = [
  "Success depends on daily discipline.",
  "Push yourself because no one else will.",
  "Dream big, start small, act now.",
  "Consistency creates confidence.",
  "Hard work beats talent.",
  "Focus on progress, not perfection."
];

window.onload = function() {
  document.getElementById("quoteBox").innerHTML =
    quotes[Math.floor(Math.random() * quotes.length)];
};

function toggleDark() {
  document.body.classList.toggle("dark");
}

function toggleExam() {
  document.getElementById("examSection")
    .classList.toggle("hidden",
      document.getElementById("competitive").value !== "yes");
}

function addSubject() {
  let name = document.getElementById("subjectName").value.trim();
  let level = parseFloat(document.getElementById("strength").value);
  
  if (!name) return;
  
  subjects.push({ name: name, weight: level });
  document.getElementById("subjectName").value = "";
  renderSubjects();
}

function renderSubjects() {
  let list = "";
  subjects.forEach(s => {
    list += s.name + " (" +
      (s.weight == 1 ? "Strong" :
        s.weight == 1.5 ? "Medium" : "Weak") +
      ")<br>";
  });
  document.getElementById("subjectList").innerHTML = list;
  document.getElementById("subjectList").classList.remove("hidden");
}

function generatePlan() {
  
  let hours = parseFloat(document.getElementById("hours").value);
  
  if (!hours || subjects.length == 0) {
    alert("Fill all details!");
    return;
  }
  
  /* -------- REALISTIC LOGIC -------- */
  
  finalDailyHours = hours;
  
  // Competitive boost without increasing hours
  if (document.getElementById("competitive").value === "yes") {
    subjects.forEach(s => {
      if (s.weight >= 1.5) {
        s.weight += 0.3; // Weak & Medium subjects boosted
      }
    });
  }
  
  /* -------- SESSION DISTRIBUTION -------- */
  
  let totalWeight = subjects.reduce((a, b) => a + b.weight, 0);
  let totalSessions = Math.floor(finalDailyHours);
  
  sessionSubjects = [];
  
  subjects.forEach(s => {
    let count = Math.floor((s.weight / totalWeight) * totalSessions);
    for (let i = 0; i < count; i++) {
      sessionSubjects.push(s.name);
    }
  });
  
  // Fill remaining sessions safely
  while (sessionSubjects.length < totalSessions) {
    sessionSubjects.push(subjects[sessionSubjects.length % subjects.length].name);
  }
  
  // Smart shuffle
  shuffleSmart();
  
  /* -------- DISTRIBUTION DISPLAY -------- */
  
  let output = "<h3>Study Distribution</h3>";
  
  subjects.forEach(s => {
    let time = ((s.weight / totalWeight) * finalDailyHours).toFixed(2);
    output += s.name + " → " + time + " hrs<br>";
  });
  
  document.getElementById("output").innerHTML = output;
  document.getElementById("output").classList.remove("hidden");
  
  generateRoutine();
}

/* Prevent consecutive same subjects */
function shuffleSmart() {
  for (let i = 0; i < sessionSubjects.length - 1; i++) {
    if (sessionSubjects[i] === sessionSubjects[i + 1]) {
      for (let j = i + 2; j < sessionSubjects.length; j++) {
        if (sessionSubjects[j] !== sessionSubjects[i]) {
          let temp = sessionSubjects[i + 1];
          sessionSubjects[i + 1] = sessionSubjects[j];
          sessionSubjects[j] = temp;
          break;
        }
      }
    }
  }
}

function generateRoutine() {
  
  let slots = [
    document.getElementById("morning").value.trim(),
    document.getElementById("afternoon").value.trim(),
    document.getElementById("night").value.trim()
  ];
  
  let routine = "<h3>Daily Routine</h3>";
  let sessionIndex = 0;
  
  slots.forEach(slot => {
    
    if (!slot.includes("-")) return;
    
    let parts = slot.split("-");
    let start = parseFloat(parts[0]);
    let end = parseFloat(parts[1]);
    
    if (isNaN(start) || isNaN(end)) return;
    if (end <= start) end += 24;
    
    while (start < end && sessionIndex < sessionSubjects.length) {
      
      let studyEnd = start + (50 / 60);
      if (studyEnd > end) break;
      
      routine += `<input type="checkbox" onchange="calculateScore()"> 
${formatTime(start)} - ${formatTime(studyEnd)} → ${sessionSubjects[sessionIndex]}<br>`;
      
      let breakEnd = studyEnd + (10 / 60);
      
      if (breakEnd <= end && sessionIndex < sessionSubjects.length - 1) {
        routine += `${formatTime(studyEnd)} - ${formatTime(breakEnd)} → Break<br>`;
      }
      
      start = breakEnd;
      sessionIndex++;
    }
  });
  
  routineData = routine;
  
  document.getElementById("routineOutput").innerHTML = routine;
  document.getElementById("routineOutput").classList.remove("hidden");
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("scoreSection").classList.remove("hidden");
}

function calculateScore() {
  let total = document.querySelectorAll("#routineOutput input").length;
  if (total === 0) return;
  
  let done = document.querySelectorAll("#routineOutput input:checked").length;
  let score = Math.round((done / total) * 100);
  
  document.getElementById("scoreSection").innerHTML =
    "🔥 Productivity Score: " + score + "%";
}

function formatTime(time) {
  
  if (time >= 24) time -= 24;
  
  let hour = Math.floor(time);
  let minutes = Math.round((time % 1) * 60);
  
  if (minutes == 60) {
    hour++;
    minutes = 0;
  }
  
  if (hour >= 24) hour -= 24;
  
  return hour + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

function downloadRoutine() {
  let win = window.open();
  win.document.write("<html><body>" + routineData + "</body></html>");
  win.print();
}