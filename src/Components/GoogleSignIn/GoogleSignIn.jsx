import React from "react";
import Google from "../../assets/Google.svg";
import useAuth from "../../Hooks/useAuth";
const GoogleSignIn = () => {
  const {googleSignIn } = useAuth();
  const handleClick = ()=>{
    googleSignIn()
    .then((r)=>{
        console.log(r);
    })
    .catch(err => console.log(err.message))
  }
  return (
    <div>
      <h2 className="text-center font-bold text-xl py-2">Or</h2>
      <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleClick}>
        <img src={Google} alt="" />
        Authenticate with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
