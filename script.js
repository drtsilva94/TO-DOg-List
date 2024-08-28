document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Função para adicionar uma tarefa
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteButton">Excluir</button>
        `;
        taskList.appendChild(li);

        // Limpar o campo de entrada
        taskInput.value = '';
    }

    // Adicionar a tarefa ao clicar no botão
    addTaskButton.addEventListener('click', addTask);

    // Adicionar a tarefa ao pressionar Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Remover a tarefa ao clicar no botão de exclusão
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton')) {
            e.target.parentElement.remove();
        }
    });
});