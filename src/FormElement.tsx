import { FormEvent, useRef } from "react";
import {Todo} from "./interfaces"

interface FormElementProps {
    setTodos: Function;
}

function  FormElement({setTodos}: FormElementProps){
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

    }

    setTodos((prev: Todo[])) =>{
        return[...ProgressEvent, todo];
    }
}

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" id="title" ref={inputRef} name="title" />
        </div>
        <div>
            <label htmlFor="des">Description</label>
            <br />
            <textarea name="description" id="des" ></textarea>
        </div>
        <div>
            <label htmlFor="comp">Completed</label>
            <input type="checkbox" name="completed" />
        </div>
        <div>
            <select name="type" >
                <option value="hard">Hard</option>
                <option value="normal">Normal</option>
                <option value="easy">Easy</option>
            </select>
        </div>
    </form>
)
