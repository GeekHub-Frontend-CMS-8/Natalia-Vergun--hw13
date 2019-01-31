window.onload = function() {

    let todoList = [];
    if (localStorage.getItem('todos') != undefined) {
        todoList = JSON.parse(localStorage.getItem('todos'));
        out();
    }

    document.getElementById('in').onchange = function () {
        let task = document.getElementById('in').value;
        let temp = {};
        temp.todo = task;
        temp.check = false;
        let d = todoList.length;
        todoList[d] = temp;
        out();
        console.log(todoList);
        localStorage.setItem('todos', JSON.stringify(todoList));
    };

    function out() {
        let out = '';
        for (let key in todoList) {
            if (todoList[key].check == true) {
                out += `<li><input type="checkbox" id="check" checked>${todoList[key].todo}</li>`;

            } else {
                out += `<li><input type="checkbox" id="check">${todoList[key].todo}</li>`;
            }
        }
        document.getElementById('out').innerHTML = out;
        document.getElementById('in').value = "";
    }


    document.getElementById('more').onclick = function () {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://jsonplaceholder.typicode.com/todos');
        request.onload = function () {
            let toDoData = JSON.parse(request.responseText);
            renderHtml(toDoData);
        };
        request.send();
     };

    let counter = 0;
    const step = 5;

    function renderHtml(data) {
        let loadedList = '';
        for (i=counter; i< counter + step; i++) {
            loadedList += `<p>${data[i].title}</p>`;
            document.getElementById('todo-more').innerHTML = loadedList;
        }
        counter = counter + step;
    }
};