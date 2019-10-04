const toDoform = document.querySelector(".js-toDoForm"),
 toDoInput = toDoform.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo){
    return toDo.id === 1 // li에 없는 id를 체크하기 위해
}

let toDos = []; // 할일 저장

function deleteToDo(event){
    //console.dir(event.target) delete 버튼 클릭시 이벤트 속성 확인
    const btn = event.target;
    const li = btn.parentNode; // 버튼의 id값 확인
    toDoList.removeChild(li); // toDoList 삭제
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos(); 
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // local storage에 string으로 저장하기 위해 json사용
}                               // JSON.stringify : js object를 string으로 변환

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length +1; // local storage에도 저장하기 위해 neWId로 Id값 저장
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ // forEach : array 요소들에 각각 한번씩 함수 호출
            paintToDo(toDo.text);
        });
    }
 }

function init() {
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit)
}

init();

