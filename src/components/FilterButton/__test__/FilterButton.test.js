import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import FilterButton from "../FilterButton";
import { lazy } from "react";

describe("Basic Structure of FilterButton", () => {
  test("should have a form tag", () => {
    const wrapper = shallow(<FilterButton name="test" isPressed={true} />);

    const filterButtonComponent = wrapper.find("button");

    expect(filterButtonComponent).toBeDefined();
    expect(filterButtonComponent.prop("aria-pressed")).toEqual(true);
    expect(filterButtonComponent.text()).toEqual("Show test tasks");
  });
});
describe("Functionality of FilterButton", () => {
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
    render(<FilterButton name="test" isPressed={true} setFilter={onClick} />);
  });

  test("should have a form tag", () => {
    const filterButtonComponent = screen.getByRole("button", {
      name: /Show test tasks/i,
    });
    user.click(filterButtonComponent);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("test");
  });
});
