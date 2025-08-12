// ===== IMPORTS =====
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// ===== DOM ELEMENTS =====
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];

// ===== COMPONENTS =====
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// ===== HANDLERS =====
function handleCheck(increment) {
  todoCounter.updateCompleted(increment);
}

function handleDelete(todoData) {
  todoCounter.updateTotal(false);
  if (todoData.completed) {
    todoCounter.updateCompleted(false);
  }
}

// ===== HELPERS =====
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// ===== SECTION SETUP =====
const section = new Section({
  items: initialTodos,
  renderer: (data) => generateTodo(data),
  containerSelector: ".todos__list",
});
section.renderItems();

// ===== POPUP SETUP =====
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // Adjust date for timezone offset
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Create unique ID and todo object
    const id = uuidv4();
    const values = { ...inputValues, date, id, completed: false };

    // Add to DOM
    section.addItem(generateTodo(values));
    todoCounter.updateTotal(true);

    // Close popup and reset validation
    addTodoPopup.close();
    newTodoFormValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

// ===== EVENT LISTENERS =====
addTodoButton.addEventListener("click", () => addTodoPopup.open());

// ===== FORM VALIDATION =====
const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();
