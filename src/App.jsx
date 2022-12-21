import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DragAndDrop from './component/DragAndDrop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <DragAndDrop/>
    </div>
  )
}

export default App
