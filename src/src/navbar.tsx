import * as React from 'react';
import '../style/Navbar.scss';
import { useState, useEffect } from 'react';

import type { mode } from './todoList'

type NavbarProps = {
    setMode: (mode: mode) => void,
}
const modes: mode[] = ["All", "Done", "Todo"];

export default function Navbar(props: NavbarProps) {
    const [selected, setSelected] = useState<mode>("All");
    const props_setMode = props.setMode;
    useEffect(() => {
        props_setMode(selected);
    }, [selected, props_setMode])

    return <header>
        <p className="nav-brand">TodoList🐱‍🏍</p>
        <nav>
            {modes.map((i, index) => (
                <button
                    className={`nav-link ${selected === i ? "active" : ""} text-bold`}
                    onClick={() => setSelected(i)}
                >{i}</button>
            ))}
        </nav>
    </header>


}