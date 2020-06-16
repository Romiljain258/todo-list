'use strict'
class Task  //class is a blue print that define how object should look like
{ 
    constructor(text){
        this.text =text;
        this.isCompleted = false;
    }
}
// js starts from there after call from line no 87.
class TodoList{
    constructor(){ // global function
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [{text : "hit gym",isCompleted : false}]; // here we are getting data from localStorage,if we did refresh.Why this our data will not be refresh. 
                                                          // when js will come here,so it will error bcoz right in local storage their is nothing like task,so to handel this we make empty array.
        this.body =document.getElementsByTagName("body")[0];
        this.render(this.tasks); // show data same as before refresh & we are fething data from this.list & display there.
        
    }
    
    render(chosenTaskArray){ // this is the function but in js inside class just write like this not function foo(){}.
        this.body.innerHTML = "";
        this.addPromptFormForAddingTasks(); // *if we want to call function from inside class then we will write .this .
        this.addListWithTasks(chosenTaskArray);
    }

    addPromptFormForAddingTasks(){
        const input = document.createElement("input");
        const button = document.createElement("button");
        input.className = "add-task--input"; // class name(id name)
        input.autofocus = true; // heighlight box
        input.placeholder = "Add Task"; // give name inside box
        button.innerHTML = "Add task";
        button.addEventListener("click",()=>{
            this.addTaskToList(input.value);
        });
    this.body.appendChild(input);
    this.body.appendChild(button);
    }

    addTaskToList(text){
        if(text ==="" || text == null){
            alert("it would be too easy for you");
        }
        else{
            let task = new Task(text);
            this.tasks.push(task);
            this.render(this.tasks);
        }
    }
    
    addListWithTasks(chosenTaskArray)
    {
        const ul = document.createElement("ul");
        ul.className = "todo-List";

        chosenTaskArray.forEach(function(task,taskIndex) // exactly same as for loop,we can use for loop also.
        {
            const li=document.createElement("li");
            const removeTaskButton = document.createElement("div");
            const removeIcon = document.createTextNode("\u00D7");

            li.classList.add("task"); // task will be class accessible by css & will give array.
            removeTaskButton.className = "delete-task-button"; // we are giving class Name.
            removeTaskButton.addEventListener("click",()=>{
                ul.removeChild(li); // remove one list from array in js.
                // (this.tasks is the array)
                
                this.tasks = this.tasks // we are not removing from tasks array,just updting our new list in new tasks array.
                .slice(0,taskIndex)
                .concat(this.tasks.slice(taskIndex+1,this.tasks.length));
                this.saveTasksInLocalStorage(); // save task in localStorage.
                this.render(this.tasks); // render means it will show back after refresh as same as it was.

            })
            removeTaskButton.appendChild(removeIcon);
            li.innerHTML = task.text;// This will show like text.
            li.appendChild( removeTaskButton);
            ul.appendChild(li);
        });
        this.body.appendChild(ul);
        this.saveTasksInLocalStorage();
    }

    saveTasksInLocalStorage()
    {
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
    }
}

const todo = new TodoList(); 
//new function will direct to (9 line) class of constructor & start,then (13->17->21 line).
