import React from 'react';
import './producttable.css';

const IconArrowDown = () => (
  <svg viewBox="0 0 24 24" className="icon icon-small" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" aria-hidden>
    <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMoreHorizontal = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" aria-hidden>
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export function ProductTable() {
  return (
    <div className="product-table-wrapper" role="region" aria-label="Product list table">
      <table className="product-table">
        <thead>
          <tr className="table-head-row">
            <th className="cell cell-empty" scope="col"></th>
            <th className="cell">Article No. <span className="icon-blue"><IconArrowDown /></span></th>
            <th className="cell">Product/Service <span className="icon-blue"><IconArrowDown /></span></th>
            <th className="cell">In Price</th>
            <th className="cell">Price</th>
            <th className="cell">Unit</th>
            <th className="cell">In Stock</th>
            <th className="cell">Description</th>
            <th className="cell cell-empty" scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr className="table-row">
            <td className="cell cell-icon" data-label=""><span className="icon-blue"><IconArrowRight /></span></td>
            <td className="cell" data-label="Article No.">1234567890</td>
            <td className="cell" data-label="Product/Service">This is a test product with fifty characters this!</td>
            <td className="cell" data-label="In Price">900500</td>
            <td className="cell" data-label="Price">1500800</td>
            <td className="cell" data-label="Unit">kilometers/hour</td>
            <td className="cell" data-label="In Stock">2500600</td>
            <td className="cell" data-label="Description">This is the description with fifty characters this</td>
            <td className="cell cell-icon" data-label=""><span className="icon-muted"><IconMoreHorizontal /></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
