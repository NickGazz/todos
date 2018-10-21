"use strict";

const APIURL = 'http://192.168.1.114:5000';

const main = document.querySelector('main');
const newList = document.querySelector('main');

const htmlTemplate = {
  List: (data)=>{return `
    <span>${data.listName}</span>
    <button class="newTask"></button>`;
  },
  Task: (data)=>{ return `<span>${data.taskName}</span>`},
  render(type, parent, data){
    let div = document.createElement('div');
    div.className = type;
    div.dataset.listId = data.listId;
    if (type === 'Task') div.dataset.taskId = data.taskId;
    div.innerHTML = this[type](data);
    parent.append(div);
    console.log(div);
    return div;
  }
}

function updateDB(method, type, data) {
  return fetch(`${APIURL}/${method}${type}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    mode: "cors"
  })
  .then(res=>res.text())
  .catch(err=>console.error(err));
}

function listData(e){
  let listName; //= //get the name value;
  return {listName: 'test'};
}

function taskData(e){
  let listDiv;// =
  let listId;// = get list id
  let taskName; // = get task name value;
  return {
    listId,
    order,
    task,
    state,
  };
}

main.addEventListener('click', (e)=>{
  e.preventDefault();
  let type = e.target.parentNode.className;
  let data = (type === 'List')? listData(e) : taskData(e);
  let parent = (type === 'List')? main : listDiv; //need to get list div
  updateDB('new', type, data).then(id=>{
    data.id=id
    htmlTemplate.render(type, parent, data);
  });
});

// Get all lists and task from database at startup, then render them
fetch(`${APIURL}/user`)
  .then(res=>res.json())
  .then(lists=>{
    for (let list of lists){
      console.log(list);
      let listDiv = htmlTemplate.render('List', main, {listId: list.id, listName: list.listname});
      for (let task of list.tasks){
        console.log(listDiv);
        htmlTemplate.render('Task', listDiv, {listId:task._list_id, taskId:task._task_id, taskName:task.task});
      }
    }
  });
