import { SlideModel } from '../../core/models/slide-model.js';
import { SlideService } from '../../core/services/slide-service.js';
import { FrameworkBase } from '../../framework/framework-base.js';
import { ServiceLocator } from '../../framework/service-locator.js';
import { MyModel } from './my-model.js';

export class ExamplePage extends FrameworkBase<MyModel> {

  slideService: SlideService;

  constructor() {
    super();
    this.slideService = ServiceLocator.resolve<SlideService>(SlideService.name)
  }

  template(): string {
    return /*html*/`
        <h2>Examples</h2>
        <input type="text" data-bind="event: {input: showInput}, value: name" />
        <p>You entered: <span data-bind="innerHTML: name"></span></p>
        <button data-bind="event: { click: loadSlides }">Load data</button>
        <select data-bind="foreach: s of slides, event: { change: setSelectedSlide }">
          <option data-bind="value: s.header, innerHTML: s.header, attr: { selected: slideIsSelected }"></option>
        </select>
        <p data-bind="innerHTML: selectedSlideText"></p>
        <h2>Todos</h2>
        <input type="text" data-bind="value: todoText, event: { input: setTodoText, keyup: detectTodoEnter }" />
        <button data-bind="event: { click: addTodo }, attr: { disabled: getAddTodoState }">Add</button>
        <ul data-bind="foreach: todo of todos">
          <li>
            <span data-bind="innerHTML: todo"></span>
            <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</span>
          </li>
        </ul>
        `;
  }

  styles() {
    return `
          :host {
          }
          slide-view {
            opacity: 0;
            transition: opacity 0.8s ease-in-out;
          }
          slide-view.visible {
            opacity: 1;
          }`;
  }

  initState() {
    let model = new MyModel();
    model.name = "Some text";
    model.slides = [];
    model.selectedSlideText = "";
    model.todos = ["Write a framework", "Get famous"];
    model.todoText = "";
    return model;
  }

  async afterInit() {
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

  loadSlides = async () => {
    const presentation = await this.slideService.getSlides();
    this.state.slides = presentation.slides;
  }

  showInput = async (a: InputEvent) => {
    this.state.name = (a.target as HTMLInputElement).value;
  }

  setSelectedSlide = (a: Event) => {
    const slideHeader = (a.target as HTMLSelectElement).value;
    this.state.selectedSlideText = this.state.slides.filter(s => s.header === slideHeader)[0].body;
  }

  slideIsSelected = (s: SlideModel) => {
    return s?.body === this.state.selectedSlideText ? "selected" : null;
  }
}
