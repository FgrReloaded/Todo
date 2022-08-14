import React, { useEffect, useState } from 'react'

function Completed() {
  const todoInitial = [];
  const host = "https://backend-w3dev.herokuapp.com";
  const [todos, setTodos] = useState(todoInitial);
  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch(`${host}/todo/view/completed`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      const data = await result.json();
      setTodos(data);
    }
    getTodos();
  });


  const delItem = async (id) => {
    const response = await fetch(`${host}/todo/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    await response.json();
    const newTodos = todos.filter((todo) => { return todo._id !== id });
    setTodos(newTodos);
  }
  if (todos.length >= 1) {
    return (
      <>
        <hr />
        <h3 className='text-center py-2 px-4 rounded-lg mx-2 my-4 bg-green-600 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold '>All Completed Todos</h3>
        <div className="container mx-auto px-4 sm:px-4 max-w-3xl">
          <div className="py-3">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
              <div className="inline-block w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Name
                      </th>
                      <th scope="col" className="px-5 py-3 text-center bg-white  border-b border-gray-200 text-gray-800  text-sm uppercase font-normal">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((todo) => {
                      return <tr key={todo._id}>
                        <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap line-through">
                                {todo.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-5 border-b border-gray-200 bg-white text-center text-sm">
                          <svg onClick={() => delItem(todo._id)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48" style={{ fill: '#000000', cursor: 'pointer', display: 'initial' }}>
                            <linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse">
                              <stop offset="0" stopColor="#32bdef">
                              </stop>
                              <stop offset="1" stopColor="#1ea2e4">
                              </stop>
                            </linearGradient>
                            <path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z">
                            </path>
                          </svg>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Completed