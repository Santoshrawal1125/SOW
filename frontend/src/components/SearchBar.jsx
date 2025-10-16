import React from 'react';
import './searchbar.css';

const IconSearch = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);

const IconPlusCircle = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPrinter = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
    <path d="M6 9V3h12v6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="13" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <path d="M6 17h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export function SearchBar() {
  return (
    <section className="searchbar" aria-label="Search and actions">
      <div className="search-row">
        <div className="search-field">
          <label className="visually-hidden" htmlFor="search-article">Search Article No</label>
          <input id="search-article" type="text" placeholder="Search Article No..." className="search-input" />
          <span className="icon icon-search"><IconSearch /></span>
        </div>
      </div>

      <div className="search-row actions-row">
        <div className="search-field">
          <label className="visually-hidden" htmlFor="search-product">Search Product</label>
          <input id="search-product" type="text" placeholder="Search Product..." className="search-input" />
          <span className="icon icon-search"><IconSearch /></span>
        </div>

        <div className="actions">
          <button type="button" className="action-btn">
            <span className="action-label">New Product</span>
            <span className="action-icon"><IconPlusCircle /></span>
          </button>

          <button type="button" className="action-btn">
            <span className="action-label">Print List</span>
            <span className="action-icon"><IconPrinter /></span>
          </button>

          <div className="action-toggle" aria-hidden>
            <span className="action-label">Advanced mode</span>
            <button type="button" className="toggle" aria-pressed="false" title="Toggle advanced mode">
              <span className="toggle-knob" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
