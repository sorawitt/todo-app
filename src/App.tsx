import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import { dummyTodos } from "./data/todos";
import TodoSummary from "./components/TodoSummary";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);

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

  return (
    <main className="min-h-screen px-4 py-12">
      <section className="mx-auto flex min-h-screen max-w-xl flex-col gap-10">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Your Todos</h1>
          <p className="text-sm opacity-70">
            Keep it lean. Check off what matters.
          </p>
        </header>

        <div className="flex flex-1 flex-col gap-6">
          <AddTodoForm onAdd={handleAddTodo} />

          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onCompletedChange={handleCompletedChange}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-sm opacity-70">Nothing on your list yet.</p>
          )}
          <TodoSummary todos={todos} onClearCompleted={handleClearCompleted} />
        </div>
      </section>
    </main>
  );
}
