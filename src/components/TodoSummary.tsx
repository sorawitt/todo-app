import type { Todo } from "../types/todo";

interface TodoSummaryProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export default function TodoSummary({
  todos,
  onClearCompleted,
}: TodoSummaryProps) {
  const total = todos.length;
  const remaining = todos.filter((todo) => !todo.completed).length;
  const completed = total - remaining;

  const message =
    total === 0
      ? "Add your first task to get started."
      : remaining === 0
      ? "All tasks completed! 🎉"
      : "Keep going! 💪";

  const showClearButton = completed > 0;

  return (
    <section className="px-4 py-3 text-sm text-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p>
            {completed} done / {remaining} left
          </p>
          <p className="mt-1 text-gray-500">{message}</p>
        </div>
        {showClearButton ? (
          <button
            type="button"
            onClick={onClearCompleted}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 transition hover:border-gray-400 hover:text-gray-800"
          >
            Clear done
          </button>
        ) : null}
      </div>
    </section>
  );
}
