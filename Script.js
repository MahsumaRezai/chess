let students = JSON.parse(localStorage.getItem("students")) || [];

let playerWhite, playerBlack;
let turn="white";
let board=[], from=null;
let currentQ=null;
let lastMove=null;

let questions = [
  {q:"CPU چیست؟", a:"مغز کمپیوتر"},
  {q:"RAM چیست؟", a:"حافظه موقت"},
  {q:"HTML چیست؟", a:"زبان نشانه گذاری"},
  {q:"CSS چیست؟", a:"طراحی صفحات"},
  {q:"JavaScript چیست؟", a:"زبان برنامه نویسی"}
];

function start(){
  let name1 = document.getElementById("name1").value;
  let name2 = document.getElementById("name2").value;

  if(!name1 || !name2){
    alert("نام هر دو شاگرد را وارد کنید");
    return;
  }

  playerWhite = {name:name1, score:0};
  playerBlack = {name:name2, score:0};

  students.push(playerWhite, playerBlack);
  saveData();

  document.getElementById("startBox").style.display="none";
  document.getElementById("info").style.display="block";
  document.getElementById("gameBox").style.display="block";

  document.getElementById("playerWhite").innerText="سفید: "+name1;
  document.getElementById("playerBlack").innerText="سیاه: "+name2;

  startGame();
}

function startGame(){
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

  turn="white";
  draw();
}

function draw(){
  let b=document.getElementById("board");
  b.innerHTML="";

  document.getElementById("turn").innerText = turn=="white"?"سفید":"سیاه";
  document.getElementById("scoreWhite").innerText = playerWhite.score;
  document.getElementById("scoreBlack").innerText = playerBlack.score;

  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){

      let cell=document.createElement("div");
      cell.className="cell";
      cell.classList.add((r+c)%2==0?"white":"black");

      let sq = String.fromCharCode(97+c)+(8-r);

      if(from==sq) cell.classList.add("selected");

      cell.innerHTML = symbol(board[r][c]);
      cell.onclick=()=>move(sq);

      b.appendChild(cell);
    }
  }
}

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

  board[y][x]=board[fy][fx];
  board[fy][fx]="";

  from=null;
  draw();

  showQuiz();
}

function showQuiz(){
  document.getElementById("quizBox").style.display="block";
  currentQ = questions[Math.floor(Math.random()*questions.length)];
  document.getElementById("qText").innerText = currentQ.q;
}

function check(){

  let ans = document.getElementById("answer").value;

  if(ans.trim()==currentQ.a){

    alert("✔️ درست");

    if(turn=="white"){
      playerWhite.score +=10;
      turn="black";
    }else{
      playerBlack.score +=10;
      turn="white";
    }

  }else{

    alert("❌ غلط → حرکت برگشت");

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

function symbol(p){
  let m={
    p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",
    P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"
  };
  return m[p] || "";
}

function resetGame(){
  startGame();
}

function saveData(){
  localStorage.setItem("students", JSON.stringify(students));
}

function exportToExcel(){
  let data = "نام,امتیاز\n";

  students.forEach(s=>{
    data += s.name + "," + s.score + "\\n";
  });

  let blob = new Blob([data], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "نتایج.csv";
  a.click();
}