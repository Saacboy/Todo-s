const readlineSync = require("readline-sync");

const todoList = [
    {
        value: "andar e correr",
        isFinished: true
    },
    {
        value: "fazer caminhada",
        isFinished: false
    },
    {
        value: "fazer ginastica",
        isFinished: false
    },
    {
        value: "escrever livro",
        isFinished: false
    },
    {
        value: "passear",
        isFinished: false
    }
];

function drawTitle() {
    //top title
    console.log("==========================================");
    console.log("--------------- To Do List ---------------");
    console.log("==========================================\n");
}


function mainMenu(){

    let finish = false;

    while(finish == false){
        
        console.clear();
        
        drawTitle();
        
        //desenha a lista
        for(let x of todoList){
            let listItem = x.isFinished?"[X]":"[ ]";
            listItem += " " + x.value;
            
            console.log(listItem);
        }

        console.log("\n==========================================\n");
        
        //desenha o menu de opções
        console.log("[1] - adicionar novo item");
        console.log("[2] - remover item existente");
        console.log("[3] - riscar item/ desriscar item");
        console.log("[4] - editar item");
        console.log("[5] - fechar programa");
        
        //guarda o valor da opção escolhida pelo usuário
        let option = readlineSync.question("\nDigite uma opcao: ");
        
        switch(Number(option)){
            case 1:
                addANewTask();
                break;
            case 2:
                removeTask();
                break;
            case 3:
                finishTask();
                break;
            case 4:
                editTask();
                break;
            case 5:
                finish = true;
                break;
            default:
                break;
        }
    }
}
mainMenu();

function addANewTask(){
    let yesOrNo;
    do{
        //cria o titulo e mensagens da tela
        console.clear()
        drawTitle();
        console.log("\n**digite 0 para cancelar**")
        
        
        //cria a nova task object
        const newTask = {}
        newTask.value = readlineSync.question("\nDigite a nova tarefa: ");
        newTask.isFinished = false;
        
        //determina se a task deve ser deletada ou adicionada a lista
        if(newTask.value !== 0){
            todoList.push(newTask);
        }

        //verifica se o usuario quer continuar adicionando tasks
        yesOrNo = readlineSync.question("\nDeseja adicionar mais uma? (s/n) ");

    }while(yesOrNo == "s");

}

function removeTask(){
    console.clear()
    drawTitle();
    let num = 1;
    for(let x of todoList){
        let listItem = `[${num++}]`;
        listItem += " " + x.value;
        
        console.log(listItem);
    }
    console.log("\n==========================================\n");

    const numTask = readlineSync.question("Digite o o numero da task que deseja remover: ");

    for(let x = numTask; x < todoList.length; x++){
        todoList[x-1] = todoList[x];
    }

    todoList.length--;

}

function finishTask(){
    console.clear();
    drawTitle();
    let num = 1;
    for(let x of todoList){
        let listItem = `[${num++}]`;
        listItem += " " + x.value;
        
        console.log(listItem);
    }
    console.log("\n==========================================\n");

    const numTask = readlineSync.question("Digite o numero da task que deseja finalizar: ");

    if(todoList[numTask-1].isFinished){
        todoList[numTask-1].isFinished = false;
    }else{
        todoList[numTask-1].isFinished = true;
    }
}

function editTask(){
    let finish = false;
    while(finish == false){
        console.clear();
        drawTitle();
        let num = 1;
        for(let x of todoList){
            let listItem = `[${num++}]`;
            listItem += " " + x.value;
            
            console.log(listItem);
        }
        console.log("\n==========================================\n");

        const numTask = readlineSync.question(`\nDigite o numero da task que deseja editar: `);

        if(numTask <= todoList.length){
            finish = true;
            const newText = readlineSync.question(`\nDigite o novo texto da task ${numTask}: `);

            //se o texto digitado for vazio, ele permanece com o texto anterior
            todoList[numTask-1].value = newText == ""?todoList[numTask-1].value:newText;
        }
    }
}