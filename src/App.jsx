import React, { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str += "0123456789"
    }

    if (charAllowed) {
      str += "!#$%&()*+,-./:;<=>?@[\]^_{|}"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  // passwordGenerator()

  return (
    <>
      <div className='App'>
        <div className="background-video">
          <video autoPlay loop muted>
            <source src="bg-vedio/Theme-Imagine.mp4" type="video/mp4" />
            
            Your browser does not support the video tag.
          </video>
        </div>

        <div className='content w-full h-screen justify-center text-center' style={{ paddingTop: '250px' }} >
          <div className='max-w-md mx-auto shadow-md justify-center rounded-lg px-4  py-3 my-8 text-white	 bg-gray-500	'>
            <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input
                type='text'
                value={password}
                className='outline-none text-black w-full py-1 px-3'
                placeholder='Password'
                readOnly
                ref={passwordRef}
              />
              <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

            </div>
            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input
                  type='range'
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e) => { setLength(e.target.value) }}
                />
                <label>Length:{length}</label>
              </div>
              <div className='flex items-center gap-x-1'>

                <input
                  type='checkbox'
                  defaultChecked={numberAllowed}
                  id='numberInput'
                  onChange={() => {
                    setnumberAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor='numberInput'>Numbers</label>
              </div>

              <div className='flex items-center gap-x-1'>

                <input
                  type='checkbox'
                  defaultChecked={charAllowed}
                  id='characterInput'
                  onChange={() => {
                    setcharAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor='characterInput'>Characters</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App



// 35.45