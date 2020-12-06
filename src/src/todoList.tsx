import * as React from 'react';
import '../style/todoList.scss';
import { useState, useEffect } from 'react';
import TodoItem from './todo'
import AddTodo from './addTodo'

type TodoListProps = {
    mode: mode
}
export type Todo = {
    done: boolean,
    text: string,
    id: string,
    color: string,
    deleted: boolean,
    due: Date | null,
}
export type mode = "All" | "Done" | "Todo";

// eslint-disable-next-line
const database: Todo[] = [
    {
        done: false,
        deleted: false,
        text: "Lorem Ipsum",
        color: "#fff",
        due: new Date(2020, 12, 20),
        id: "testID"
    }
]

export default function TodoList(props: TodoListProps) {
    const showDone: boolean = props.mode === "All" || props.mode === "Done";
    const showTodo: boolean = props.mode === "All" || props.mode === "Todo";

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // console.log("retrievinng from localStorage")
        getTodos();
    }, [setTodos])

    const getTodos = (): Todo[] => {
        let db = localStorage.getItem('todos');
        let ret: Todo[];
        ret = db === null ? [] : JSON.parse(db);
        setLoading(false);
        setTodos(ret);
        return ret
    }
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        // console.log("updating storage")
    }, [todos])

    const createTodo = (newTodo: Todo) => {
        setTodos([newTodo, ...todos])
    }

    const [lastDeleted, setLastDeleted] = useState<string[] | null>(null);
    const [showUndoDelete, setShowUndoDelete] = useState(false);
    useEffect(() => {
        console.log(lastDeleted);
        setShowUndoDelete(lastDeleted !== null);
    }, [lastDeleted])

    const undoDeleted = () => {
        // lastDeleted?.forEach(td => todos.find(t => t.id === td)?.deleted = false)
        setTodos([...todos.map(t => {
            if (lastDeleted?.includes(t.id)) t.deleted = false;
            return t
        })])
        setLastDeleted(null);
        setShowUndoDelete(false);
    }

    const deleteTodo = (id: string) => () => {
        // setLastDeleted([todos.find(t => t.id === id)])
        setLastDeleted([id]);
        setTodos(todos => todos.map(t => {
            if (t.id === id) {
                t.deleted = true;
                return t
            }
            return t
        }));
    }
    const setChecked = (id: string) => (checked: boolean) => {
        setTodos(todos => todos.map(t => {
            if (t.id === id) {
                t.done = checked;
                return t
            }
            return t
        }));
    }
    const deleteCompleted = () => {
        let toDelete = [...todos.map(t => {
            if (t.done) t.deleted = true;
            return t
        })]
        setLastDeleted(toDelete.map(t => t.id));
        setTodos(toDelete);
    }

    const todoTasks = todos.filter(todo => !todo.done && !todo.deleted);
    const doneTasks = todos.filter(todo => todo.done && !todo.deleted);
    return <div className="todo-list-wrapper">
        <AddTodo addTodo={createTodo} />
        <button className="button-delete-completed btn btn-dark" onClick={deleteCompleted}> Delete Completed </button>

        {showDone && <div className="todo-list checked">
            <h2>Completed tasks</h2>
            {loading ? "loading" : doneTasks.length > 0
                ? doneTasks.map(({ done, text, color, id, due }, i) =>
                    <TodoItem checked={done} color={color} text={text} key={id} delete={deleteTodo(id)} setChecked={setChecked(id)} date={due} />
                ) : <p className="text-empty">No completed tasks ✔</p>
            }
        </div>}
        {showTodo && <div className="todo-list unchecked">
            <h2>Todo tasks</h2>
            {loading ? "loading" : todoTasks.length > 0
                ? todoTasks.map(({ done, text, color, id, due }, i) =>
                    <TodoItem checked={done} color={color} text={text} key={id} delete={deleteTodo(id)} setChecked={setChecked(id)} date={due} />
                ) : <p className="text-empty">You have no tasks to do 🤗</p>
            }
        </div>}

        {showUndoDelete && (<div className="undo-deleted">
            <p>Items&nbsp;deleted</p>
            <button onClick={undoDeleted}>
                Undo
            </button>
        </div>)}
    </div>
}