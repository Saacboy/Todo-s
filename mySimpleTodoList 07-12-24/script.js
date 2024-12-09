const inputText = document.getElementById("inputText");
const addBTN = document.getElementById("addBTN");
const taskList = document.getElementById("taskList");
let finished = false;

function createTaskElement(){
    const task = document.createElement("div");
    task.classList.add("task");

    const textTask = document.createElement("input");
    textTask.type = "text";
    textTask.value = inputText.value;
    textTask.readOnly = true;
    textTask.classList.add("inputTaskItem");
    task.appendChild(textTask);

    const trashBTN = document.createElement("i");
    trashBTN.classList.add("bx");
    trashBTN.classList.add("bx-trash");
    task.appendChild(trashBTN);

    return task;
}

addBTN.addEventListener("click", (e)=>{
    e.preventDefault();

    if(inputText.value !== ""){
        
        const taskElement = createTaskElement();
        
        taskList.appendChild(taskElement);
        inputText.value = "";
    }

})

document.addEventListener("click", (e)=>{
    const targetElement = e.target;
    
    if(targetElement.classList.contains("bx-trash")){
        targetElement.parentElement.remove();
    }

    if(targetElement.classList.contains("inputTaskItem")){
        if(targetElement.readOnly){
            
            targetElement.classList.toggle("finish");
            targetElement.classList.toggle("lthr");//significa line through
        }
    }
})

document.addEventListener("dblclick", (e)=>{
    const targetElement = e.target;

    //se o elemento target for o input de uma task.
    if(targetElement.classList.contains("inputTaskItem")){
        targetElement.classList.remove("lthr");
        targetElement.readOnly = false;

        targetElement.addEventListener("blur", ()=>{
            targetElement.readOnly = true;
            if(targetElement.classList.contains("finish")){
                targetElement.classList.add("lthr")
            }
        })
    }
});

/*
<div class="task">
    <input type="text" value="Task Exemplo" readonly>
    <i class="bx bx-trash"></i>
</div>
*/