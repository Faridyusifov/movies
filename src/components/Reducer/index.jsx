import React from 'react'
import { useReducer } from 'react'


export default function Reducer() {

    const initialState = {
        count : 0,
    }
    
    function reducer(state , action) {
        if (action.type === 'decrement') {
            return { count : state.count - action.payload }
        }
        if (action.type === 'increment') {
            return { count : state.count + action.payload }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <button onClick={() => dispatch({type : 'decrement' , payload : 4})}>-</button>
            <h2>{state.count}</h2>
            <button onClick={() => dispatch({type : 'increment' , payload : 10})}>+</button>
        </>
    )
}
