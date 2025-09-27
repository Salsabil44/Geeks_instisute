
import { TodoList } from "./todo.js";

const myTodo = new TodoList();
myTodo.addTask("Learn Node.js");
myTodo.addTask("Build an API");
myTodo.completeTask(0);

console.log(myTodo.listTasks());
