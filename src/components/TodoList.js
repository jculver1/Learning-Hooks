import React, { useReducer } from 'react';

function appReducer(state, action) {
  switch(action.type){
    case 'add': {
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false,
        }
      ]
    }
    default:
    break;
  }
}

export default function ToDoList(){
  const [state, dispatch] = useReducer(appReducer, [])
  return(
    <div>
      <h1>Things todo</h1>
      <button onClick={()=> dispatch({type: 'add'})}>Add Item</button>
      {state.map(item => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  )
}



