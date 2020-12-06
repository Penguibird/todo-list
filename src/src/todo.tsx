import * as React from 'react';
import '../style/todo.scss';
import { useEffect } from 'react';
// import type { Todo } from './todoList'
import RippleManager from './ripple/ripple'
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        ripplecolor?: string;
    }
}

type TodoProps = {
    text: string,
    checked: boolean,
    color: string,
    date: Date | null,
    setChecked: (checked: boolean) => void,
    delete: () => void
}
export default function TodoItem(props: TodoProps) {
    const checked = props.checked
    const toggleCheck = (): void => { props.setChecked(!checked) }
    // const setDone = props.setChecked;
    // useEffect(() => {
    //     console.log(checked)
    //     setDone(checked)
    // }, [checked, setDone]);
    useEffect(() => {
        RippleManager.setUp();
    }, [])

    return <div className="todo" style={{ backgroundColor: props.color }}>
        <button className="button-check" ripplecolor="gray" onClick={toggleCheck}><i className="material-icons">{!checked ? 'check_box_outline_blank' : 'check_box'}</i></button>
        <p>{props.text}</p>
        <button className="button-delete" ripplecolor="gray" onClick={props.delete}><i className="material-icons">delete</i></button>
    </div>
}