let students = JSON.parse(localStorage.getItem("students")) || [];
let currentStudent = null;

let questions = [
  {q:"CPU چیست؟", a:"مغز کمپیوتر"},
  {q:"RAM چیست؟", a:"حافظه موقت"},
  {q:"HTML چیست؟", a:"زبان نشانه گذاری"},
  {q:"CSS چیست؟", a:"طراحی صفحات"},
  {q:"JavaScript چیست؟", a:"زبان برنامه نویسی"}
];

let currentQ = null;

let board=[], from=null, turn="white";
let capturedWhite=[], capturedBlack=[];
let lastMove=null;

// شروع
function start(){
  let name = document.getElementById("name").value;
  if(!name) return;

  currentStudent={name,score:0};
  students.push(currentStudent);
  saveData();

  document.getElementById("startBox").style.display="none";
  document.getElementById("info").style.display="block";

  startGame();
}

// شروع بازی
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

  capturedWhite=[];
  capturedBlack=[];
  turn="white";

  draw();
}

// رسم
function draw(){
  let b=document.getElementById("board");
  b.innerHTML="";

  document.getElementById("turn").innerText = turn=="white"?"سفید":"سیاه";
  document.getElementById("score").innerText = currentStudent.score;

  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){

      let cell=document.createElement("div");
      cell.className="cell";

      if((r+c)%2==0) cell.classList.add("white");
      else cell.classList.add("black");

      let sq = String.fromCharCode(97+c)+(8-r);

      if(from==sq) cell.classList.add("selected");

      cell.innerHTML = symbol(board[r][c]);
      cell.onclick=()=>move(sq);

      b.appendChild(cell);
    }
  }

  drawCaptured();
}

// حرکت
function move(sq){

  let x = sq.charCodeAt(0)-97;
  let y = 8-parseInt(sq[1]);

  if(!from){
    let p = board[y][x];
    if(!p) return;

    if(turn=="white" && p!==p.toUpperCase()) return;
    if(turn=="black" && p!==p.toLowerCase()) return;

    from = sq;
    draw();
    return;
  }

  let fx = from.charCodeAt(0)-97;
  let fy = 8-parseInt(from[1]);

  lastMove = {
    from:from,
    to:sq,
    piece:board[fy][fx],
    target:board[y][x]
  };

  // حرکت موقت
  board[y][x]=board[fy][fx];
  board[fy][fx]="";

  from=null;
  draw();

  showQuiz(); // سوال بعد حرکت
}

// سوال
function showQuiz(){
  document.getElementById("quizBox").style.display="block";
  currentQ = questions[Math.floor(Math.random()*questions.length)];
  document.getElementById("qText").innerText = currentQ.q;
}

// بررسی جواب
function check(){

  let ans = document.getElementById("answer").value;

  if(ans.trim()==currentQ.a){

    alert("✔️ درست");

    currentStudent.score +=10;

    // ثبت مهره خورده شده
    if(lastMove.target){
      if(lastMove.target===lastMove.target.toUpperCase())
        capturedWhite.push(lastMove.target);
      else
        capturedBlack.push(lastMove.target);
    }

    turn = turn=="white"?"black":"white";

  }else{
    alert("❌ غلط → حرکت برگشت");

    // برگرداندن حرکت
    let fx = lastMove.from.charCodeAt(0)-97;
    let fy = 8-parseInt(lastMove.from[1]);

    let tx = lastMove.to.charCodeAt(0)-97;
    let ty = 8-parseInt(lastMove.to[1]);

    board[fy][fx]=lastMove.piece;
    board[ty][tx]=lastMove.target;
  }

  document.getElementById("quizBox").style.display="none";
  document.getElementById("answer").value="";

  draw();
}

// مهره
function symbol(p){
  let m={
    p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",
    P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"
  };
  return m[p]||"";
}

// نمایش گرفته‌شده‌ها
function drawCaptured(){
  document.getElementById("whiteOut").innerHTML =
    capturedWhite.map(symbol).join(" ");

  document.getElementById("blackOut").innerHTML =
    capturedBlack.map(symbol).join(" ");
}

// ریست
function resetGame(){
  startGame();
}

// ذخیره
function saveData(){
  localStorage.setItem("students", JSON.stringify(students));
}