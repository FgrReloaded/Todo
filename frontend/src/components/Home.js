import React, { useState } from 'react';
import Add from './Add';
import Completed from './Completed';
import Pending from './Pending';

function Home() {
  const [todoForm, setTodoForm] = useState(false);
  if (!todoForm) {
    return (
      <>
        <button onClick={() => { setTodoForm(true) }} className={`py-2 px-4 rounded-lg float-right mx-2 my-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md`}>Add New Todo</button>
        <Pending/>
        <Completed/>
      </>

    )
  } else {
    return (
      <Add hideTodo={() => { setTodoForm(false) }} />
    )
  }
}

export default Home