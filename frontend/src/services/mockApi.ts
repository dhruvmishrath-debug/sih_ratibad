import * as initialData from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = (key: string, initial: any) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockApi = {
  getMedicines: async () => {
    await delay(300);
    return getStorage('medicines', initialData.initialMedicines);
  },
  addMedicine: async (medicine: any) => {
    await delay(300);
    const medicines = getStorage('medicines', initialData.initialMedicines);
    const newMedicine = { ...medicine, id: `MED-00${medicines.length + 1}` };
    medicines.push(newMedicine);
    setStorage('medicines', medicines);
    return newMedicine;
  },
  updateMedicine: async (id: string, updates: any) => {
    await delay(300);
    const medicines = getStorage('medicines', initialData.initialMedicines);
    const index = medicines.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      medicines[index] = { ...medicines[index], ...updates };
      setStorage('medicines', medicines);
    }
    return medicines[index];
  },
  deleteMedicine: async (id: string) => {
    await delay(300);
    let medicines = getStorage('medicines', initialData.initialMedicines);
    medicines = medicines.filter((m: any) => m.id !== id);
    setStorage('medicines', medicines);
    return true;
  },

  getPatients: async () => {
    await delay(300);
    return getStorage('patients', initialData.initialPatients);
  },
  updatePatient: async (id: string, updates: any) => {
    await delay(300);
    const patients = getStorage('patients', initialData.initialPatients);
    const index = patients.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updates };
      setStorage('patients', patients);
    }
    return patients[index];
  },

  getOrders: async () => {
    await delay(300);
    return getStorage('orders', initialData.initialOrders);
  },
  updateOrderStatus: async (id: string, status: string) => {
    await delay(300);
    const orders = getStorage('orders', initialData.initialOrders);
    const index = orders.findIndex((o: any) => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      setStorage('orders', orders);
    }
    return orders[index];
  },

  getPrescriptions: async () => {
    await delay(300);
    return getStorage('prescriptions', initialData.initialPrescriptions);
  },
  updatePrescriptionStatus: async (id: string, status: string) => {
    await delay(300);
    const prescriptions = getStorage('prescriptions', initialData.initialPrescriptions);
    const index = prescriptions.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      prescriptions[index].status = status;
      setStorage('prescriptions', prescriptions);
    }
    return prescriptions[index];
  },

  getSuppliers: async () => {
    await delay(300);
    return getStorage('suppliers', initialData.initialSuppliers);
  },
  getPayments: async () => {
    await delay(300);
    return getStorage('payments', initialData.initialPayments);
  },
  
  getAppointments: async () => {
    await delay(300);
    return getStorage('appointments', initialData.initialAppointments);
  },
  
  getReminders: async () => {
    await delay(300);
    return getStorage('reminders', initialData.initialReminders);
  },
  addReminder: async (reminder: any) => {
    await delay(300);
    const reminders = getStorage('reminders', initialData.initialReminders);
    const newReminder = { ...reminder, id: `REM-${Date.now()}` };
    reminders.push(newReminder);
    setStorage('reminders', reminders);
    return newReminder;
  },
  updateReminder: async (id: string, updates: any) => {
    await delay(300);
    const reminders = getStorage('reminders', initialData.initialReminders);
    const index = reminders.findIndex((r: any) => r.id === id);
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...updates };
      setStorage('reminders', reminders);
    }
    return reminders[index];
  },
  deleteReminder: async (id: string) => {
    await delay(300);
    let reminders = getStorage('reminders', initialData.initialReminders);
    reminders = reminders.filter((r: any) => r.id !== id);
    setStorage('reminders', reminders);
    return true;
  },

  getNotifications: async () => {
    await delay(300);
    return getStorage('notifications', initialData.initialNotifications);
  },
  markNotificationAsRead: async (id: string) => {
    await delay(300);
    const notifications = getStorage('notifications', initialData.initialNotifications);
    const index = notifications.findIndex((n: any) => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      setStorage('notifications', notifications);
    }
    return notifications[index];
  }
};
