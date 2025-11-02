import AddTodoForm from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import TodoList from "./components/TodoList";
import useTodos from "./hook/useTodos";

export default function App() {
  const {
    todos,
    handleAddTodo,
    handleCompletedChange,
    handleDelete,
    handleClearCompleted,
  } = useTodos();

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
