import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Pill, Activity, ScanLine, ShoppingCart, PackageOpen, Settings, Bell, LogOut, Package, AlertCircle, History, ChevronRight, Search, FileText } from 'lucide-react-native';

export default function PharmacyPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  const renderInventory = () => (
    <>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Items</Text>
          <Text style={styles.statValue}>1,452</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Low Stock</Text>
          <Text style={[styles.statValue, { color: '#EF4444' }]}>24</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Expiring</Text>
          <Text style={[styles.statValue, { color: '#F59E0B' }]}>8</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search inventory..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Inventory List</Text>
      {[
        { name: 'Amoxicillin 500mg', batch: 'BT-8892', stock: 450, status: 'In Stock', expiry: 'Oct 2026' },
        { name: 'Paracetamol 650mg', batch: 'BT-1029', stock: 24, status: 'Low Stock', expiry: 'Jan 2027' },
        { name: 'Metformin 500mg', batch: 'BT-3321', stock: 8, status: 'Critical', expiry: 'Nov 2026' },
        { name: 'Azithromycin 250mg', batch: 'BT-4411', stock: 120, status: 'In Stock', expiry: 'May 2027' },
      ].map((item, idx) => (
        <View key={idx} style={styles.inventoryCard}>
          <View style={styles.invHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.invName}>{item.name}</Text>
              <Text style={styles.invBatch}>Batch: {item.batch}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.status === 'In Stock' ? '#ECFDF5' : item.status === 'Low Stock' ? '#FEF3C7' : '#FEE2E2' }]}>
              <Text style={[styles.badgeTxt, { color: item.status === 'In Stock' ? '#10B981' : item.status === 'Low Stock' ? '#D97706' : '#EF4444' }]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.invFooter}>
            <Text style={styles.invStock}>Stock: <Text style={{ fontWeight: '700', color: '#1E293B' }}>{item.stock}</Text> units</Text>
            <Text style={styles.invExpiry}>Exp: {item.expiry}</Text>
          </View>
        </View>
      ))}
    </>
  );

  const renderDispense = () => (
    <>
      <View style={styles.scanActionBox}>
        <View style={styles.scanCircle}>
          <ScanLine size={40} color="#8B5CF6" />
        </View>
        <Text style={styles.scanTitle}>Scan Prescription</Text>
        <Text style={styles.scanDesc}>Scan the patient's digital or physical prescription to automatically prepare medicines.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => Alert.alert('Camera Opened', 'Ready to scan QR or barcode.')}>
          <Text style={styles.primaryBtnTxt}>Open Camera Scanner</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
      {[
        { patient: 'Arjun Sharma', id: 'RX-8821', time: '10 mins ago', status: 'Ready' },
        { patient: 'Neha Kapoor', id: 'RX-9923', time: '1 hour ago', status: 'Dispensed' },
      ].map((rx, idx) => (
        <TouchableOpacity key={idx} style={styles.rxCard} onPress={() => Alert.alert(rx.id, `Patient: ${rx.patient}\nStatus: ${rx.status}`)}>
          <View style={[styles.rxIconBox, { backgroundColor: rx.status === 'Ready' ? '#F5F3FF' : '#F1F5F9' }]}>
            <FileText size={20} color={rx.status === 'Ready' ? '#8B5CF6' : '#64748B'} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rxPatient}>{rx.patient}</Text>
            <Text style={styles.rxId}>{rx.id} • {rx.time}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: rx.status === 'Ready' ? '#F5F3FF' : '#F8FAFC', borderColor: rx.status === 'Ready' ? '#DDD6FE' : '#E2E8F0', borderWidth: 1 }]}>
            <Text style={[styles.badgeTxt, { color: rx.status === 'Ready' ? '#8B5CF6' : '#64748B' }]}>{rx.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.logoBox, { backgroundColor: '#F5F3FF' }]}><Pill size={20} color="#8B5CF6" /></View>
          <View>
            <Text style={styles.headerTitle}>CityCare Pharmacy</Text>
            <Text style={styles.headerSub}>Inventory & Dispensing</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => Alert.alert('Alerts', 'Low stock alerts available')}><Bell size={20} color="#64748B" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.replace('/')}><LogOut size={20} color="#EF4444" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'dispense' && renderDispense()}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
        {[
          { id: 'inventory', icon: <Package size={24} color={activeTab === 'inventory' ? '#8B5CF6' : '#94A3B8'} />, label: 'Inventory' },
          { id: 'dispense', icon: <ShoppingCart size={24} color={activeTab === 'dispense' ? '#8B5CF6' : '#94A3B8'} />, label: 'Dispense' },
          { id: 'history', icon: <History size={24} color={activeTab === 'history' ? '#8B5CF6' : '#94A3B8'} />, label: 'History' },
          { id: 'settings', icon: <Settings size={24} color={activeTab === 'settings' ? '#8B5CF6' : '#94A3B8'} />, label: 'Settings' },
        ].map(tab => (
          <TouchableOpacity key={tab.id} style={styles.tabItem} onPress={() => { if(tab.id==='history' || tab.id==='settings') Alert.alert(tab.label, 'Feature coming soon'); else setActiveTab(tab.id); }}>
            {tab.icon}
            <Text style={[styles.tabLabel, activeTab === tab.id && { color: '#8B5CF6' }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  headerSub: { fontSize: 13, color: '#64748B' },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  
  content: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 16, marginTop: 8 },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#1E293B' },

  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#1E293B' },

  inventoryCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  invHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  invName: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 2 },
  invBatch: { fontSize: 12, color: '#64748B' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeTxt: { fontSize: 11, fontWeight: '600' },
  invFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  invStock: { fontSize: 13, color: '#475569' },
  invExpiry: { fontSize: 12, color: '#94A3B8' },

  scanActionBox: { backgroundColor: '#F5F3FF', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#DDD6FE' },
  scanCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 },
  scanTitle: { fontSize: 20, fontWeight: '700', color: '#4C1D95', marginBottom: 8 },
  scanDesc: { fontSize: 14, color: '#6D28D9', textAlign: 'center', marginBottom: 20, paddingHorizontal: 16 },
  primaryBtn: { backgroundColor: '#8B5CF6', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center' },
  primaryBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },

  rxCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  rxIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rxPatient: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 2 },
  rxId: { fontSize: 12, color: '#64748B' },

  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingBottom: 20, paddingTop: 12 },
  tabItem: { alignItems: 'center', gap: 4 },
  tabLabel: { fontSize: 11, fontWeight: '500', color: '#94A3B8' },
});
