import { useState } from "react";
import "./App.css";

function App() {
  const [chat, setChat] = useState([]);
  const [input,setInput] = useState();
  const [waiting,setWaiting] = useState(false);

  const callAPI = async (e)=>{
    e.preventDefault();
    if(input.trim().length === 0) return;
    setWaiting(true);
    console.log(waiting)
    setChat((prev)=>[...prev,input]);
    setInput("")
     
    try{
      const response = await fetch("http://localhost:5000/",{
        method:"POST",
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify({
          prompt:input
        })
      });

      if(!response.ok){
        console.log("some issue occured in backend")
      }else{
        const val = await response.json();
        console.log(val.ai);
        setChat((prev)=>[...prev,val.ai]);
      }
      
    }catch(err){
      console.log("Some error occured");
    }finally{
      setWaiting(false);
    } 
    
 

  }

  return (
    <div className="chat-box">
      
      <div className="heading">AI Assistant</div>
      
      <div className="chat-section-outer">
        <div className="chat-section">
        

        <div className="chat-area">{
          chat.map((val,index)=>{
            if(index%2===0){
              return <div key={index} className="human">{val}</div>
            }
            return <div key={index} className="ai-reply">{val}</div>
          })
      }</div>

        <form className="form">
          <input value={input} onChange={(e)=>{
            setInput(e.target.value);
          }} className="type"></input>
          <button disabled={waiting} onClick={(e)=>{
            callAPI(e);
          }} className="bttn">Send</button>
        </form>
      </div>
      </div>
      
    </div>
  );
}

export default App;
