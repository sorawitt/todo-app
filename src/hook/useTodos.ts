import { useCallback, useEffect, useState } from "react";
import type { AddTodoRequest, Todo } from "../types/todo";

const API_BASE_URL = "https://690711e5b1879c890ed8ba14.mockapi.io/api/v1/todos";

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  // A DELETE may return an empty body; guard so JSON parsing does not throw.
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

async function listTodos() {
  return request<Todo[]>("", { method: "GET" });
}

async function createTodo(payload: AddTodoRequest) {
  return request<Todo>("", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateTodo(id: string, changes: Partial<Todo>) {
  return request<Todo>(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });
}

async function removeTodo(id: string) {
  await request<Todo>(`/${id}`, {
    method: "DELETE",
  });
}

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(async () => {
    try {
      const data = await listTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos", error);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback(async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      const created = await createTodo({ title: trimmed });
      setTodos((prev) => [...prev, created]);
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  }, []);

  const handleCompletedChange = useCallback(
    async (id: string, completed: boolean) => {
      try {
        const updated = await updateTodo(id, { completed });
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo))
        );
      } catch (error) {
        console.error("Failed to update todo", error);
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: string) => {
    try {
      await removeTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }, []);

  const handleClearCompleted = useCallback(async () => {
    const completedIds = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    if (completedIds.length === 0) return;

    try {
      await Promise.all(completedIds.map((id) => removeTodo(id)));
      setTodos((prev) => prev.filter((todo) => !todo.completed));
    } catch (error) {
      console.error("Failed to clear completed todos", error);
    }
  }, [todos]);

  return {
    todos,
    handleAddTodo,
    handleCompletedChange,
    handleDelete,
    handleClearCompleted,
  };
}
