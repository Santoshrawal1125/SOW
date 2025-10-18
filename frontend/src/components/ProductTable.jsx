import React, { useEffect, useState } from 'react';
import { InlineEditCell } from '../InlineEditCell.jsx';
import './producttable.css';
import { authFetch } from '../api.js';

/*Icons  */
const IconArrowDown = () => (
  <svg viewBox="0 0 24 24" className="icon icon-small" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowRightGreen = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="icon icon-medium" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);


async function apiPatchProduct(productId, patchObj) {
  const res = await authFetch(`/api/products/${productId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchObj),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}


export function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null); 

  useEffect(() => {
    let mounted = true;
    authFetch('/api/products/')
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`API error ${res.status}: ${txt}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;

        // --- NORMALIZE RESPONSE TO ARRAY ---
        const arr = Array.isArray(data)
          ? data
          : (data && Array.isArray(data.results)
            ? data.results
            : (Array.isArray(data.items) ? data.items : []));

        // --- DEFENSIVE STABLE SORT BY created_at (oldest first), tiebreak by id ---
        arr.sort((a, b) => {
          const ta = a && a.created_at ? new Date(a.created_at).getTime() : 0;
          const tb = b && b.created_at ? new Date(b.created_at).getTime() : 0;
          if (ta !== tb) return ta - tb;
          return (Number(a?.id || 0) - Number(b?.id || 0));
        });

        setProducts(arr);
      })
      .catch((err) => {
        console.error('Failed to load products', err);
        if (mounted) setError(err.message || 'Failed to load');
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  const updateProductInState = (id, partial) => {
    setProducts((prev) => {
      const needle = Number(id);
      const idx = prev.findIndex(p => Number(p.id) === needle);
      if (idx === -1) {
        return prev;
      }
      const updatedItem = { ...prev[idx], ...partial };
      const next = prev.slice(); 
      next[idx] = updatedItem;
      return next;
    });
  };

  const makeOnSave = (productId, fieldName) => async (newValue) => {
    const existing = products.find(p => Number(p.id) === Number(productId));
    const oldValue = existing ? existing[fieldName] : undefined;

    if (newValue === oldValue) return { updatedValue: oldValue };

    updateProductInState(productId, { [fieldName]: newValue });

    try {
      const updatedProduct = await apiPatchProduct(productId, { [fieldName]: newValue });
      if (updatedProduct) {
        updateProductInState(productId, updatedProduct);
        return { updatedValue: updatedProduct[fieldName] ?? newValue };
      }
      return { updatedValue: newValue };
    } catch (err) {
      updateProductInState(productId, { [fieldName]: oldValue });
      throw err;
    }
  };

  const toggleActive = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleRowKey = (e, id) => {
    if (e.key === 'Enter' ) {
      e.preventDefault();
      toggleActive(id);
    }
  };

  return (
    <div className="product-table-wrapper" role="region" aria-label="Product list table">
      <table className="product-table" role="table">
        <thead>
          <tr className="table-head-row" role="row">
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
            products.map((prod) => {
              const id = prod.id ?? prod.article_no;
              return (
                <tr
                  key={id}
                  className="table-row"
                  role="row"
                  tabIndex={0}
                  data-active={activeId === id}
                  onClick={() => toggleActive(id)}
                  onKeyDown={(e) => handleRowKey(e, id)}
                  aria-selected={activeId === id}
                >
                  <td className="cell cell-icon col-action" data-label="">
                    {activeId === id ? <IconArrowRightGreen /> : <span className="icon-placeholder" aria-hidden />}
                  </td>

                  <td className="cell col-article" data-label="Article No.">{prod.article_no ?? '—'}</td>

                  <td className="cell col-product" data-label="Product/Service">
                    <InlineEditCell
                      value={prod.product_service ?? ''}
                      onSave={makeOnSave(id, 'product_service')}
                      inputProps={{ maxLength: 256 }}
                      renderValue={(v) => v || '—'}
                    />
                  </td>

                  <td className="cell col-inprice" data-label="In Price">
                    <InlineEditCell
                      value={prod.in_price ?? ''}
                      onSave={makeOnSave(id, 'in_price')}
                      validate={(v) => {
                        const ok = v !== '' && !Number.isNaN(Number(v));
                        return { ok, message: ok ? undefined : 'Enter a valid number' };
                      }}
                      inputProps={{ inputMode: 'numeric' }}
                      renderValue={(v) => (v === '' || v === null ? '—' : Number(v).toFixed(2))}
                    />
                  </td>

                  <td className="cell col-price" data-label="Price">
                    <InlineEditCell
                      value={prod.price ?? ''}
                      onSave={makeOnSave(id, 'price')}
                      validate={(v) => {
                        const ok = v !== '' && !Number.isNaN(Number(v));
                        return { ok, message: ok ? undefined : 'Invalid price' };
                      }}
                      inputProps={{ inputMode: 'numeric' }}
                      renderValue={(v) => (v === '' || v === null ? '—' : Number(v).toFixed(2))}
                    />
                  </td>

                  <td className="cell col-unit" data-label="Unit">
                    <InlineEditCell
                      value={prod.unit ?? ''}
                      onSave={makeOnSave(id, 'unit')}
                      inputProps={{ maxLength: 32 }}
                      renderValue={(v) => v || '—'}
                    />
                  </td>

                  <td className="cell col-instock" data-label="In Stock">
                    <InlineEditCell
                      value={prod.in_stock ?? ''}
                      onSave={makeOnSave(id, 'in_stock')}
                      validate={(v) => {
                        const ok = v !== '' && Number.isInteger(Number(v));
                        return { ok, message: ok ? undefined : 'Enter whole number' };
                      }}
                      inputProps={{ inputMode: 'numeric' }}
                      renderValue={(v) => (v === '' || v === null ? '—' : String(v))}
                    />
                  </td>

                  <td className="cell col-desc" data-label="Description">
                    <InlineEditCell
                      value={prod.description ?? ''}
                      onSave={makeOnSave(id, 'description')}
                      inputProps={{ maxLength: 500 }}
                      renderValue={(v) => v || '—'}
                    />
                  </td>

                  <td className="cell cell-icon col-action" data-label="">
                    <span className="icon-muted"><IconEdit /></span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
