import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required().email().min(5).max(50).label("User email"),
  password: yup.string().required().min(5).max(50).label("Password"),
});

export const options = { resolver: yupResolver(loginSchema) };
