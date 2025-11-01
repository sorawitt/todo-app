import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoItem from "./components/TodoItem";
import { dummyTodos } from "./data/todos";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);

  const handleCompletedChange = (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen max-w-xl flex-col px-4 py-12">
        <header className="mb-10 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Your Todos
          </h1>
          <p className="text-sm text-gray-500">
            Keep it lean. Check off what matters.
          </p>
        </header>

        <div className="flex flex-1 flex-col gap-8">
          <AddTodoForm />

          {todos.length > 0 ? (
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {todos.map((todo) => (
                <li key={todo.id} className="py-1">
                  <TodoItem
                    todo={todo}
                    onCompletedChange={handleCompletedChange}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Nothing on your list yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
