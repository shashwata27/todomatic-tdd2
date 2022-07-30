import { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // here target is the form and we access the input element
    //  it's name attribute i.e. text
    if (name !== "") {
      // console.log(e.target.text.value);
      props.addTask(name);
      setName("");
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button
        data-testid="form-add-button"
        type="submit"
        className="btn btn__primary btn__lg"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
