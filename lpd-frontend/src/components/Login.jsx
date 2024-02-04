import React,{useState} from 'react'
import '../static/Login.css'
import Alert from './Alert';
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if(show){
    setTimeout(() => setShow(false), 3000);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
        'Access-Control-Allow-Headers': "Content-Type",
        'Access-Control-Allow-Methods': "GET, POST",
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setType(data.status)
      setMessage(data.message)
      if (data.status === "success") {
        navigate("/license",{state : {
          "username" : data.username
        }});
      } else {
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };



  return props.trigger ? (
    <>
    {console.log(show)}
    {console.log(type)}
    {console.log(message)}
    {show ? <Alert type={type} message={message}/> : null}
    <div className='h-screen w-screen' style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -25%)",
        }} >
      <div className="flex flex-col justify-start items-center relative" >
      <div className="w-full max-w-xs ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col items-end justify-end'>
          <button
            onClick={()=>props.setTrigger(false)}
            type="button"
            class="bg-white rounded-md p-2 inline-flex text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
            
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShow(true)}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Login