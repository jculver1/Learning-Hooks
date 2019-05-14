import React, { useReducer, useContext } from 'react';

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
    case 'delete':{
      return state.filter(item => item.id !== action.payload) 
    }
    case 'completed': {
      return state.map(item => {
        if(item.id === action.payload){
          return {
            ...item,
            completed: !item.completed,
          }
        }
        return item
      })
    }
    default:
    return state
  }
}

const Context = React.createContext()

export default function ToDoList(){
  const [state, dispatch] = useReducer(appReducer, [])
  return(
    <Context.Provider value={dispatch}>
      <h1>Things todo</h1>
      <button onClick={()=> dispatch({type: 'add'})}>Add Item</button>
      <TodosList items={state}/>
    </Context.Provider>
  )
  function TodoItem({ id, completed, text }){
    const dispatch = useContext(Context)
    return(
    <div 
    style={{
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-evenly',
    }}>
    <input type='checkbox' checked={completed} onChange={() => dispatch({type: 'completed', payload: id})}
    />
    <input
    style={{
      border: 'black solid 1px',
      marginBottom: '2px'
    }}
    type='text' defalutvalue={text} />
    <button onClick={() => dispatch({type: 'delete', payload: id})}>Delete
    </button>
    </div>

    )
  }

  function TodosList({items}){
    return items.map(item => <TodoItem key={item.id} {...item}/>)   
  }


}
