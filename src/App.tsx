import { useEffect, useState } from 'react'

import './App.css'


  interface Lista{
    id:string,
    texto:string,
    check:boolean
    
  }
 

function App() {

  const [value,setValue]=useState("")

  const [list,setList]= useState<Lista[]>(()=>{
    const savedList=localStorage.getItem("lista")
    if(savedList!==null){
      return JSON.parse(savedList)
    }
    return []
  })


  function AdicionarValor(){
    if(value.trim()==""){
      alert("Input vazio")
    }

    if(value!==""){
     
      const id=crypto.randomUUID();
      const text=value
      const newList:Lista={
        id:id,
        texto:text,
        check:false,
        
      }
      setList([...list,newList])
    }
    setValue("")
   
  }

  const TrocarValor=(id:string)=>{
    const trocar=list.map((nList)=>{
      if(nList.id==id){
        return {...nList,check:!nList.check}
      }
      return nList
    })
    setList(trocar)

  }


  const Apagar=(id:string)=>{
    const apagando=list.filter((nList)=>nList.id!==id)
    setList(apagando)

  }
  useEffect(()=>{
    localStorage.setItem("lista",JSON.stringify(list))

  },[list])


  return (
    <div className='app'>

      <div className='container'>
        <h1>Lista Compras</h1>
        <div className='input-container'>
          <input placeholder='Adicionar produto'
          value={value}
          onChange={(e)=>{setValue(e.target.value)}}></input>
          <button onClick={AdicionarValor}>Adicionar</button>
        </div>
        <ol>
          {list.map((newList)=>(
            <li id={newList.id}>
              <span> {newList.texto}</span>
              <input placeholder='Digite quantidade'></input>
               <input type='checkbox'
              checked={newList.check}
              onChange={()=>{TrocarValor(newList.id)}}></input>
              <button onClick={()=>Apagar(newList.id) }>Apagar</button>
            </li>
          ))}
        </ol>

      </div>


    </div>
  )
}
export default App
