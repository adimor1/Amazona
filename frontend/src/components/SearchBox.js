import React, { useState } from 'react'

export default function SearchBox(props) {
    const [name, setName] = useState('');

    const sumbitHandler=(e) =>{
        e.preventDefault();
        props.history.push(`/search/name/${name}`); 
    }

    return (
        <form className="search" onSubmit={sumbitHandler}>
            <div className="row">
                <input type="text" name="q" id="q" 
                onChange={(e)=>setName(e.target.value)}>    
                </input>
                <button className="primary" type="sumbit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}