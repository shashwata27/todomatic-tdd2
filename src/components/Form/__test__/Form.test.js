import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Form from "../Form";
import { lazy } from "react";

describe("Basic Structure of Form", () => {
  test("should have a form tag", () => {
    const wrapper = shallow(<Form />);

    const formComponent = wrapper.find("form");

    expect(formComponent).toBeDefined();
  });
  test("should have a h2 tag", () => {
    const wrapper = shallow(<Form />);

    const h2Tag = wrapper.find(".label-wrapper");

    expect(h2Tag).toBeDefined();
  });
  test("should have a input tag with attributes", () => {
    const wrapper = shallow(<Form addTask={jest.fn} />);

    const input = wrapper.find("input");

    expect(input).toBeDefined();
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("name")).toEqual("text");
    expect(input.prop("autoComplete")).toEqual("off");
  });

  test("should have a add button tag with attributes", () => {
    render(<Form addTask={jest.fn} />);

    const button = getFormAddButton();

    expect(button).toBeDefined();
    expect(button.innerHTML).toEqual("Add");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__primary");
  });
});

describe("Functionality of Form", () => {
  const addTask = jest.fn();

  beforeEach(() => {
    addTask.mockClear();
    render(<Form addTask={addTask} />);
  });

  test("should add a new todo", () => {
    const input = screen.getByRole("textbox");
    user.type(input, "work");

    const addButton = getFormAddButton();
    user.click(addButton);

    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalledWith("work");
    expect(input).toHaveValue("");
  });
});

const getFormAddButton = () => {
  return screen.getByRole("button", {
    name: /add/i,
  });
};
