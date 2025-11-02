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
  if (total === 0) return null;

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completed = total - remaining;

  const message =
    remaining === 0
      ? "All tasks completed! 🎉"
      : "Keep going! 💪";

  const showClearButton = completed > 0;

  return (
    <section className="px-4 py-3 text-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p>
            {completed} done / {remaining} left
          </p>
          <p className="mt-1 opacity-70">{message}</p>
        </div>
        {showClearButton ? (
          <button
            type="button"
            onClick={onClearCompleted}
            className="rounded-full border px-3 py-1 text-xs"
          >
            Clear done
          </button>
        ) : null}
      </div>
    </section>
  );
}
