import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
}
function TodoItem({ todo, onCompletedChange }: TodoItemProps) {
  const handleCheckboxChange = () => {
    onCompletedChange(todo.id, !todo.completed);
  };

  return (
    <div>
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-300 bg-white hover:bg-slate-50">
        <input
          type="checkbox"
          className="scale-125 mr-2"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </label>
    </div>
  );
}
export default TodoItem;
