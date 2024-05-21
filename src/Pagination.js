import React from 'react'

const Pagination = ({data, pageHandler}) => {
    let pagenumbers=[]
    for(let i=1; i < Math.ceil(data.length/10)+1; i++){
pagenumbers.push(i);
    }
  return (
    <div>
      {pagenumbers.map(page=> <div><button onClick={()=>pageHandler(page)}>{page}</button></div>)}
    </div>
  )
}

export default Pagination
