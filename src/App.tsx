import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
// import { Draggable } from '@hello-pangea/dnd'

function App() {
  const [showAddtodo, setShowAddtodo] = useState<boolean>(false);
  const [todos, setTodos] = useState<string[]>([]);
  const [donetack, setDonetack] = useState<string[]>([]);
  const [notStarted, setNotstarted] = useState<string[]>([]);
  const [inProgress, setInprogress] = useState<string[]>([]);

  const handleClick = () => {
    setShowAddtodo(!showAddtodo);
  };

  const addTodo = (newtodo: string) => {
    setTodos([...todos, newtodo]);
  };

  const removeTodo = (indexToRemove: number) => {
    const newTodos: string[] = [];

    todos.forEach((todos, index) => {
      if (index !== indexToRemove) {
        newTodos.push(todos);
      }
    });

    setTodos(newTodos);
  };

  const doneTAsck = (indexDone: number) => {
    const done: string[] = [];

    todos.forEach((todos, index) => {
      if (index == indexDone) {
        done.push(todos);
        removeTodo(index);
      }
    });

    setDonetack([...donetack, ...done]);
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "allListBox") {
        const tempTodos: string[] = [...todos];

        const [removed] = tempTodos.splice(source.index, 1);
        tempTodos.splice(destination.index, 0, removed);
        setTodos(tempTodos);
      } else if (source.droppableId === "not-started-listBox") {
        const tempNotStarted: string[] = [...notStarted];

        const [removed] = tempNotStarted.splice(source.index, 1);
        tempNotStarted.splice(destination.index, 0, removed);
        setNotstarted(tempNotStarted);
      } else if (source.droppableId === "in-progress-listBox") {
        const tempInProgress: string[] = [...inProgress];

        const [removed] = tempInProgress.splice(source.index, 1);
        tempInProgress.splice(destination.index, 0, removed);
        setInprogress(tempInProgress);
      } else if (source.droppableId === "doneTasck-listBox") {
        const tempDonetack: string[] = [...donetack];

        const [removed] = tempDonetack.splice(source.index, 1);
        tempDonetack.splice(destination.index, 0, removed);
        setDonetack(tempDonetack);
      }
    } else if (source.droppableId !== destination.droppableId) {
      const tempTodos1: string[] = [...todos];
      const tempNotStarted2: string[] = [...notStarted];
      const tempInProgress3: string[] = [...inProgress];
      const tempDonetack4: string[] = [...donetack];

      if (source.droppableId === "allListBox") {
        const [removed] = tempTodos1.splice(source.index, 1);
        setTodos([...tempTodos1]);
        switch (destination.droppableId) {
          case "not-started-listBox":
            tempNotStarted2.splice(destination.index, 0, removed);
            setNotstarted([...tempNotStarted2]);
            break;
          case "in-progress-listBox":
            tempInProgress3.splice(destination.index, 0, removed);
            setInprogress([...tempInProgress3]);
            break;
          case "doneTasck-listBox":
            tempDonetack4.splice(destination.index, 0, removed);
            setDonetack([...tempDonetack4]);
            break;
          default:
        }
      }

      if (source.droppableId === "not-started-listBox") {
        const [removed] = tempNotStarted2.splice(source.index, 1);
        setNotstarted([...tempNotStarted2]);
        switch (destination.droppableId) {
          case "allListBox":
            tempTodos1.splice(destination.index, 0, removed);
            setTodos([...tempTodos1]);
            break;
          case "in-progress-listBox":
            tempInProgress3.splice(destination.index, 0, removed);
            setInprogress([...tempInProgress3]);
            break;
          case "doneTasck-listBox":
            tempDonetack4.splice(destination.index, 0, removed);
            setDonetack([...tempDonetack4]);
            break;
          default:
        }
      }

      if (source.droppableId === "in-progress-listBox") {
        const [removed] = tempInProgress3.splice(source.index, 1);
        setInprogress([...tempInProgress3]);
        switch (destination.droppableId) {
          case "allListBox":
            tempTodos1.splice(destination.index, 0, removed);
            setTodos([...tempTodos1]);
            break;
          case "not-started-listBox":
            tempNotStarted2.splice(destination.index, 0, removed);
            setNotstarted([...tempNotStarted2]);
            break;
          case "doneTasck-listBox":
            tempDonetack4.splice(destination.index, 0, removed);
            setDonetack([...tempDonetack4]);
            break;
          default:
        }
      }

      if (source.droppableId === "doneTasck-listBox") {
        const [removed] = tempDonetack4.splice(source.index, 1);
        setDonetack([...tempDonetack4]);
        switch (destination.droppableId) {
          case "not-started-listBox":
            tempNotStarted2.splice(destination.index, 0, removed);
            setNotstarted([...tempNotStarted2]);
            break;
          case "in-progress-listBox":
            tempInProgress3.splice(destination.index, 0, removed);
            setInprogress([...tempInProgress3]);
            break;
          case "allListBox":
            tempTodos1.splice(destination.index, 0, removed);
            setTodos([...tempTodos1]);
            break;
          default:
        }
      }
    }
  };

  // console.log(donetack);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="main-div ">
          <div className="main-div-title">
            <h1>To Do List</h1>
          </div>
          <div className="main-div-lists">
            <Droppable
              droppableId="allListBox"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  className="main-div-listsBox all-listBox"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="main-div-listsBox-title">
                    <h3>All Tasks</h3>
                  </div>
                  <div>
                    {todos.map((todo, index) => (
                      <Draggable key={todo} draggableId={todo} index={index}>
                        {(provided) => (
                          <div
                            className="main-div-listsBox-items"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p key={index}> {todo} </p>
                            <div className="main-div-listsBox-btns">
                              <button
                                className="main-div-listsBox-btn-remove"
                                onClick={() => removeTodo(index)}
                              >
                                &times;
                              </button>
                              <button
                                className="main-div-listsBox-btn-cheak"
                                onClick={() => doneTAsck(index)}
                              >
                                {" "}
                                &#x2713;{" "}
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable
              droppableId="not-started-listBox"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  className="main-div-listsBox not-started-listBox"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="main-div-listsBox-title">
                    <h3>Not Started</h3>
                  </div>
                  <div>
                    {notStarted.map((Nstart, index) => (
                      <Draggable
                        key={Nstart}
                        draggableId={Nstart}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="main-div-listsBox-Nstart-items"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p key={index}> {Nstart} </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable
              droppableId="in-progress-listBox"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  className="main-div-listsBox in-progress-listBox"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="main-div-listsBox-title">
                    <h3>In Progress</h3>
                  </div>
                  <div>
                    {inProgress.map((Iprogress, index) => (
                      <Draggable
                        key={Iprogress}
                        draggableId={Iprogress}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="main-div-listsBox-Iprogress-items"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p key={index}> {Iprogress} </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable
              droppableId="doneTasck-listBox"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  className="main-div-listsBox done-listBox"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="main-div-listsBox-title">
                    <h3>Done</h3>
                  </div>
                  <div>
                    {donetack.map((done, index) => (
                      <Draggable key={done} draggableId={done} index={index}>
                        {(provided) => (
                          <div
                            className="main-div-listsBox-done-items"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p key={index}> {done} &#x2713; </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="main-div-btn">
            <button className="main-div-btn-item" onClick={handleClick}>
              Add New Task
            </button>
          </div>
        </div>
      </DragDropContext>

      {showAddtodo && <AddTodo addTodo={addTodo} />}
    </>
  );
}

export default App;
