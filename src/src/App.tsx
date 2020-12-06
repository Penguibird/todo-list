import * as React from 'react';
import '../style/App.scss';
import { Fragment, useState } from 'react';
import { Helmet } from "react-helmet";

import Navbar from './navbar';
import TodoList from './todoList';

import type {mode} from './todoList'

type AppProps = {

}

export default function App(props: AppProps) {
    const [modeVal, setMode] = useState<mode>("All")
    return <Fragment>
        <Helmet>
            <title>Todo List</title>
        </Helmet>
        <Navbar setMode={setMode} />
        <main>
            <TodoList mode={modeVal} />
        </main>
        <footer>
            <p>© 2020 - Vojtěch Loskot</p>
        </footer>
    </Fragment>
}


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
