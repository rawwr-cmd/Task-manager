import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import useHttp from "./components/hooks/useHttp";

const App = () => {
  const [isTask, setIsTask] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedData = [];

    for (const key in tasksObj) {
      loadedData.push({
        id: key,
        ...tasksObj[key],
        //same as:
        //   loadedData.push({
        //     id: key,
        //     text: tasksObj[key].text
        //   })
      });
    }

    setIsTask(loadedData);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://bonkers-taskmanager-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );

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
