

export const CardH = ({ children, style = {} }: any) => (
  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>{children}</div>
);
export const CardB = ({ children, style = {} }: any) => (
  <div style={{ padding: '1.5rem', ...style }}>{children}</div>
);
export const Badge = ({ children, color = 'blue' }: any) => {
  const map: any = { 
    blue: ['#DBEAFE','#1E40AF'], 
    green: ['#DCFCE7','#16A34A'], 
    yellow: ['#FEF3C7','#D97706'], 
    red: ['#FEE2E2','#DC2626'], 
    purple: ['#F3E8FF','#6B21A8'],
    gray: ['#F1F5F9','#64748B'] 
  };
  const [bg,fg] = map[color] || map.blue;
  return <span style={{ backgroundColor: bg, color: fg, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>;
};
export const Card = ({ children, style = {} }: any) => (
  <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', overflow: 'hidden', ...style }}>{children}</div>
);

export const Input = ({ ...props }: any) => (
  <input {...props} style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', ...props.style }} />
);

export const Select = ({ children, ...props }: any) => (
  <select {...props} style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: 'white', ...props.style }}>
    {children}
  </select>
);
