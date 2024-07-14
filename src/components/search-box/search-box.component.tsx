import './search-box.styles.css';
import {ChangeEvent, ChangeEventHandler} from "react";
// import { Component } from 'react';

type SearchBoxProps = {
    className?: string;
    placeholder?: string;
    func?: ChangeEventHandler<HTMLInputElement>;
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void; // both definitions ( func & onChangeHandler) are correct
}

const SearchBox = ({className, placeholder, onChangeHandler}: SearchBoxProps) => {
    return (
        <input
            className={`search-box ${className}`}
            type='search'
            placeholder={placeholder}
            onChange={onChangeHandler}
        />
    )
}

// class SearchBox extends Component {
//     render() {
//         return (
//             <input
//                 className={`search-box ${this.props.className}`}
//                 type='search'
//                 placeholder={this.props.placeholder}
//                 onChange={this.props.onChangeHandler}
//             />
//         )
//     }
// }

export default SearchBox;
