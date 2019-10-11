const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; //canvas 사이즈 명시
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 기본 선색상 = 검정
ctx.lineWidth = 2.5; // 기본 선굵기
ctx.fillStyle = ""

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); // canvas 위에 Path 지속적으로 생성
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y); // painting=true 시 선그리기 시작
        ctx.stroke();
    } 
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //기본 선 색상 변경
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // canvas 위 우클릭 방지
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //색상들을 배열로 생성 후 forEach로 각각 함수 실행

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}