import './App.css';
// import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import {ChangeEvent, useEffect, useState} from "react";
import {type} from "node:os";
import {getData} from "./utils/data.utils";

export type Monster = {
    id: string;
    name: string;
    email: string;
}

// **** React Functional Component **** //
const App = () => {
    const [searchField, setSearchField] = useState('');
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    /***
     useEffect with generic type function
     ***/
    useEffect(() => {
        const fetchMonsters = async () => {
            const data = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
            setMonsters(data);
        }

        fetchMonsters()
    }, [])


    /***
     useEffect variation with .then syntax
     ***/
    // useEffect(() => {
    //     return () => {
    //         fetch('https://jsonplaceholder.typicode.com/users')
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setMonsters(data)
    //             })
    //     };
    // }, []);

    /***
     useEffect variation with async syntax
     ***/
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch('https://jsonplaceholder.typicode.com/users');
    //         if (!res.ok) {
    //             throw new Error(res.statusText);
    //         }
    //         const data = await res.json();
    //         setMonsters(data)
    //     }
    //     fetchData()
    // }, [])

    // if we want to trigger some changes in our app that modify the state
    // adding a second useEffect is teh best practice to avoid the FilteredMonsters array get rebuilt
    // for everytime even if monsters array has not changed
    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchField);
        });
        setFilteredMonsters(newFilteredMonsters);
    }, [monsters, searchField]);


    const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchFieldString = e.target.value.toLowerCase();
        setSearchField(searchFieldString)
    }

    return (
        <div className="App">
            <h1 className='app-title'>Monsters Rolodex</h1>
            <SearchBox onChangeHandler={onSearchChange} className='monsters' placeholder='Search...'/>
            <CardList monsters={filteredMonsters} />
        </div>
    );
};

// **** React Class Component **** //
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//         monsters: [],
//         searchField: ''
//     }
//     // console.log('run 1: Constructor()')
//   }
//
//   onSearchChange = (e) => {
//       console.log(e.target.value)
//       const searchField = e.target.value.toLowerCase();
//       this.setState(() => {
//           return {searchField}
//       });
//   }
//
//   componentDidMount() {
//     // console.log('run 3: componentDidMount() Method')
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((res) => res.json())
//       .then((data) => {
//         this.setState(
//       (prevState) => {
//               return {monsters: data}
//         },
//               // () => console.log(this.state)
//            )
//     })
//   }
//
//     render() {
//         // console.log('run 2: render()')
//         const { monsters, searchField } = this.state;
//         const { onSearchChange } = this;
//
//         const filteredMonsters = monsters.filter((monster) => {
//             return monster.name.toLowerCase().includes(searchField);
//         });
//
//         return (
//           <div className="App">
//             <h1 className='app-title'>Monsters Rolodex</h1>
//             <SearchBox onChangeHandler={onSearchChange} className='monsters' placeholder='Search...'/>
//             <CardList monsters={filteredMonsters} />
//           </div>
//         );
//       }
// }



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
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

export default App;
