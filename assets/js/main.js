const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {
  //console.log(e);
  if(e.keyCode === 13) {
    if (!inputTarefa.value) return;//isso é para quando não existe valor ou seja o input em branco
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();// fous é quando clicamos na caixa de input e aparece o traço piscando
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function(e) {
  if (!inputTarefa.value) return;//isso é para quando não existe valor ou seja o input em branco
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// trim é para tirar espaços
    listaDeTarefas.push(tarefaTexto);
  }
// abaixo convertemos o array listaDeTarefas para uma string JSON,
// que depois pode ser convertida dnv para array
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
// aqui convertemos o json para array novamente
  const listaDeTarefas = JSON.parse(tarefas);
  
  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
// aqui quando carrega o site já chama essa função para que apereça
// na tela as tarefas salvas no arquivo
adicionaTarefasSalvas();