const btnAdicionarTask = document.querySelector('.app__button--add-task');
const formAdicionarTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTask = document.querySelector('.app__section-active-task-description');
const btnRemoverconcluidas = document.querySelector('#btn-remover-concluidas');
const formLimparLista = document.querySelector('#btn-remover-todas');
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');

let listaTasks = JSON.parse(localStorage.getItem('listaTasks')) || [] ;

let taskSelecionada = null;
let liTaskSelecionada = null;
// JSON.parse é uma função que converte uma string JSON em um objeto JavaScript.

function atualizarTarefas(){
    localStorage.setItem('listaTasks', JSON.stringify(listaTasks));
}

function criarElementoTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item-description');
    li.classList.add('app__section-task-list-item');
    

    const svg = document.createElement('svg');
    svg.innerHTML = `
                <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
                </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = task.descricaoTask;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        if(novaDescricao === "" || novaDescricao === null){
            alert("descrição não pode ser vazia");
            return;
        }else{
        // console.log(`Nova descrição é: ${novaDescricao}`);
        paragrafo.textContent = novaDescricao;
        task.taskDescricao = novaDescricao;
        atualizarTarefas();
    }
    }

    const imagemBotao = document.createElement('img');

    imagemBotao.setAttribute('src', './imagens/edit.png');

    botao.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo)
    li.append(botao);

    if(task.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    }else{    
        li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active');
        });
        if(taskSelecionada == task){
            paragrafoDescricaoTask.textContent = '';
            taskSelecionada = null;
            liTaskSelecionada = null;
            return;
        }
        taskSelecionada = task;
        liTaskSelecionada = li;
        paragrafoDescricaoTask.textContent = task.descricaoTask;

        li.classList.add('app__section-task-list-item-active');
        }
    }


// O método append() insere um conjunto de objetos Node ou DOMString após o último filho do Element. DOMString objetos são inseridos como Text.

    return li;
        
}

btnAdicionarTask.addEventListener('click', () => {
    formAdicionarTask.classList.toggle('hidden');
});

formAdicionarTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    // Esta linha evita que a página recarregue (comportamento padrão de um formulário). Nós não queremos isso!
    const task = {
        descricaoTask: textArea.value
    }
    listaTasks.push(task);
    const elementoTask = criarElementoTask(task);
    ulTasks.append(elementoTask);
    atualizarTarefas();
    textArea.value = '';
    formAdicionarTask.classList.add('hidden');
});

botaoCancelar.addEventListener('click', () => {
    textArea.value = '';
    formAdicionarTask.classList.add('hidden');
});

formLimparLista.addEventListener('click', () => {
    ulTasks.innerHTML = '';
    localStorage.removeItem('listaTasks');
    listaTasks.length = 0;});
    
btnRemoverconcluidas.addEventListener('click', () => {
    const seletor = ".app__section-task-list-item-complete";
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    listaTasks = listaTasks.filter(task => !task.completa);
    atualizarTarefas();
});
// E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
// Convertendo o array para uma string em formato JSON para poder armazenar.
//localStorage é uma API de armazenamento web fornecida pelos navegadores que permite armazenar pares de chave-valor no navegador sem tempo de expiração. Isso significa que os dados armazenados em localStorage persistirão mesmo após o navegador ser fechado e reaberto.

listaTasks.forEach(task => {
   const elementoTask = criarElementoTask(task);
   ulTasks.append(elementoTask);
});  


document.addEventListener('focoFinalizado', () => {
    if(taskSelecionada && liTaskSelecionada){
        liTaskSelecionada.classList.remove('app__section-task-list-item-active');
        liTaskSelecionada.classList.add('app__section-task-list-item-complete');
        liTaskSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        taskSelecionada.completa = true;
        atualizarTarefas();
    }
});

//outra forma de remover as trarefas concluidas é:


// const removerTarefas  = (somenteCompletas) => {
//     // const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
//     let seletor =  ".app__section-task-list-item"
//     if (somenteCompletas) {
//         seletor = ".app__section-task-list-item-complete"
//     }
//     document.querySelectorAll(seletor).forEach(elemento => {
//         elemento.remove();
//     });
    // tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    //     atualizarTarefas()



// btnRemoverConcluidas.onclick = () => removerTarefas(true)
// btnRemoverTodas.onclick = () => removerTarefas(false)