import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}
function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-300 bg-white hover:bg-slate-50">
        <input
          type="checkbox"
          className="scale-125 mr-2"
          defaultChecked={todo.completed}
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </label>
    </div>
  );
}
export default TodoItem;
