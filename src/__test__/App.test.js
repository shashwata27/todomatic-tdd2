import { shallow } from "enzyme";
import { screen, render } from "@testing-library/react";
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
