document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (task) {
            addTask(task);
            todoInput.value = '';
            saveTask(task);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
            deleteTask(task);
        });

        li.appendChild(deleteBtn);
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        todoList.appendChild(li);
    }

    function saveTask(task) {
        console.log('Saving task:', task); // Debugging line
        fetch('save_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `task=${encodeURIComponent(task)}`
        }).then(response => response.text())
          .then(data => console.log(data))  // Log the response for debugging
          .catch(error => console.error('Error:', error));  // Log any errors
    }

    function deleteTask(task) {
        fetch('delete_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `task=${encodeURIComponent(task)}`
        }).then(response => response.text())
          .then(data => console.log(data))  // Log the response for debugging
          .catch(error => console.error('Error:', error));  // Log any errors
    }
});
