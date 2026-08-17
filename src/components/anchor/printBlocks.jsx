import React from 'react';

const money = (v) => {
  const n = parseFloat(String(v || 0).replace(/,/g, ''));
  if (!n || isNaN(n)) return '';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const InputBox = ({ value = '', width = 80, height = 18 }) => (
  <span style={{ display: 'inline-block', minWidth: width, height, border: '1px solid #c06', background: '#fff', verticalAlign: 'middle', padding: '1px 3px', fontSize: '10px', lineHeight: `${height - 2}px`, color: '#000' }}>{value}</span>
);

export const DigitBoxes = ({ value = '', count = 4 }) => (
  <span style={{ display: 'inline-flex', gap: '1px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ display: 'inline-block', width: 14, height: 16, border: '1px solid #c06', background: '#fff', textAlign: 'center', lineHeight: '14px', fontSize: '9px', fontFamily: 'monospace' }}>{value?.[i] || ''}</span>
    ))}
  </span>
);

export const MoneyBoxesSmall = ({ value }) => {
  const formatted = money(value);
  const [intPart = '', decPart = '00'] = formatted.split('.');
  const digits = intPart.replace(/,/g, '').padStart(5, ' ');
  const dec = decPart.padEnd(2, '0').slice(0, 2);
  const g1 = digits.slice(0, 2), g2 = digits.slice(2, 5);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      <DigitBoxes value={g1} count={2} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>,</span>
      <DigitBoxes value={g2} count={3} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>.</span>
      <DigitBoxes value={dec} count={2} />
    </span>
  );
};

export const SSNBox = ({ last4 = '' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
    {[0, 1, 2].map(i => <span key={i} style={{ display: 'inline-block', width: 14, height: 16, border: '1px solid #c06', background: '#fff', textAlign: 'center', lineHeight: '14px', fontSize: '9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0, 1].map(i => <span key={i} style={{ display: 'inline-block', width: 14, height: 16, border: '1px solid #c06', background: '#fff', textAlign: 'center', lineHeight: '14px', fontSize: '9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0, 1, 2, 3].map(i => <span key={i} style={{ display: 'inline-block', width: 14, height: 16, border: '1px solid #c06', background: '#fff', textAlign: 'center', lineHeight: '14px', fontSize: '9px' }}>{last4?.[i] || ''}</span>)}
  </span>
);

export const CB = ({ checked }) => (
  <span style={{ display: 'inline-block', width: 14, height: 14, border: '1px solid #c06', background: '#fff', textAlign: 'center', lineHeight: '12px', fontSize: '9px', fontWeight: 'bold', verticalAlign: 'middle' }}>{checked ? 'X' : ''}</span>
);

export const PB = () => <div style={{ pageBreakAfter: 'always', borderTop: '1px dashed #999', margin: '16px 0 0' }} />;

export const H2 = ({ children }) => (
  <div style={{ fontSize: '16px', fontWeight: '900', margin: '12px 0 5px', borderBottom: '1.5px solid #000', paddingBottom: '2px' }}>{children}</div>
);

export const Row = ({ children, style = {} }) => (
  <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', ...style }}>{children}</div>
);

export const Ln = ({ n }) => <span style={{ fontWeight: '700', minWidth: '30px', display: 'inline-block' }}>{n}</span>;

export const BASE = {
  fontFamily: "'Noto Sans KR', 'Malgun Gothic', Arial, sans-serif",
  fontSize: '9.5px', color: '#000', lineHeight: 1.4,
};