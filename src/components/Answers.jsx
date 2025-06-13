import { useEffect, useState } from "react"
import { checkHeading, replaceHeadingStars } from "../helper";

const Answer=({ans,totalResult,index,type})=>{
    const[heading,setHeading]=useState(false)
    const[answer,setAnswer]=useState(ans)
 useEffect(()=>{
if(checkHeading(ans)){
    setHeading(true)
    setAnswer(replaceHeadingStars(ans))
}

 },[])   
   
   
    return(
<>
{
    index==0 && totalResult>1?<span className="text-2xl  text-amber-200">{answer}</span>:
    heading?<span className=" pt-2 text-lg block text-amber-200"  >{answer}</span>
:<span className={type=='q'?'pl-1':'pl-5'}  >{answer}</span>
}

</>


    )
}
export default Answer