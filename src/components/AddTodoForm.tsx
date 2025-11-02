import { type FormEvent, useState } from "react";

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded border px-4 py-3"
    >
      <label htmlFor="todo-input" className="sr-only">
        Add a new todo
      </label>
      <input
        id="todo-input"
        type="text"
        placeholder="Write a todo and press Enter"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full bg-transparent text-base outline-none"
      />
    </form>
  );
}
