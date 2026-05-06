let students = JSON.parse(localStorage.getItem("students")) || [];

let playerWhite, playerBlack;
let turn="white";
let board=[], from=null;
let currentQ=null;
let lastMove=null;

// سوالات چندگزینه‌ای
let questions = [
  {
    q:"کامپیوتر چیست؟",
    options:["دستگاه الکترونیکی","کتاب","صندلی","مداد"],
    a:"دستگاه الکترونیکی"
  },
  {
    q:"اجزای اصلی کامپیوتر چیست؟",
    options:["سخت افزار و نرم افزار","آب و خاک","غذا و آب","کتاب و قلم"],
    a:"سخت افزار و نرم افزار"
  },
  {
    q:"CPU چیست؟",
    options:["مغز کامپیوتر","صفحه کلید","ماوس","پرینتر"],
    a:"مغز کامپیوتر"
  },
  {
    q:"RAM چیست؟",
    options:["حافظه موقت","مانیتور","موس","بلندگو"],
    a:"حافظه موقت"
  },
  {
    q:"مانیتور چیست؟",
    options:["صفحه نمایش","کیبورد","موس","CPU"],
    a:"صفحه نمایش"
  },
  {
    q:"کیبورد چیست؟",
    options:["صفحه کلید","مانیتور","پرینتر","اسپیکر"],
    a:"صفحه کلید"
  },
  {
    q:"ماوس چیست؟",
    options:["دستگاه اشاره گر","کتاب","مداد","گوشی"],
    a:"دستگاه اشاره گر"
  },
  {
    q:"سیستم عامل چیست؟",
    options:["مدیریت کامپیوتر","بازی","فیلم","کتاب"],
    a:"مدیریت کامپیوتر"
  },
  {
    q:"ویندوز چیست؟",
    options:["نوع سیستم عامل","برنامه نقاشی","بازی","فایل"],
    a:"نوع سیستم عامل"
  },
  {
    q:"پینت چیست؟",
    options:["برنامه نقاشی","مرورگر","بازی","سیستم عامل"],
    a:"برنامه نقاشی"
  },
  {
    q:"فایل چیست؟",
    options:["اطلاعات ذخیره شده","صندلی","غذا","کتاب"],
    a:"اطلاعات ذخیره شده"
  },
  {
    q:"پوشه چیست؟",
    options:["محل نگهداری فایل‌ها","بازی","خوراکی","موس"],
    a:"محل نگهداری فایل‌ها"
  },
  {
    q:"اینترنت چیست؟",
    options:["شبکه جهانی","کتاب","ماشین","کاغذ"],
    a:"شبکه جهانی"
  },
  {
    q:"آیکون چیست؟",
    options:["علامت برنامه","غذا","مداد","کاغذ"],
    a:"علامت برنامه"
  },
  {
    q:"پرینتر چیست؟",
    options:["دستگاه چاپ","کیبورد","موس","مانیتور"],
    a:"دستگاه چاپ"
  },
  {
    q:"نرم افزار چیست؟",
    options:["برنامه‌های کامپیوتر","چوب","آهن","آب"],
    a:"برنامه‌های کامپیوتر"
  },
  {
    q:"سخت افزار چیست؟",
    options:["قسمت فیزیکی کامپیوتر","برنامه","بازی","فیلم"],
    a:"قسمت فیزیکی کامپیوتر"
  },
  {
    q:"اسپیکر چیست؟",
    options:["بلندگو","صفحه نمایش","موس","کیبورد"],
    a:"بلندگو"
  },
  {
    q:"ذخیره کردن یعنی چه؟",
    options:["نگهداری اطلاعات","پاک کردن","نوشتن","کشیدن"],
    a:"نگهداری اطلاعات"
  },
  {
    q:"نقاشی در کامپیوتر با کدام برنامه است؟",
    options:["Paint","Word","Excel","Chrome"],
    a:"Paint"
  },
  {
    q:"موس چه کاری انجام می‌دهد؟",
    options:["حرکت اشاره گر","چاپ","صدا","خاموش کردن"],
    a:"حرکت اشاره گر"
  },
  {
    q:"کیس چیست؟",
    options:["جعبه اصلی کامپیوتر","مانیتور","موس","کیبورد"],
    a:"جعبه اصلی کامپیوتر"
  },
  {
    q:"مرورگر چیست؟",
    options:["برنامه اینترنت","بازی","فایل","مداد"],
    a:"برنامه اینترنت"
  },
  {
    q:"Google Chrome چیست؟",
    options:["مرورگر اینترنت","بازی","سیستم عامل","نرم افزار نقاشی"],
    a:"مرورگر اینترنت"
  },
  {
    q:"خاموش کردن کامپیوتر یعنی چه؟",
    options:["بستن دستگاه","روشن کردن","نقاشی","نوشتن"],
    a:"بستن دستگاه"
  },
  {
    q:"فولدر چه کاری می‌کند؟",
    options:["مرتب کردن فایل‌ها","بازی","چاپ","صدا"],
    a:"مرتب کردن فایل‌ها"
  },
  {
    q:"دسکتاپ چیست؟",
    options:["صفحه اصلی کامپیوتر","پرینتر","موس","کیبورد"],
    a:"صفحه اصلی کامپیوتر"
  },
  {
    q:"آنتی ویروس چیست؟",
    options:["برنامه محافظت","بازی","فایل","موس"],
    a:"برنامه محافظت"
  },
  {
    q:"USB چیست؟",
    options:["وسیله اتصال","کتاب","کاغذ","غذا"],
    a:"وسیله اتصال"
  },
  {
    q:"کامپیوتر برای چه استفاده می‌شود؟",
    options:["کار و آموزش","خوردن","خوابیدن","دویدن"],
    a:"کار و آموزش"
  }
];
// شروع بازی
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

// شروع صفحه شطرنج
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

// رسم صفحه
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

// حرکت مهره
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

// نمایش سوال
function showQuiz(){
  document.getElementById("quizBox").style.display="block";

  currentQ = questions[Math.floor(Math.random()*questions.length)];

  document.getElementById("qText").innerText = currentQ.q;

  let old = document.querySelectorAll(".optionBtn");
  old.forEach(e=>e.remove());

  currentQ.options.forEach(opt=>{
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "optionBtn";

    btn.onclick = ()=>checkAnswer(opt);

    document.getElementById("quizBox").appendChild(btn);
  });
}

// بررسی جواب
function checkAnswer(selected){

  if(selected == currentQ.a){

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

  draw();
}

// مهره‌ها
function symbol(p){
  let m={
    p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",
    P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"
  };
  return m[p] || "";
}

// ذخیره
function saveData(){
  localStorage.setItem("students", JSON.stringify(students));
}

// ریست
function resetGame(){
  startGame();
}

// خروجی اکسل (CSV)
function exportToExcel(){
  let data = "نام,امتیاز\n";

  students.forEach(s=>{
    data += s.name + "," + s.score + "\n";
  });

  let blob = new Blob([data], { type: "text/csv" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "نتایج.csv";
  a.click();
}