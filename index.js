
const form = document.getElementById('form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

window.onload = _ =>{
    if(JSON.parse(localStorage.getItem('todo'))){
        JSON.parse(localStorage.getItem('todo')).forEach(props =>{
            addTask(props);
        });
    }    
}

form.addEventListener("submit", event =>{
    event.preventDefault();
    if(input.value){
        const taskProps = {
            content: input.value,
            checked: false, 
            id: Math.random().toString(36).substr(2, 9),
        };

        addTask(taskProps);
        input.value = '';

        // updating local storage
        const sotred_tasks = JSON.parse(localStorage.getItem('todo'));
        localStorage.setItem('todo', JSON.stringify((sotred_tasks || []).concat(taskProps)));
    };
    
});



function addTask(props){
    const taskElement = document.createElement('li');
    taskElement.className = props.checked ? 'task checked' : 'task';
    taskElement.addEventListener('click', () =>{
        taskElement.classList.toggle('checked');
        // updating local sotrage
        const updated = JSON.parse(localStorage.getItem('todo')).map(task =>{
            if(task.id == props.id){
                task.checked = !task.checked;
                return task;
            }
            return task;
        });
        localStorage.setItem('todo', JSON.stringify(updated));
    });
    taskElement.setAttribute("taskid", props.id)
    taskElement.innerText = props.content;
    const removeElement = document.createElement('i');
    removeElement.innerText = '\u00d7';
    removeElement.addEventListener('click', () =>{
        removeElement.parentElement.remove();
        // updating local storage
        const updated = JSON.parse(localStorage.getItem('todo')).filter(task =>{
            if(task.id != props.id){
                return true;
            }
        });
        localStorage.setItem('todo', JSON.stringify(updated));
    });

    taskElement.append(removeElement);
    list.append(taskElement);
};

document.getElementById('clear-btn').addEventListener('click', () =>{
    list.innerHTML = '';
    localStorage.removeItem('todo');
})