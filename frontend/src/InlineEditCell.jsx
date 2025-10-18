import React, { useState, useRef, useEffect } from 'react';

export function InlineEditCell({
  value: initialValue,
  onSave,
  renderValue,
  inputProps = {},
  validate,
  className = '',
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue ?? '');
  const [localError, setLocalError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [prevValue, setPrevValue] = useState(initialValue);
  const mounted = useRef(true);
  const requestIdRef = useRef(0);
  const inputRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    setValue(initialValue ?? '');
    setPrevValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      const len = String(inputRef.current.value).length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const startEdit = (e) => {
    e?.stopPropagation?.();
    setLocalError(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setValue(prevValue);
    setLocalError(null);
    setEditing(false);
  };

  const doSave = async () => {
    if (saving) return;
    if (validate) {
      const res = validate(value);
      if (!res.ok) {
        setLocalError(res.message || 'Invalid value');
        return;
      }
    }

    if (value === prevValue) {
      setEditing(false);
      return;
    }

    setSaving(true);
    setLocalError(null);
    const thisRequestId = ++requestIdRef.current;

    try {
      const result = await onSave(value);
      if (!mounted.current || thisRequestId !== requestIdRef.current) return;

      const newVal = (result && result.updatedValue !== undefined) ? result.updatedValue : value;
      setPrevValue(newVal);
      setValue(newVal);
      setEditing(false);
    } catch (err) {
      setLocalError(err?.message || 'Save failed');
    } finally {
      if (mounted.current) setSaving(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };


  const onContainerMouseDown = (e) => {
    if (!editing) {
      e.preventDefault(); 
      startEdit(e);
    }
  };

  const onContainerKeyDown = (e) => {
    if (!editing && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      startEdit();
    }
  };

  return (
    <div
      className={`inline-edit-cell ${editing ? 'editing' : ''} ${className}`}
      onMouseDown={onContainerMouseDown}
      onKeyDown={onContainerKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Edit value"
      onClick={(e) => { if (!editing) startEdit(e); }}
      style={{ outline: 'none' }}
    >
      {!editing ? (
        <div
          className="inline-display"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startEdit(); } }}
        >
          {renderValue ? renderValue(value) : value ?? '—'}
        </div>
      ) : (
        <div className="inline-edit-wrapper">
          <input
            ref={inputRef}
            className="inline-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => doSave()}
            onKeyDown={onKeyDown}
            disabled={saving}
            {...inputProps}
          />
          {saving && <span className="inline-saving" aria-live="polite">Saving…</span>}
        </div>
      )}

      {localError && <div className="inline-error" role="status">{localError}</div>}
    </div>
  );
}
