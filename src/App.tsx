
import { useRef, useState } from 'react'

import {Todo} from './interfaces'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: FormEvent) =>{
    e.peventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
    <input type="text" ref={inputRef} />
    <select name="type" >
      <option value="hard">Hard</option>
      <option value="normal">Normal</option>
      <option value="easy">Easy</option>
    </select>
    <button>Click</button>
      </form>
    </div>
  )
}

export default App
