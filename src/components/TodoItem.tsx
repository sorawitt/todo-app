import { Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
}: TodoItemProps) {
  const handleChange = () => onCompletedChange(todo.id, !todo.completed);

  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          className="size-4"
        />
        <span
          className={
            todo.completed ? "text-base line-through opacity-60" : "text-base"
          }
        >
          {todo.title}
        </span>
      </label>
      <button type="button" onClick={() => onDelete(todo.id)} className="p-2">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
