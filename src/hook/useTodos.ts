import { useEffect, useState } from "react";
import type { AddTodoRequest, Todo } from "../types/todo";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos"
      );
      const todos: Todo[] = await response.json();
      setTodos(todos);
    } catch (e) {
      console.log("Error ja", e);
    }
  };

  const fetchAddTodo = async (todo: AddTodoRequest) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    };
    try {
      const response = await fetch(
        "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos",
        requestOptions
      );
      const result: Todo = await response.json();
      setTodos((prev) => [...prev, result]);
      console.log("Add Success", result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDeleteTodo = async (id: string) => {
    try {
      const requestOptions = {
        method: "DELETE",
      };
      const response = await fetch(
        "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos/" + id,
        requestOptions
      );
      const result = await response.json();
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      console.log("Delete Success", result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUpdateTodo = async (id: string, status: boolean) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: status }),
      };
      const response = await fetch(
        "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos/" + id,
        requestOptions
      );
      const result = await response.json();
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: status } : todo
        )
      );
      console.log("Update Success", result);
    } catch (err) {
      console.log(err);
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

  const handleCompletedChange = (id: string, completed: boolean) => {
    fetchUpdateTodo(id, completed);
  };

  const handleAddTodo = (title: string) => {
    const request: AddTodoRequest = { title };
    fetchAddTodo(request);
  };

  const handleDelete = (id: string) => {
    fetchDeleteTodo(id);
  };

  const handleClearCompleted = () => {
    // setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return {
    todos,
    handleAddTodo,
    handleCompletedChange,
    handleDelete,
    handleClearCompleted,
  };
}
