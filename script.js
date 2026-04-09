// Aguarda o carregamento completo do conteúdo HTML antes de executar o JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos da página
    const taskInput = document.getElementById('taskInput'); // Campo de entrada para a nova tarefa
    const addTaskButton = document.getElementById('addTaskButton'); // Botão para adicionar tarefas
    const taskList = document.getElementById('taskList'); // Lista onde as tarefas serão exibidas


    // NOVO: Array para armazenar tarefas
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    // NOVO: Salvar tarefas no navegador
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    // NOVO: Criar elemento visual da tarefa
    function createTaskElement(task, index) {
        const li = document.createElement('li');

        li.innerHTML = `
            <span class="taskText ${task.completed ? 'completed' : ''}" data-index="${index}">
                ${task.text}
            </span>
            <button class="deleteButton" data-index="${index}">Excluir</button>
        `;

        return li;
    }


    // NOVO: Renderizar lista completa
function renderTasks() {
    taskList.innerHTML = '';

    // Cria uma cópia do array para não bagunçar a ordem original diretamente
    const sortedTasks = [...tasks].sort((a, b) => {
        // Tarefas não concluídas ficam antes das concluídas
        return a.completed - b.completed;
    });

    sortedTasks.forEach((task) => {
        // Pega o índice real da tarefa no array original
        const originalIndex = tasks.indexOf(task);

        const li = createTaskElement(task, originalIndex);
        taskList.appendChild(li);
    });
}


    /*
    // Função para adicionar uma nova tarefa
    function addTask() {
        const taskText = taskInput.value.trim(); // Obtém o texto da tarefa e remove espaços extras
        if (taskText === '') return; // Verifica se o campo está vazio, caso sim, a função é interrompida

        // Cria um novo elemento de lista (li) para a tarefa
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span> <!-- Exibe o texto da tarefa -->
            <button class="deleteButton">Excluir</button> <!-- Botão para excluir a tarefa -->
        `;
        taskList.appendChild(li); // Adiciona o item (li) à lista de tarefas

        // Limpa o campo de entrada após adicionar a tarefa
        taskInput.value = '';
    }
    */


    // NOVO: addTask com salvamento no localStorage
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        tasks.unshift({
            text: taskText,
            completed: false
        });

        saveTasks();
        renderTasks();

        taskInput.value = '';
    }



    // Adiciona a tarefa ao clicar no botão "Adicionar Tarefa"
    addTaskButton.addEventListener('click', addTask);

    // Adiciona a tarefa ao pressionar a tecla "Enter" no campo de entrada
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { // Verifica se a tecla pressionada é "Enter"
            addTask(); // Chama a função addTask para adicionar a tarefa
        }
    });

    /*
    // Evento para remover a tarefa ao clicar no botão "Excluir"
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton')) { // Verifica se o elemento clicado tem a classe "deleteButton"
            e.target.parentElement.remove(); // Remove o elemento pai (li) da tarefa da lista
        }
    });
    */

    // NOVO: clique na lista
    taskList.addEventListener('click', (e) => {

        // Remover tarefa
        if (e.target.classList.contains('deleteButton')) {
            const index = parseInt(e.target.getAttribute('data-index'));

            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        // Marcar/desmarcar como concluída
        if (e.target.classList.contains('taskText')) {
            const index = parseInt(e.target.getAttribute('data-index'));

            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }
    });



    /*
    // NOVO: Remover + salvar
    
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton')) {

            const index = e.target.getAttribute('data-index');

            tasks.splice(index, 1); // remove do array
            saveTasks();            // atualiza localStorage
            renderTasks();          // atualiza tela
        }
    });
    */

    
    //NOVO: carregar ao abrir
   
    renderTasks();

});
