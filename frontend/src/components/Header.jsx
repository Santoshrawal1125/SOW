import React from 'react'
import './header.css'

export function Header({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-left">
          <button
            type="button"
            className={`hamburger ${isSidebarOpen ? 'active' : ''}`}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isSidebarOpen}
            onClick={onToggleSidebar}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path 
                d="M3 6h18M3 12h18M3 18h18" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
              />
            </svg>
          </button>
          
          <div className="avatar">
            <svg
              viewBox="0 0 24 24"
              fill="#d1d5db"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <div className="identity">
            <div className="name">Santosh Rawal</div>
            <div className="company">Kathmandu Nepal</div>
          </div>
        </div>
        <div className="header-right">
          <div className="lang">English</div>
          <div className="flag">
            <img src="https://flagcdn.com/gb.svg" alt="English" />
          </div>
        </div>
      </div>
    </header>
  )
}