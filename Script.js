// ---------------- DATABASE ----------------
let students = JSON.parse(localStorage.getItem("students")) || [];

let currentStudent = null;

// ---------------- QUESTIONS ----------------
let questions = [
  {q:"CPU چیست؟", a:"مغز کمپیوتر"},
  {q:"RAM چیست؟", a:"حافظه موقت"},
  {q:"HTML چیست؟", a:"زبان نشانه گذاری"},
  {q:"CSS چیست؟", a:"طراحی صفحات"},
  {q:"JavaScript چیست؟", a:"زبان برنامه نویسی"}
];

let currentQ = null;

// ---------------- START ----------------
function start(){

  let name = document.getElementById("name").value;
  if(!name) return;

  currentStudent = {name:name, score:0};

  // ذخیره نام در دیتابیس اولیه
  students.push(currentStudent);
  saveData();

  showQuiz();
}

// ---------------- QUIZ ----------------
function showQuiz(){

  document.getElementById("quizBox").style.display="block";

  currentQ = questions[Math.floor(Math.random()*questions.length)];

  document.getElementById("qText").innerText = currentQ.q;
}

function check(){

  let ans = document.getElementById("answer").value;

  if(ans.trim() == currentQ.a){

    alert("✔️ درست! وارد بازی شدی");

    currentStudent.score = 10;
    saveData();

    startGame();

  }else{
    alert("❌ جواب غلط");
  }

  document.getElementById("quizBox").style.display="none";
}

// ---------------- CHESS GAME ----------------
let board = [];
let from = null;

function startGame(){

  document.getElementById("gameBox").style.display="block";

  board = [
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]
  ];

  draw();
}

// ---------------- DRAW ----------------
function draw(){

  let b = document.getElementById("board");
  b.innerHTML="";

  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){

      let cell=document.createElement("div");
      cell.className="cell";

      if((r+c)%2==0) cell.classList.add("white");
      else cell.classList.add("black");

      cell.innerHTML = symbol(board[r][c]);

      let sq = String.fromCharCode(97+c)+(8-r);

      cell.onclick = ()=>move(sq);

      b.appendChild(cell);
    }
  }
}

// ---------------- MOVE ----------------
function move(sq){

  if(!from){
    from = sq;
    return;
  }

  let fx = from.charCodeAt(0)-97;
  let fy = 8-parseInt(from[1]);

  let tx = sq.charCodeAt(0)-97;
  let ty = 8-parseInt(sq[1]);

  board[ty][tx] = board[fy][fx];
  board[fy][fx] = "";

  from = null;

  draw();
}

// ---------------- SYMBOL ----------------
function symbol(p){
  let m={
    p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",
    P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"
  };
  return m[p] || "";
}

// ---------------- SAVE DATABASE ----------------
function saveData(){
  localStorage.setItem("students", JSON.stringify(students));
}