class Todo {
  constructor(data, todoTemplateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(todoTemplateSelector);
    this._handleCheck = handleCheck; // Updates completed count
    this._handleDelete = handleDelete; // Updates total count
  }

  // ===== PUBLIC =====
  getView() {
    // Clone template and populate text
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoElement.querySelector(".todo__name").textContent =
      this._data.name;

    // Build and wire up
    this._generateCheckboxEl();
    this._generateDueDateEl();
    this._setEventListeners();

    return this._todoElement;
  }

  // ===== PRIVATE: DOM CREATION =====
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDueDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const date = new Date(this._data.date);

    if (!isNaN(date)) {
      this._todoDate.textContent = `Due: ${date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  // ===== PRIVATE: EVENTS =====
  _setEventListeners() {
    // Delete button
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete(this._data); // Notify before removal
      }
      this._todoElement.remove();
    });

    // Checkbox toggle
    this._todoCheckboxEl.addEventListener("change", () => {
      const wasCompleted = this._data.completed;
      this._data.completed = !this._data.completed;

      if (this._handleCheck) {
        this._handleCheck(!wasCompleted); // true if newly completed
      }
    });
  }
}

export default Todo;
