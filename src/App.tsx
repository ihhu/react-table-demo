import { useState } from 'react'
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import './App.css'
import CustomTable from "./components/Table"
function App() {
  const [tableData] = useState(
    {
      id: 1,
      ticket: [
        {
          id: 1,
          name: '成人票',
          price: 100,
        },
        {
          id: 2,
          name: '儿童票',
          price: 50,
        },
        {
          id: 3,
          name: '老人票',
          price: 80,
        },
      ],
      Attractions: [
        {
          id: 1,
          name: '故宫',
          price: 100,
          time: '10:00-18:00',
        },
        {
          id: 2,
          name: '天安门',
          price: 50,
          time: '10:00-18:00',
        },
        {
          id: 3,
          name: '长城',
          price: 80,
          time: '10:00-18:00',
        },
      ],
      Hotel: [
        {
          id: 1,
          name: '北京饭店',
          price: 100,
          time: '10:00-18:00',
        },
        {
          id: 2,
          name: '格林豪泰',
          price: 50,
          time: '10:00-18:00',
        },
        {
          id: 3,
          name: '如家',
          price: 80,
          time: '10:00-18:00',
        },
      ],
    })

  return (
    <>
      <ConfigProvider>
        <CustomTable tableData={tableData}/>
      </ConfigProvider>
    </>
  )
}

export default App
