import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { URL } from './constants'
import Answer from './components/Answers'

function App() {
  const [question, setQuestion] = useState('');
const[result,setResult]=useState([])

 const payload={
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }
const askQuestion=async()=>{
  let response=await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload)
  })
  response=await response.json();
  let dataString=response.candidates[0].content.parts[0].text;
  dataString=dataString.split("*");
  dataString=dataString.map((item)=>item.trim());
  console.log(dataString);
  
  setResult([...result,{type:'q',text:question},{type:'a',text:dataString}])
  
}
  return (
    <div className='grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-800'>

      </div>

      <div className='col-span-4 p-10'>
<div className='container h-110   overflow-scroll bg-zinc-800'>
<div className='text-white'>
  <ul>
  {
    result.map((item,index)=>(
    <div key={index+Math.random()} className={item.type=='q'?'flex justify-end':''}> 
{
item.type=='q'?
    <li key={index+Math.random()} className='text-right p-1 border-5 bg-zinc-800 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit'> <Answer ans={item.text} totalResult={1} index={index} type={item.type}/></li>
   :item.text.map((ansItem,ansIndex)=>(
     <li key={ansIndex+Math.random()} className='text-left p-0.5 '> <Answer ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type}/></li>
    
   ))
  }
    </div>
   ))
  
  }
  </ul>
{/* <ul>
  {
    result && result.map((item,index)=>(
  <li key={index+Math.random()} className='text-left p-0.5'> <Answer ans={item}totalResult={result.length} index={index}/></li>
    )
  )
  }

</ul> */}
</div>
</div>
<div className=' bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl
border border-zinc-400  flex h-16 '>
  <input type='text' value={question}  onChange={(event)=>setQuestion(event.target.value)}   className='w-full h-full p-3 outline-none'   placeholder='Ask Me Anything'  />
<button onClick={askQuestion}>Ask</button>

</div>
      </div>
    </div>
  )
}

export default App
