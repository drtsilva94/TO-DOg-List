// Aguarda o carregamento completo do conteúdo HTML antes de executar o JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos da página
    const taskInput = document.getElementById('taskInput'); // Campo de entrada para a nova tarefa
    const addTaskButton = document.getElementById('addTaskButton'); // Botão para adicionar tarefas
    const taskList = document.getElementById('taskList'); // Lista onde as tarefas serão exibidas

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

    // Adiciona a tarefa ao clicar no botão "Adicionar Tarefa"
    addTaskButton.addEventListener('click', addTask);

    // Adiciona a tarefa ao pressionar a tecla "Enter" no campo de entrada
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { // Verifica se a tecla pressionada é "Enter"
            addTask(); // Chama a função addTask para adicionar a tarefa
        }
    });

    // Evento para remover a tarefa ao clicar no botão "Excluir"
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton')) { // Verifica se o elemento clicado tem a classe "deleteButton"
            e.target.parentElement.remove(); // Remove o elemento pai (li) da tarefa da lista
        }
    });
});
