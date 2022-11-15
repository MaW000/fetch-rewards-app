import React, { useState, useEffect } from 'react';
import DropDownButton from './components/DropDown'
import DropDownStates from './components/DropDownStates';
function FormPage() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: '',
    occupation: '',
    state: '',
  })
  const [state, setState] = useState('Select State')
  const [occupation, setOccupation] = useState('Select Occupation')
  const [data, setData] = useState({})
  const [emptyField, setEmptyField] = useState(false)
  const [res, setRes] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      fetch('https://frontend-take-home.fetchrewards.com/form')
      .then((res) => res.json())
      .then((data) => setData(data))
    }

    fetchData()
      .catch(console.error)
  }, [])

  //adds abbreviation to label and sets the field "state" on inputs
  function addState(st) {
    let index = data.states.findIndex((state) => state.name === st)
    
    setState(data.states[index].abbreviation)
    setInputs((prev) => ({
      ...prev,
      state: st
    }))
  }
  //set inputs when fields change
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(prev => ({...prev, [name]: value}))
  }
  //adds occupation to label and sets the field "occupation" on inputs
  function addOcc(occ) {
    setOccupation(occ)
    setInputs((prev) => ({
      ...prev,
      occupation: occ
    }))
  }

  //checks if fields are empty and posts inputs
  const handleSubmit = event => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    }
    if(inputs.occupation === ''){
      setEmptyField(true)
      } else if(inputs.state === '') {
        setEmptyField(true)
        } else {
          setEmptyField(false)
          console.log(inputs)
          fetch('https://frontend-take-home.fetchrewards.com/form',requestOptions)
            .then(res => res.json())
            .then(data => setRes(data))
    }
  };
  console.log(res)
  return (
    <div>
      {!res && <div>
      {emptyField && <h1>Must select occupation and state</h1>}
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-indigo-700 text-xs font-bold mb-2" >
                Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" onChange={handleChange} value={inputs.name} name="name" placeholder="Mark" required/>
              
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-indigo-700 text-xs font-bold mb-2" >
                Password
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" onChange={handleChange} value={inputs.password} name="password" placeholder="******************" required/>
              <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-indigo-700 text-xs font-bold mb-2" >
                Email
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" onChange={handleChange} value={inputs.email} name="email" placeholder="Mark@gmail.com" required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-indigo-700 text-xs font-bold mb-2" >
                Occupation 
              </label>
              <DropDownButton data={data.occupations} occupation={occupation} addOcc={addOcc}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-indigo-700 text-xs font-bold mb-2" >
              State
              </label>
              <DropDownStates data={data.states} state={state} addState={addState}/>
            </div>
            
          </div>
          <button type="submit" value="Submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          </form>
    </div>}
    {res && 
      <div className="flex flex-col">
        <h1>User Info</h1>
        
          <label>{`Name: ${res.name}`}</label>
          <label>{`email: ${res.email}`}</label>
          <label>{`Password: ${res.password}`}</label>
          <label>{`Occupation: ${res.occupation}`}</label>
          <label>{`State: ${res.state}`}</label>
      </div>
    }
    </div>
  )
}

export default FormPage

