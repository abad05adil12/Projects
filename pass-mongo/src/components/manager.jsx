import { fromJSON } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const getPasswords = async() =>{
    let req = await fetch("https://localhost:3000/")
    let passwords= await req.json()
    if (passwords) {
      console.log(passwords);
      setpasswordArray(passwords);
  }
  }

useEffect(() => {
  const saved = localStorage.getItem("passwords");
  if (saved) {
    setpasswordArray(JSON.parse(saved));
  }
}, []);
  

  const copyText = (text) => {
    toast("Copied to Clip board", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    const input = document.querySelector('input[name="password"]');
    if (input.type === "password") {
      input.type = "text";
      ref.current.src = "hiddeneye.png";
    } else {
      input.type = "password";
      ref.current.src = "eye.png";
    }
  };

  const savePassword = () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    const newEntry = { ...form, id: uuidv4() };
    const newArray = [...passwordArray, newEntry];
    setpasswordArray(newArray);

    // Save to localStorage
    localStorage.setItem("passwords", JSON.stringify(newArray));

    toast("Password Saved", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  }
};

const deletePassword = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this password?");
  if (!confirmDelete) return;

  const newArray = passwordArray.filter((item) => item.id !== id);
  setpasswordArray(newArray);
  localStorage.setItem("passwords", JSON.stringify(newArray));

  toast("Password deleted successfully", {
    position: "top-right",
    autoClose: 1500,
    theme: "dark",
    transition: Bounce,
  });
};



  const editPassword = (id) => {
    console.log("Editing password with id", id);
    const selectedPassword = passwordArray.find((item) => item.id === id);
    setform(selectedPassword);
    const newArray = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(newArray);
    localStorage.setItem("passwords", JSON.stringify(newArray));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute top-0 z-[-2] h-340 w-337.75 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="my-container backdrop-blur-xl bg-white/2 rounded-b-2xl">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-900">&lt;</span>
          <span className="text-white">Pass-</span>
          <span className="text-green-900">Mgmt/&gt;</span>
        </h1>
        <p className="text-white py-2 px-5 text-lg text-center">
          Your own Password <span className="text-green-800">Manager.</span>
        </p>
        <div className="flex flex-col items-center p-4 gap-8 text-black ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website name"
            className="rounded-full bg-white border border-green-800 w-full p-4 py-1"
            type="text"
            name="site"
            />
          <div className="flex w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full bg-white border border-green-800 w-full p-4 py-1"
              type="text"
              name="username"
              />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full bg-white border border-green-800 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center text-white justify-center bg-green-950 rounded-full py-2 px-4 w-fit cursor-pointer gap-2 hover:text-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-white text-center m-3 font-serif text-2xl p-1">
            Your Saved <span className="text-green-800 ">Passwords </span>
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-white text-xl font-light font-serif text-center py-4">
              No passwords to show
            </div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white px-1">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="flex items-center justify-center py-2 px-1 border border-white text-center">
                      <div className="flex justify-center items-center">
                        <a href={item.site} target="_blank" rel="noreferrer">
                          {item.site}
                        </a>
                        <div
                          className="copy size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "10px",
                            }}
                            src="https://cdn.lordicon.com/mdwcjxrj.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-1 border border-white text-center">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div
                          className="copy size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "10px",
                            }}
                            src="https://cdn.lordicon.com/mdwcjxrj.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" py-2 px-1 border border-white text-center">
                      <div className="flex justify-center items-center">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div
                          className="copy size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "10px",
                            }}
                            src="https://cdn.lordicon.com/mdwcjxrj.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center items-center py-2 px-1 border border-white text-center cursor-pointer">
                      <span
                        className="mx-1"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                        <lord-icon
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="mx-1"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                        >
                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;