import { useEffect, useRef, useState, FormEvent } from 'react';
import { Todo } from './interfaces';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const completedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Xatolik:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value.trim() || '';
    const description = descRef.current?.value.trim() || '';
    const completed = completedRef.current?.checked || false;
    const type = typeRef.current?.value as 'easy' | 'normal' | 'hard';

    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed,
      type,
    };

    setTodos(prev => [...prev, newTodo]);
    if (titleRef.current) titleRef.current.value = '';
    if (descRef.current) descRef.current.value = '';
    if (typeRef.current) typeRef.current.value = 'normal';
    if (completedRef.current) completedRef.current.checked = false;
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id != id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-700">TODO LIST</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            ref={titleRef}
            placeholder="Todo..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"/>

          <textarea
            ref={descRef}
            placeholder="Description..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>

          <div className='flex items-center gap-10'>

          <select
            ref={typeRef}
            className="w-[30%] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="normal">normal</option>
            <option value="easy">easy</option>
            <option value="hard">hard</option>
          </select>

          <div className="flex items-center gap-2">
            <input type="checkbox" ref={completedRef} id="completed" />
            <label htmlFor="completed" className="text-gray-700">Completed</label>
          </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-3 rounded-lg transition">
             ADD TODO
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length == 0 ? (
            <p className="text-center text-gray-400">NO TASKS </p>
          ) : (
            todos.map(todo => (
              <li
                key={todo.id}
                className="flex justify-between items-start gap-4 p-4 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">{todo.description}</p>
                  <p className="text-sm text-gray-500">
                    Level: <span className="capitalize">{todo.type}</span> | Status:{" "}
                    <span className={todo.completed ? 'text-green-600' : 'text-red-600'}>
                      {todo.completed ? '✅' : '✖️'}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                  title="Ochirish">
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
