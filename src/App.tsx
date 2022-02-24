import { type } from "@testing-library/user-event/dist/type";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import "./App.css";
import { Button, Paper, TextField } from '@mui/material';
import { Box } from "@mui/system";





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

   
   return (
      <Box
         className="App"
         sx={{ bgcolor: "success.main", padding: 15, boxShadow: 3 }}
      >
        <h1> Hello! Make Your Day Happy, To Do List </h1>
         <TextField
            label="Add Your List"
            sx={{ marginTop: 7 }}
            inputRef={newTodoRef}
            color="secondary"
            focused
         />
         {/* <input type="text" name="" id="" ref={newTodoRef} /> */}

         <Button
            variant="outlined"
            onClick={onAddTodo}
            sx={{ marginTop: 8, marginLeft: 2 }}
         >
            Add
         </Button>
         {todos.map((todo) => (
            <div key={todo.id}>
               {todo.text}

               <Button
                  variant="outlined"
                  sx={{ marginTop: 1, padding: 1, marginLeft: 1 }}
                  onClick={() =>
                     dispatch({
                        type: "REMOVE",
                        id: todo.id,
                     })
                  }
               >
                  Remove
               </Button>
            </div>
         ))}
      </Box>
   );
}

export default App;
