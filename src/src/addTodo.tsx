import * as React from 'react';
import '../style/AddTodo.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";

import type { Todo } from './todoList'
import ColoredRadio from './coloredRadio';

type AddTodoProps = {
    addTodo: (todo: Todo) => void;
}

const COLORS: string[] = [
    "white", "aquamarine", "lightblue", "pink"
];

export default function AddTodo(props: AddTodoProps) {
    const [showDropDown, setShowDropDown] = useState(false);
    const toggleDropdown = (): void => setShowDropDown(!showDropDown);

    const defaultColor: string = "#fff";
    const [color, setColor] = useState<string>(defaultColor)
    return <div className="add-todo">
        <h2>Add a new Todo Item</h2>
        <div className="add-todo-inner" style={{ backgroundColor: color }}>
            <Formik
                initialValues={{ todoText: "", date: null }}
                
                onSubmit={(data, {resetForm}) => {
                    props.addTodo({ text: data.todoText, color: color, done: false, deleted: false, id: uuidv4(), due: data.date })
                    resetForm();
                    setColor(defaultColor);
                    setShowDropDown(false);
                }}
            >{({ values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting }) => (
                <form onSubmit={(e: any) => {
                    e.preventDefault();
                    handleSubmit()
                }}>
                    <input placeholder={"Add a Task"} type="text" name="todoText" onBlur={handleBlur} onChange={handleChange} value={values.todoText} className="text-input" />
                    <div className="color-select">
                        <button type="button" className="button-dropdown-color" onClick={toggleDropdown}>
                            <i className="material-icons">palette</i>
                        </button>
                        {showDropDown && (<div className="radio-group">
                            {COLORS.map((c, i) => <ColoredRadio color={c} setColor={setColor} key={i} />)}
                        </div>)}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="submit-button">Add Task</button>
                </form>

            )}
            </Formik>

        </div>
    </div>
}