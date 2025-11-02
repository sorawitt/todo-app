import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("todos");
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCompletedChange = (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const handleAddTodo = (title: string) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleDelete = (id: number) => {
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
