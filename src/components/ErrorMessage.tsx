
import React from 'react';
import type { ApiError } from '../utils/apiErrorHandler';

interface Props {
  error: ApiError | null;
  onClose?: () => void;
}

const ErrorMessage: React.FC<Props> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="error-overlay" style={{
      padding: '15px',
      margin: '10px 0',
      background: 'rgba(255, 77, 77, 0.15)',
      border: '1px solid #ff4d4d',
      borderRadius: 'var(--radius-md)',
      color: '#fff',
      fontSize: '0.9rem',
      position: 'relative'
    }}>
      <div style={{ fontWeight: 'bold', color: '#ff4d4d', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="bi bi-exclamation-triangle-fill"></i>
        {error.message}
      </div>
      <div style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>
        <strong>วิธีแก้ไข:</strong> {error.instruction}
      </div>
      {error.technicalDetails && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Details: {error.technicalDetails}
        </div>
      )}
      {onClose && (
        <button onClick={onClose} style={{
          position: 'absolute', top: '5px', right: '10px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer'
        }}>×</button>
      )}
    </div>
  );
};

export default ErrorMessage;
