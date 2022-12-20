import Input from "../common/Input";
import Button from "../common/Button";
import { options } from "../validations/registerForm";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/userService";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { useState } from "react";

function Register() {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm(options);
  const { errors } = formState;

  const submitForm = async (data) => {
    try {
      setDisabled((prev) => !prev);
      const response = await registerUser(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("email", { type: "custom", message: error.response.data });
      }
      setDisabled((prev) => !prev);
    }
  };

  return (
    <main className="container">
      <div className="forms">
        <h1 style={{ marginTop: "20px" }}>Register</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <Input
            autoComplete="off"
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
          <Input
            autoComplete="off"
            register={register("name")}
            label={"User name"}
            id={"name"}
          />
          {errors.name && <p className="alert">{errors.name.message}</p>}
          <Button disabled={disabled}>Register</Button>
          <Link to={"/login"} style={{ marginLeft: 10 }}>
            <Button disabled={disabled}>Login</Button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Register;
