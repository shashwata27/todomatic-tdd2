import { shallow } from "enzyme";
import { screen, render, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../App";
import { DATA } from "../data/taskData";
import Form from "../components/Form/Form";
import Todo from "../components/Todo/Todo";
import FilterButton from "../components/FilterButton/FilterButton";

describe("Basic Structure of App", () => {
  test("should have a h1 tag", () => {
    const app = shallow(<App tasks={DATA} />);

    const h1Tag = app.find("h1");

    expect(h1Tag).toBeDefined();
  });
  test("should have a heading with value TodoMatic", () => {
    render(<App tasks={DATA} />);

    const todomatic = screen.getByText("TodoMatic");

    expect(todomatic).toBeInTheDocument();
  });
  test("should have a form component", () => {
    const app = shallow(<App tasks={DATA} />);

    const formComponent = app.find(Form);

    expect(formComponent).toBeDefined();
  });
  test("should have filter buttons", () => {
    const app = shallow(<App tasks={DATA} />);

    const filterButtonComponent = app.find(FilterButton);

    expect(filterButtonComponent).toBeDefined();
  });
  test("should have h2 tag", () => {
    const app = shallow(<App tasks={DATA} />);

    const h2Tag = app.find("h2");

    expect(h2Tag).toBeDefined();
  });
  test("should have a heading with value remaining", () => {
    render(<App tasks={DATA} />);

    const tasksRemaining = screen.getByText(/remaining/i);

    expect(tasksRemaining).toBeInTheDocument();
  });
  test("should have a ul with todoitems", () => {
    const app = shallow(<App tasks={DATA} />);

    const todoComponent = app.find(Todo);

    expect(todoComponent).toBeDefined();
  });
});

describe("Functionality of App", () => {
  test("Should delete todo when delete button pressed", () => {
    render(<App tasks={DATA} />);
    const eatTodo = screen.getByTestId(/testid-eat/i);

    expect(eatTodo).toHaveTextContent(/eat/i);
    expect(eatTodo).toBeInTheDocument();

    const deleteButton = getByRoleWithName("button", /delete eat/i);
    user.click(deleteButton);
    expect(eatTodo).not.toBeInTheDocument();
  });
  test("Should go to edit mode TODO when edit button pressed", () => {
    render(<App tasks={DATA} />);

    const editButton = getByRoleWithName("button", /edit eat/i);
    user.click(editButton);
    const editViewInput = getByRoleWithName("textbox", /new name for eat/i);

    expect(editViewInput).toBeInTheDocument();
    expect(editViewInput).toHaveTextContent("");
  });
  test("Should show new name when save button pressed", () => {
    render(<App tasks={DATA} />);
    const eatTodo = screen.getByTestId("testid-Eat");
    const todoLabel = within(eatTodo).getByRole("todo-label");
    const editButton = getByRoleWithName("button", /edit eat/i);

    expect(todoLabel).toHaveTextContent(/eat/i);

    user.click(editButton);

    const editViewInput = getByRoleWithName("textbox", /new name for eat/i);
    const saveButton = getByRoleWithName("button", /save new name for eat/i);

    user.type(editViewInput, "fast eat");
    user.click(saveButton);

    const fastEatTodo = screen.getByTestId("testid-fast eat");
    const newTodoLabel = within(fastEatTodo).getByRole("todo-label");

    expect(newTodoLabel).toBeInTheDocument();
    expect(newTodoLabel).toHaveTextContent("fast eat");
    expect(todoLabel).not.toBeInTheDocument();
    expect(newTodoLabel).not.toHaveTextContent("Eat");
  });
  test("Should add new todo when add button pressed", () => {
    render(<App tasks={DATA} />);
    const formInput = screen.getByLabelText(/What needs to be done/i);
    const addButton = getByRoleWithName("button", /add/i);
    let allTodoLabels = screen.getAllByRole("todo-label");

    expect(allTodoLabels.length).toBe(3);

    user.type(formInput, "new task");
    user.click(addButton);

    allTodoLabels = screen.getAllByRole("todo-label");

    expect(allTodoLabels.length).toBe(4);
  });
  test("Should toggle task staus when checkbox pressed", () => {
    render(<App tasks={DATA} />);
    const todo = screen.getByTestId("testid-Eat");
    const checkbox = within(todo).getByRole("checkbox");

    expect(checkbox).toBeChecked();
    user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
  test("Should filter todo when filters pressed", () => {
    render(<App tasks={DATA} />);
    const alltasks = getByRoleWithName("button", /show all tasks/i);
    const activeTasks = getByRoleWithName("button", /show active tasks/i);
    const completedTaks = getByRoleWithName("button", /show completed tasks/i);
    let allTodoLabels = screen.getAllByRole("todo-label");

    user.click(alltasks);
    expect(allTodoLabels.length).toBe(3);

    user.click(activeTasks);

    allTodoLabels = screen.getAllByRole("todo-label");
    expect(allTodoLabels.length).toBe(2);

    user.click(completedTaks);

    allTodoLabels = screen.getAllByRole("todo-label");
    expect(allTodoLabels.length).toBe(1);
  });
});

const getByRoleWithName = (role, roleName) =>
  screen.getByRole(role, {
    name: roleName,
  });
