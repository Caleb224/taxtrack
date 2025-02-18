import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image, Button
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions, takePictureAsync} from 'expo-camera';

const categories = [
  { id: 1, name: 'Food & Drinks', icon: 'fast-food' },
  { id: 2, name: 'Shopping', icon: 'cart' },
  { id: 3, name: 'Housing', icon: 'home' },
  { id: 4, name: 'Entertainment', icon: 'film' },
  { id: 5, name: 'Transport', icon: 'car' },
  { id: 6, name: 'Healthcare', icon: 'medical' },
  { id: 7, name: 'Education', icon: 'school' },
  { id: 8, name: 'Other', icon: 'ellipsis-horizontal' },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showCamera, setShowCamera] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>();


  const handleSave = () => {
    // TODO: Save expense to Supabase
    router.back();
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  if (showCamera && permission?.granted) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} autofocus={"on"}>
          <View style={styles.cameraControls}>
            <Pressable 
              style={styles.cameraButton} 
              onPress={() => setShowCamera(false)}>
              <Ionicons name="close" size={32} color="#fff" />
            </Pressable>
            <Pressable
              style={styles.cameraButton}
              onPress={() => cameraRef.current?.takePictureAsync()}>
              <Ionicons name="camera" size={32} color="#fff" />
            </Pressable>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.closeButton} 
          onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#1f2937" />
        </Pressable>
        <Text style={styles.title}>Add Expense</Text>
        <Pressable 
          style={styles.saveButton} 
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.form}>
        <View style={styles.amountSection}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory.id === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}>
                <View style={styles.categoryIcon}>
                  <Ionicons 
                    name={category.icon}
                    size={24} 
                    color={selectedCategory.id === category.id ? '#5f12b1' : '#6366f1'}
                  />
                </View>
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory.id === category.id && styles.selectedCategoryText,
                  ]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.sectionTitle}>Note</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            multiline
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Receipt</Text>
          {receipt ? (
            <View style={styles.receiptPreview}>
              <Image 
                source={{ uri: receipt }} 
                style={styles.receiptImage} 
                resizeMode="cover"
              />
              <Pressable 
                style={styles.removeReceipt}
                onPress={() => setReceipt(null)}>
                <Ionicons name="trash" size={24} color="#ef4444" />
              </Pressable>
            </View>
          ) : (
            <Pressable 
              style={styles.scanButton}
              onPress={() => setShowCamera(true)}>
              <Ionicons name="camera" size={24} color="#6366f1" />
              <Text style={styles.scanButtonText}>
                {scanning ? 'Scanning...' : 'Scan Receipt'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  form: {
    padding: 16,
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  currency: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    color: '#1f2937',
  },
  categories: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    opacity: 0.7,
  },
  selectedCategory: {
    opacity: 1,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#5f12b1',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  noteSection: {
    marginBottom: 24,
  },
  noteInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1f2937',
  },
  receiptSection: {
    marginBottom: 24,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
  },
  scanButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#6366f1',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptPreview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  receiptImage: {
    width: '100%',
    height: 200,
  },
  removeReceipt: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});