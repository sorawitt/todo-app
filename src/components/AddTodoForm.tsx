export default function AddTodoForm() {
  return (
    <form className="rounded-md border border-gray-200 px-4 py-3 transition focus-within:border-gray-400">
      <label htmlFor="todo-input" className="sr-only">
        Add a new todo
      </label>
      <input
        id="todo-input"
        type="text"
        placeholder="Write a todo and press Enter"
        className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
      />
    </form>
  );
}
