import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { SearchBar } from '../components/SearchBar'
import { ProductTable } from '../components/ProductTable'
import './pricelist.css'

export default function Pricelist() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="pricelist-page">
      <Header
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="content-area">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className="pricelist-main"
          onClick={() => {
            if (isSidebarOpen) setSidebarOpen(false)
          }}
        >
          <div className="main-inner">
            <SearchBar />
            <ProductTable />
          </div>
        </main>
      </div>

      <div
        className={`mobile-overlay ${isSidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
    </div>
  )
}
