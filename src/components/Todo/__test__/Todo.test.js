import { shallow } from "enzyme";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { lazy } from "react";
import Todo from "../Todo";

describe("Basic Stucture of Todo", () => {
  const toggleTaskCompleted = jest.fn();
  const deleteTask = jest.fn();
  const editTask = jest.fn();

  beforeEach(() => {
    toggleTaskCompleted.mockClear();
    deleteTask.mockClear();
    editTask.mockClear();
    render(
      <Todo
        name="todo-test"
        completed={false}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  });

  test("Should Have all tags in viewing and editing mode", () => {
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByRole("todo-label");
    const editButton = getButtonbyName(/edit todo-test/i);
    const deleteButton = getButtonbyName(/delete todo-test/i);
    user.click(deleteButton);

    expect(checkbox).not.toBeChecked();
    expect(label).toHaveClass("todo-label");
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(deleteTask).toHaveBeenCalledTimes(1);

    user.click(editButton);
    const form = screen.getByRole("form");
    const editingLabel = screen.getByRole("todo-label");
    const input = screen.getByRole("textbox");
    const saveButton = getButtonbyName(/Save new name for todo-test/i);
    const cancelButton = getButtonbyName(/Cancel renaming todo-test/i);

    expect(form).toBeInTheDocument();
    expect(editingLabel).toHaveClass("todo-label");
    expect(input).toHaveClass("todo-text");
    expect(saveButton).toHaveClass("btn btn__primary todo-edit");
    expect(cancelButton).toHaveClass("btn todo-cancel");

    user.click(saveButton);

    expect(editTask).toHaveBeenCalledTimes(1);
  });
});

describe("Functionality of Todo", () => {
  const toggleTaskCompleted = jest.fn();
  const deleteTask = jest.fn();
  const editTask = jest.fn();
  beforeEach(() => {
    toggleTaskCompleted.mockClear();
    deleteTask.mockClear();
    editTask.mockClear();
  });

  test("Should have onClick handlers as instances of defined functions", () => {
    const wrapper = shallow(<Todo />);
    const editButton = wrapper.find(".btn-edit");
    const deleteButton = wrapper.find(".btn__danger");

    expect(editButton.prop("onClick").toString()).toBe(
      "() => setEditing(true)"
    );
    expect(deleteButton.prop("onClick").toString()).toBe(
      "() => props.deleteTask(props.id)"
    );

    editButton.invoke("onClick")();
    const cancelButton = wrapper.find(".todo-cancel");
    const saveButton = wrapper.find(".todo-edit");

    expect(cancelButton.prop("onClick").toString()).toBe(
      "() => setEditing(false)"
    );
    expect(saveButton.prop("onClick").toString()).toBe(`e => {
    console.log(newName);
    e.preventDefault();
    props.editTask(props.id, newName);
    setEditing(false);
  }`);
  });
});

const getButtonbyName = (buttonName) =>
  screen.getByRole("button", {
    name: buttonName,
  });
