export const initialPatients = [
  { id: 'PAT-1001', name: 'Arjun Sharma', age: 34, gender: 'Male', phone: '+91 9876543210', email: 'arjun@example.com', address: '123 Main St, Bhopal', emergencyContact: '+91 9998887776', bloodGroup: 'O+', insurance: 'HDFC Ergo', ayushmanCard: '1234-5678-9012', status: 'Active', lastOrder: 'May 20, 2026' },
  { id: 'PAT-1002', name: 'Ritika Sharma', age: 28, gender: 'Female', phone: '+91 9123456789', email: 'ritika@example.com', address: '456 Park Ave, Bhopal', emergencyContact: '+91 9998887776', bloodGroup: 'A+', insurance: 'Star Health', ayushmanCard: '9876-5432-1098', status: 'Active', lastOrder: 'May 18, 2026' },
];

export const initialMedicines = [
  { id: 'MED-001', name: 'Paracetamol 500mg', genericName: 'Paracetamol', category: 'Pain Relief', manufacturer: 'Cipla', batchNumber: 'B123', expiryDate: '2027-12-31', stockQuantity: 1200, reorderLevel: 200, price: 50, prescriptionRequired: false, status: 'In Stock' },
  { id: 'MED-002', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin', category: 'Antibiotic', manufacturer: 'Sun Pharma', batchNumber: 'B124', expiryDate: '2026-10-31', stockQuantity: 320, reorderLevel: 100, price: 120, prescriptionRequired: true, status: 'In Stock' },
  { id: 'MED-003', name: 'Metformin 500mg', genericName: 'Metformin', category: 'Diabetes', manufacturer: 'Mankind', batchNumber: 'B125', expiryDate: '2026-11-30', stockQuantity: 80, reorderLevel: 100, price: 80, prescriptionRequired: true, status: 'Low Stock' },
  { id: 'MED-004', name: 'Vitamin D3 60K', genericName: 'Cholecalciferol', category: 'Vitamins', manufacturer: 'Alkem', batchNumber: 'B126', expiryDate: '2028-01-31', stockQuantity: 60, reorderLevel: 50, price: 150, prescriptionRequired: false, status: 'Low Stock' },
];

export const initialOrders = [
  { id: 'ORD-1024', patientId: 'PAT-1001', patientName: 'Arjun Sharma', medicine: 'Paracetamol 500mg', qty: '100 strips', status: 'Delivered', date: 'May 20, 2026', amount: 500, paymentStatus: 'Paid', deliveryAddress: '123 Main St, Bhopal' },
  { id: 'ORD-1023', patientId: 'PAT-1002', patientName: 'Ritika Sharma', medicine: 'Amoxicillin 500mg', qty: '50 caps', status: 'Processing', date: 'May 20, 2026', amount: 600, paymentStatus: 'Paid', deliveryAddress: '456 Park Ave, Bhopal' },
];

export const initialPrescriptions = [
  { id: 'RX-2001', patientId: 'PAT-1002', patientName: 'Ritika Sharma', doctorName: 'Dr. Neha Kapoor', date: 'May 20, 2026', medicines: 'Amoxicillin 500mg', dosage: '1-0-1', duration: '5 days', status: 'Pending' },
  { id: 'RX-2002', patientId: 'PAT-1001', patientName: 'Arjun Sharma', doctorName: 'Dr. R.K. Singh', date: 'May 19, 2026', medicines: 'Paracetamol 500mg', dosage: '1-0-1', duration: '3 days', status: 'Processing' },
];

export const initialSuppliers = [
  { id: 'SUP-001', name: 'MedPlus', contactPerson: 'Rahul Verma', phone: '+91 9000011111', email: 'contact@medplus.demo', address: 'Industrial Area, Bhopal', suppliedMedicines: 12, status: 'Active' },
  { id: 'SUP-002', name: 'Apollo Pharmacy', contactPerson: 'Vikram Singh', phone: '+91 9000022222', email: 'supply@apollo.demo', address: 'MP Nagar, Bhopal', suppliedMedicines: 8, status: 'Active' },
];

export const initialPayments = [
  { id: 'TXN-9001', orderId: 'ORD-1024', patientName: 'Arjun Sharma', amount: 500, date: 'May 20, 2026', method: 'UPI', status: 'Completed' },
  { id: 'TXN-9002', orderId: 'ORD-1023', patientName: 'Ritika Sharma', amount: 600, date: 'May 20, 2026', method: 'Card', status: 'Completed' },
];

export const initialAppointments = [
  { id: 'APT-3001', patientId: 'PAT-1001', doctorName: 'Dr. Neha Kapoor', hospital: 'CityCare Hospital', date: 'May 20, 2026', time: '10:00 AM', department: 'Cardiology', status: 'Confirmed' },
];

export const initialReminders = [
  { id: 'REM-1', patientId: 'PAT-1001', medicineName: 'Paracetamol 500mg', dosage: '1 tablet', time: '08:00 AM', frequency: 'Once daily', active: true },
];

export const initialNotifications = [
  { id: 'NOT-1', title: 'New prescription uploaded', message: 'Ritika Sharma uploaded a new prescription', type: 'prescription', read: false, createdAt: 'May 20, 2026 09:50 AM' },
  { id: 'NOT-2', title: 'Order dispatched', message: 'Order ORD-1023 dispatched by supplier', type: 'order', read: true, createdAt: 'May 20, 2026 11:20 AM' },
];
