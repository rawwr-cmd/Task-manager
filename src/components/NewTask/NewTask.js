import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../hooks/useHttp";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postNewTask } = useHttp();

  const createTask = (taskText, taskData) => {
    // console.log(taskText);
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    // console.log(generatedId);
    const createdTask = { id: generatedId, text: taskText };
    // console.log(createdTask);
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    postNewTask(
      {
        url: "https://bonkers-taskmanager-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
      //same as
      // (taskData) => createTask(taskText, taskData)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
