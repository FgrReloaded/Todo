import React, { useState } from 'react'

function Add(props) {
    const host = "https://backend-w3dev.herokuapp.com";
    const [msg, setMsg] = useState("");
    const [todo, setTodo] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await fetch(`${host}/todo/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ todo })
        });
        const data = await result.json();
        if (data.success) {
            setMsg("Todo Added Successfully.");
        }
    }
    const handleChange = (e) => {
        setTodo(e.target.value);
        setMsg("");
    }
    return (
        <>
            <div className={`my-2 mx-auto w-full flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-3 md:px-4 lg:px-5`}>
                <span className='float-right font-bolder text-red-600 hover:text-red-800 cursor-pointer' onClick={props.hideTodo}>X</span>
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Add a new todo
                </div>
                <div className="p-3 mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row items-center mb-2 gap-4">
                            <label htmlFor="create-account-category">Todo Name</label>
                            <div className=" relative ">
                                <input type="text" onChange={handleChange} value={todo} id="create-account-todo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name='name' placeholder="Enter Todo name" />
                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Add
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <span className="ml-2">
                                {msg}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Add