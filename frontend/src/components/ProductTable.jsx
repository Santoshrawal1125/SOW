import React, { useEffect, useState } from 'react';
import './producttable.css';

const IconArrowDown = () => (
  <svg viewBox="0 0 24 24" className="icon icon-small" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowRightGreen = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products/')
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`API error ${res.status}: ${txt}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.results)) {
          setProducts(data.results);
        } else {
          const found = Array.isArray(data.items) ? data.items : [];
          setProducts(found);
        }
      })
      .catch((err) => {
        console.error('Failed to load products', err);
        setError(err.message || 'Failed to load');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="product-table-wrapper" role="region" aria-label="Product list table">
      <table className="product-table">
        <thead>
          <tr className="table-head-row">
            <th className="cell cell-empty col-action" scope="col" aria-hidden></th>
            <th className="cell col-article" scope="col">Article No. <span className="icon-blue"><IconArrowDown /></span></th>
            <th className="cell col-product" scope="col">Product/Service <span className="icon-blue"><IconArrowDown /></span></th>
            <th className="cell col-inprice" scope="col">In Price</th>
            <th className="cell col-price" scope="col">Price</th>
            <th className="cell col-unit" scope="col">Unit</th>
            <th className="cell col-instock" scope="col">In Stock</th>
            <th className="cell col-desc" scope="col">Description</th>
            <th className="cell cell-empty col-action" scope="col" aria-hidden></th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="table-row"><td className="cell" colSpan={9}>Loading...</td></tr>
          ) : error ? (
            <tr className="table-row"><td className="cell" colSpan={9}>Error: {error}</td></tr>
          ) : products.length === 0 ? (
            <tr className="table-row"><td className="cell" colSpan={9}>No products found</td></tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id ?? prod.article_no} className="table-row">
                <td className="cell cell-icon col-action" data-label="">
                  <IconArrowRightGreen />
                </td>
                <td className="cell col-article" data-label="Article No.">{prod.article_no || '—'}</td>
                <td className="cell col-product" data-label="Product/Service">{prod.product_service}</td>
                <td className="cell col-inprice" data-label="In Price">{prod.in_price}</td>
                <td className="cell col-price" data-label="Price">{prod.price}</td>
                <td className="cell col-unit" data-label="Unit">{prod.unit}</td>
                <td className="cell col-instock" data-label="In Stock">{prod.in_stock}</td>
                <td className="cell col-desc" data-label="Description">{prod.description}</td>
                <td className="cell cell-icon col-action" data-label="">
                  <span className="icon-muted"><IconEdit /></span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
