import Input from "../common/Input";
import Button from "../common/Button";
import { options } from "../validations/loginForm";
import { useForm } from "react-hook-form";
import auth from "../services/authService";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { useContext, useState } from "react";

function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const user = useContext(UserContext);
  const { register, handleSubmit, formState, setError } = useForm(options);
  const { errors } = formState;

  const submitForm = async (data) => {
    try {
      setDisabled((prev) => !prev);
      await auth.loginUser(data);
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("email", { type: "custom", message: error.response.data });
      }
      setDisabled((prev) => !prev);
    }
  };

  if (user) return <Navigate to={"/todos"} />;

  return (
    <main className="container">
      <div className="forms">
        <h1 style={{ marginTop: "20px" }}>Login</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <Input
            register={register("email")}
            label={"User email"}
            id={"email"}
            autoFocus={true}
          />
          {errors.email && <p className="alert">{errors.email.message}</p>}
          <Input
            type="password"
            autoComplete="off"
            register={register("password")}
            label={"Password"}
            id={"password"}
          />
          {errors.password && (
            <p className="alert">{errors.password.message}</p>
          )}
          <Button disabled={disabled}>Login</Button>
          <Link to={"/register"} style={{ marginLeft: 10 }}>
            <Button disabled={disabled}>Register</Button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
