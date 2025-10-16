import React, { useState } from 'react'

const mock = Array.from({length:20}).map((_,i)=>({
  id: i+1, sku:`SKU${i+1}`, name:`Product ${i+1}`, in_price: (5+i).toFixed(2), price: (10+i).toFixed(2), tax_percent: 25, unit: 'pcs'
}))

export default function Pricelist(){
  const [rows,setRows] = useState(mock)
  return (
    <div style={{padding:16}}>
      <h1>Pricelist</h1>
      <div className="table">
        <div className="header">
          <div>Product/Service</div>
          <div>In Price</div>
          <div>Price</div>
          <div>Tax</div>
        </div>
        {rows.map(r => (
          <div key={r.id} className="row">
            <input defaultValue={r.name} />
            <input defaultValue={r.in_price} />
            <input defaultValue={r.price} />
            <input defaultValue={r.tax_percent} />
          </div>
        ))}
      </div>
    </div>
  )
}
