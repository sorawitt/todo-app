import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
}

export default function TodoItem({ todo, onCompletedChange }: TodoItemProps) {
  const handleChange = () => onCompletedChange(todo.id, !todo.completed);

  return (
    <label className="flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChange}
        className="size-4 rounded border border-gray-300 accent-gray-900"
      />
      <span
        className={
          todo.completed
            ? "text-base text-gray-400 line-through"
            : "text-base text-gray-900"
        }
      >
        {todo.title}
      </span>
    </label>
  );
}
