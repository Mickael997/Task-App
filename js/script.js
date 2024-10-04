// * Selecionar as TAGS

const inputText = document.getElementById('task');
const taskList = document.getElementById('task-list');
const btnAdd = document.getElementById('btnAdd');

// * Conectar o btnAdd a uma função VIA JS
// * function () {} função anônima
btnAdd.addEventListener('click', function(){
    addTask();
})

inputText.addEventListener('keydown', function(e){
    // * Se o que foi pressionado é ENTER
    if(e.code == "Enter")
    addTask();
})


// * Função - Conectado ao botão
function addTask(){
    // ^ value em um input = Valor digitado ou valor dentro da caixa de texto
    if(inputText.value == ''){
        alert("Você precisa adicionar a descrição da tarefa");
    }
    else{
        // ? ELSE = A PESSOA DIGITOU O NOME DA TAREFA
        //* CRIANDO UMA TAG E SALVANDO EM UMA VARIÁVEL
        //* createElement() CRIA UMA TAG
        //* um novo LI = uma nova tarefa
        let li = document.createElement("li");
        //* o conteúdo do li recebe o que a pessoa digitou
        li.innerHTML = inputText.value;
        //^ appendChild = adiciona uma tag dentro de outra
        //^ no caso o novo <li> é colocado dentro do <ul> taskList
        taskList.appendChild(li);

        // * criando um Span com X
        let span = document.createElement('span');
        // * \u007 representa um X
        span.innerHTML = '\u00d7';
        // ^ Adicionando o span DENTRO do <li> que acabou de ser criado
        li.appendChild(span);
    }
    // * Limpando caixa de texto para a próxima tarefa
    inputText.value = '';
    saveData();
}

// * 03/10/2024
// ^ Adicionando evento de clique na lista de tarefas
taskList.addEventListener('click', function(e){
    /*
    ^   O 'e' na função anônima representa a TAG que foi clicada
    ^   Pois dentro da TaskList tem muita coisa pra clicar (ul, span, li, imagem)
    ^   Então precisamos saber no que exatamente foi clicado
    */
    // * Checando se o que foi clicado foi a tag <li>
    if(e.target.tagName == 'LI'){
        // * Se sim, ele tira ou adiciona a classe 'checked'
        e.target.classList.toggle('checked');
        saveData();
    } 
    // * Se não foi o <li> foi o <span> que foi clicado? o X
    else if (e.target.tagName == 'SPAN'){
        // * Pegamos o que foi clicado e acessamos o seu Pai

        // ^ e apagamos o seu pai (O <LI>)
        //* e.target = tagSpan
        e.target.parentElement.remove();
        saveData();
    }
})

//* salvando informações no navegador, para não perder as tarefas ao fechar o site.

function saveData(){
    // * LocalStorage = armazenamento local do navegador
    //* setItem = adiciona uma 'variável' chamada "task_data"
    //* taskList.innerHTML = todos os <li>
    localStorage.setItem("task_data", taskList.innerHTML);
}

function loadData(){
    //* Ao carregar o site de novo, o <ul> taskList vai iniciar vazio
    //* então escrevemos o seu innerHTML (Seu conteúdo) com a informação salva no localStorage
    taskList.innerHTML = localStorage.getItem(`task_data`);
}
// ^ Chamando a função fora = chama ela ao carregar o site
// * Então ao abrir o site ele carrega os <li> salvos no localStorage
loadData();