const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700; //canvas 사이즈 명시
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 기본 선색상 = 검정
ctx.lineWidth = 2.5; // 기본 선굵기

let painting = false;

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
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //색상들을 배열로 생성 후 forEach로 각각 함수 실행