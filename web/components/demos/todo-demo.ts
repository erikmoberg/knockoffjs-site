import { KnockoffJsBase } from "../../../knockoffjs/knockoffjs-base.js";

class TodoDemoModel {
  todoText: string;
  todos: string[];
}

export class TodoDemo extends KnockoffJsBase<TodoDemoModel> {

  constructor() {
    let model = new TodoDemoModel();
    model.todos = ["Write a framework", "Get famous"];
    model.todoText = "";
    super(model);
  }

  template(): string {
    return /*html*/`
    <input type="text" data-bind="value: todoText, event: { input: setTodoText, keyup: detectTodoEnter }" />
    <button data-bind="event: { click: addTodo }, attr: { disabled: getAddTodoState }">Add</button>
    <ul data-bind="foreach: todo of todos">
      <li>
        <span data-bind="innerText: todo"></span>
        <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</a>
      </li>
    </ul>`;
  }

  styles() {
    return /*CSS*/`
    `;
  }

  getAddTodoState = () => {
    return this.state.todoText ? null : "disabled";
  }

  addTodo = () => {
    this.state.todos = [...this.state.todos, this.state.todoText];
    this.state.todoText = "";
  }

  removeTodo = (ev: Event, todo: string) => {
    const newArray = this.state.todos.slice();
    newArray.splice(this.state.todos.indexOf(todo), 1);
    this.state.todos = newArray;
  }

  setTodoText = async (e: InputEvent) => {
    this.state.todoText = (e.target as HTMLInputElement).value;
  }

  detectTodoEnter = async (e: KeyboardEvent) => {
    if (e.code == "Enter" && this.state.todoText) {
      this.addTodo();
    }
  }
}
