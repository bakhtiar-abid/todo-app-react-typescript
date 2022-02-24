import { type } from "@testing-library/user-event/dist/type";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import "./App.css";
import Lists from "./Components/Lists";
import { Input } from "@chakra-ui/react";

// automatically accetps childen type
// const Box: React.FunctionComponent<{ title: string }> = ({ children }) => {
//    return <div>{children}</div>;
// };

// ki type er jinish thakbe in Todo App
interface Todo {
   id: number;
   text: string;
}

  // get local items
   const getLocalItems = () => {
      let list = localStorage.getItem("lists");

      if(list){
         return JSON.parse(localStorage.getItem("lists") || "{}");
      }
      else {
         return [];
      }
   };

// ki korbo
type ActionType =
   | { type: "ADD"; text: string }
   | { type: "REMOVE"; id: number };

function App() {
   // useReducer
   function reducer(state: Todo[], action: ActionType) {
      switch (action.type) {
         case "ADD":
            return [
               ...state,
               {
                  id: state.length,
                  text: action.text,
               },
            ];
         case "REMOVE":
            return state.filter(({ id }) => id !== action.id);
      }
   }

   const [todos, dispatch] = useReducer(reducer, getLocalItems());

   // add to local storgae
   useEffect(() => {
      localStorage.setItem("lists", JSON.stringify(todos));
   }, [todos]);

 

   const newTodoRef = useRef<HTMLInputElement>(null);

   //useCallback
   const onAddTodo = useCallback(() => {
      if (newTodoRef.current) {
         dispatch({
            type: "ADD",
            text: newTodoRef.current.value,
         });

         newTodoRef.current.value = "";
      }
   }, []);

   //  [{}, {}, {}];
   return (
      <div className="App">
         {/* <Box title="hello">
           Hello, This is me Md. Bakhtiar Abid
         </Box> */}
         {/* <Lists></Lists> */}
         <Input placeholder="Basic usage" ref={newTodoRef} />
         <button onClick={onAddTodo}>Add</button>
         {todos.map((todo) => (
            <div key={todo.id}>
               {todo.text}

               <button
                  onClick={() =>
                     dispatch({
                        type: "REMOVE",
                        id: todo.id,
                     })
                  }
               >
                  Remove
               </button>
            </div>
         ))}
      </div>
   );
}

export default App;
