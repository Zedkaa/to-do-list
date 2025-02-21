import "../App.css";
import { useState } from "react";

interface AddTodoProps {
  addTodo: (newTodo: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [hidetodo, setHidetodo] = useState(false);

  const handleClick = () => {
    setHidetodo(!hidetodo);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickSend = () => {
    if (inputValue.trim() !== "") {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={`addtodo-main ${hidetodo ? "hidebox" : ""}`}>
      <div className="addtodo-title">
        <h2>Add New Task</h2>
      </div>
      <div className="addtodo-items">
        <input
          className="addtodo-item-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <br />
        <button className="addtodo-item-add-btn" onClick={handleClickSend}>
          Add
        </button>
        <button className="addtodo-item-close-btn" onClick={handleClick}>
          close
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
