import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const todoSchema = yup.object().shape({
  title: yup.string().required().min(5).max(255).label("Task"),
});

export const options = { resolver: yupResolver(todoSchema) };
