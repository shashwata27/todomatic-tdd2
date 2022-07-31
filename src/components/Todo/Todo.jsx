import { useEffect, useRef, useState } from "react";
import usePrevious from "../../utilities/usePrevious";

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const wasEditing = usePrevious(isEditing);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const onSave = (e) => {
    console.log(newName);
    e.preventDefault();
    props.editTask(props.id, newName);
    setEditing(false);
  };
  const onCancel = () => setEditing(false);

  const onEdit = () => setEditing(true);

  const onDelete = () => props.deleteTask(props.id);

  const editingTemplate = (
    <form
      data-testid={`testid-${props.name}`}
      aria-label="form"
      className="stack-small"
    >
      <div className="form-group">
        <label role="todo-label" className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={onCancel}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit"
          onClick={onSave}
        >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div data-testid={`testid-${props.name}`} className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label role="todo-label" className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-edit"
          onClick={onEdit}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={onDelete}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
};
export default Todo;
