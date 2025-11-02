import { Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
}: TodoItemProps) {
  const handleChange = () => onCompletedChange(todo.id, !todo.completed);

  return (
    <div className="flex items-center justify-between">
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
      <button type="button" onClick={() => onDelete(todo.id)}>
        <Trash2 className="size-4 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
}
