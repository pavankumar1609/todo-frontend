import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { options } from "../validations/todoForm";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import Button from "../common/Button";
import "./TodoForm.css";

function TodoForm({ onAdd, disabled }) {
  const user = useContext(UserContext);
  const { register, handleSubmit, formState, reset } = useForm(options);
  const { errors } = formState;

  const submitTask = (data) => {
    onAdd({ ...data, userId: user._id });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitTask)}>
      <h1 className="create-task">
        Create <span>Task</span>
      </h1>
      <Input
        type={"text"}
        register={register("title")}
        autoFocus={true}
        placeholder="What needs to be done?"
      />
      {errors.title && <p className="alert">{errors.title.message}</p>}
      <Button disabled={disabled}>Add</Button>
    </form>
  );
}

export default TodoForm;
