const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text); //사용자의 이름을 기억
}

function handleSubmit(event) {
    event.preventDefault(); //default 이벤트를 막음
    const currentValue = input.value; 
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); //폼을 제출하는 이벤트 발생 시 handleSubmit 실행
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName(); //currentUser가 null이면 이름을 요청
    }
    else{
        paintGreeting(currentUser);
    }

}

function init(){
    loadName();
}

init();