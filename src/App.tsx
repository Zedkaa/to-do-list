import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Draggable } from '@hello-pangea/dnd'

function App() {
  const [showAddtodo, setShowAddtodo] = useState<boolean>(false);
  const [todos, setTodos] = useState<string[]>([
    "Alltasck01",
    "Alltasck02",
    "Alltasck03",
  ]);
  const [donetack, setDonetack] = useState<string[]>([
    "donetack01",
    "donetack02",
    "donetack03",
  ]);
  const [notStarted, setNotstarted] = useState<string[]>([
    "notStarted01",
    "notStarted02",
    "notStarted03",
  ]);
  const [inProgress, setInprogress] = useState<string[]>([
    "inProgress01",
    "inProgress02",
    "inProgress03",
  ]);

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

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTodo = Array.from(todos);
    const newDonetack = Array.from(donetack);
    const newNotStarted = Array.from(notStarted);
    const newInProgress = Array.from(inProgress);

    const [draggedTodoItem] = newDonetack.splice(result.source.index, 1);
    const [draggedDonetackItem] = newTodo.splice(result.source.index, 1);
    const [draggedNotStartedItem] = newNotStarted.splice(
      result.source.index,
      1
    );
    const [draggedInProgressItem] = newInProgress.splice(
      result.source.index,
      1
    );

    newTodo.splice(result.destination.index, 0, draggedTodoItem);
    newDonetack.splice(result.destination.index, 0, draggedDonetackItem);
    newNotStarted.splice(result.destination.index, 0, draggedNotStartedItem);
    newInProgress.splice(result.destination.index, 0, draggedInProgressItem);

    setTodos(newTodo);
    setDonetack(newDonetack);
    setNotstarted(newNotStarted);
    setInprogress(newInProgress);
  };

  console.log(donetack);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="main-div ">
          <div className="main-div-title">
            <h1>To-Do List</h1>
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
              droppableId="in-progress-listBox"
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
              Add TO DO
            </button>
          </div>
        </div>
      </DragDropContext>

      {showAddtodo && <AddTodo addTodo={addTodo} />}
    </>
  );
}

export default App;
