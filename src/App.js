import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

const App = () => {
  const [isTask, setIsTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        "https://bonkers-taskmanager-default-rtdb.firebaseio.com/tasks.json"
      );

      if (!response.ok) {
        throw new Error("LMAO WE MESSED UP OUR BACKEND");
      }

      const data = await response.json();
      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          ...data[key],
          //same as:
          //   loadedData.push({
          //     id: key,
          //     text: data[key].text
          //   })
        });
      }

      setIsTask(loadedData);
    } catch (error) {
      setIsError(error.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setIsTask((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={isTask}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
};

export default App;
