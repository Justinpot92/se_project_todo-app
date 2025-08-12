// ===== TODO COUNTER COMPONENT =====
class TodoCounter {
  // todos: array of initial todo items
  // selector: CSS selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    if (!this._element) {
      throw new Error(`Element not found for selector: ${selector}`);
    }

    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  // Called when a todo is checked/unchecked or a completed todo is deleted
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;

    // Keep within bounds
    if (this._completed < 0) this._completed = 0;
    if (this._completed > this._total) this._completed = this._total;

    this._updateText();
  };

  // Called when a todo is added or deleted
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;

    // Adjust completed count if total shrinks below it
    if (this._total < this._completed) {
      this._completed = this._total;
    }
    if (this._total < 0) this._total = 0;

    this._updateText();
  };

  // Update the displayed text with current counts
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
