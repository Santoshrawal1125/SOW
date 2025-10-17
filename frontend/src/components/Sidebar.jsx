import React from 'react';
import './sidebar.css';
const ICONS = {
  fileText: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M7 13v-6" />
      <path d="M12 17v-10" />
      <path d="M17 9v8" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <circle cx="3.5" cy="6" r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="12" r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="18" r="0.8" fill="currentColor" />
    </svg>
  ),
  archive: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="5" rx="1" />
      <path d="M21 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
      <path d="M10 12h4" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0L3.7 13.95a2 2 0 0 1 0-2.83L11 4.78a2 2 0 0 1 2.83 0l6.76 6.76a2 2 0 0 1 0 2.83z" />
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4.46a2 2 0 0 0 2 0l7-4.46A2 2 0 0 0 21 16z" />
      <path d="M12 7v6" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  importExport: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M16 17l-4 4-4-4" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
};
// ----------------------------------------------------------------------
export function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: 'fileText', label: 'Invoices', color: 'cyan', href: '/pricelist' },
    { icon: 'users', label: 'Customers', color: 'cyan', href: '/pricelist' },
    { icon: 'chart', label: 'My Business', color: 'cyan', href: '/pricelist' },
    { icon: 'file', label: 'Invoice Journal', color: 'cyan', href: '/pricelist' },
    { icon: 'list', label: 'Price List', color: 'yellow', active: true, href: '/pricelist' },
    { icon: 'archive', label: 'Multiple Invoicing', color: 'cyan', href: '/pricelist' },
    { icon: 'alert', label: 'Unpaid Invoices', color: 'pink', href: '/pricelist' },
    { icon: 'tag', label: 'Offer', color: 'yellow-2', href: '/pricelist' },
    { icon: 'package', label: 'Inventory Control', color: 'cyan', href: '/pricelist' },
    { icon: 'user', label: 'Member Invoicing', color: 'cyan', href: '/pricelist' },
    { icon: 'importExport', label: 'Import/Export', color: 'cyan', href: '/pricelist' },
    { icon: 'logout', label: 'Log out', color: 'cyan', href: '/logout' }
  ];

  /**
   * Clears all client-side authentication tokens from storage and cookies.
   */
  const clearClientAuth = () => {
    try {
          ['access', 'accessToken', 'refresh', 'refreshToken', 'tokenObtained', 'user'].forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
          });

    } catch (err) {
      console.error("Error clearing local/session storage:", err);
    }

    const cookieNames = ['access_token', 'refresh_token', 'csrftoken', 'sessionid'];
    

    const expiredDate = 'Thu, 01 Jan 1970 00:00:01 GMT';
    const pathsToClear = ['/', window.location.pathname, '/auth']; 

    cookieNames.forEach((name) => {
      pathsToClear.forEach((path) => {
        // Try clearing with different options (path, domain, samesite)
        document.cookie = `${name}=; expires=${expiredDate}; path=${path}; samesite=lax`;
        document.cookie = `${name}=; expires=${expiredDate}; path=${path}; samesite=strict`;
        document.cookie = `${name}=; expires=${expiredDate}; path=${path};`; 
      });
    });


  };

  const handleLinkClick = (e, item) => {
    if (window.innerWidth <= 1024) {
      onClose?.();
    }
    
    if (item.label === 'Log out') {
      e.preventDefault();
      clearClientAuth();
      
      window.location.href = '/';
    }
  };
  
  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside 
        className={`app-sidebar ${isOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-top">
          <h2 className="sidebar-title">Menu</h2>
        </div>
        <nav className="sidebar-nav">
          <ul className="menu" role="list">
            {menuItems.map((item) => (
              <li key={item.label} className="menu-item">
                <a 
                  href={item.href}
                  className={`menu-link ${item.active ? 'active' : ''}`}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  <span className={`menu-icon icon-${item.color}`} aria-hidden="true">
                    {ICONS[item.icon]}
                  </span>
                  <span className="menu-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}