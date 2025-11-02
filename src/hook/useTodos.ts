import { useEffect, useState } from "react";
import type { AddTodoRequest, Todo } from "../types/todo";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("todos");
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos"
      );
      const todos: Todo[] = await response.json();
      console.log("Success", todos);
    } catch (e) {
      console.log("Error ja", e);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    console.log("Kong Sec");
    if (typeof window === "undefined") return;
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCompletedChange = (id: string, completed: boolean) => {};

  const handleAddTodo = (title: string) => {
    const request: AddTodoRequest = { title };
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return {
    todos,
    handleAddTodo,
    handleCompletedChange,
    handleDelete,
    handleClearCompleted,
  };
}
