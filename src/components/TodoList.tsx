import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
}: TodoListProps) {
  const todosSorted = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );
  return (
    <ul className="space-y-2">
      {todosSorted.map((todo) => (
        <li key={todo.id} className="py-1">
          <TodoItem
            todo={todo}
            onCompletedChange={onCompletedChange}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
