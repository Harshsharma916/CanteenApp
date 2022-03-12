import { Table } from 'antd'
import React from 'react'
import Header from '../../Components/Header';
import style from "./index.module.css";

const WorkerDashboard = () => {
  

  const columns = [
    {
      title: "OrderId",
      key: "id",
      dataIndex: "id"
    },{
      title: "Customer Name",
      key: "name",
      dataIndex: 'user.name'
    },{
      title: "Order Time",
      key: "time",
      dataIndex: 'createdAt'
    },{
      title: "Payment mode",
      key: "modeOfPayment",
      dataIndex: 'modeOfPayment'
    },{
      title: "Total Price",
      key: "totalPrice",
      dataIndex: 'totalPrice'
    }
  ]

  return (
    <div>
      <Header />
      <div className={style}></div>
      <Table columns={columns} />
    </div>
  )
}

export default WorkerDashboard