const toDoform = document.querySelector(".js-toDoForm"),
 toDoInput = toDoform.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; // 할일 저장

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // local storage에 string으로 저장하기 위해 json사용
}                               // JSON.stringify : js object를 string으로 변환

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
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

