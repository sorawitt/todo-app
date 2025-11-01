import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}
function TodoItem({ todo }: TodoItemProps) {
  return <div>{todo.title}</div>;
}
export default TodoItem;
