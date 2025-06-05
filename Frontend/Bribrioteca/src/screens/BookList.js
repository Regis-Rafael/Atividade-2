import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Switch,
  Button,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLivros, addLivro, editLivro, deleteLivro } from '../redux/BookSlice';
import { logout } from '../redux/authSlice';

const STORAGE_KEY = '@livros_storage';

export default function BookList({ navigation }) {
  const dispatch = useDispatch();
  const { items: livros, loading, error } = useSelector((state) => state.livros);
  const user = useSelector((state) => state.auth.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLivroId, setEditingLivroId] = useState(null);

  // State for book details modal
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState(null);

  // State for confirmation modals
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }

    const loadFromStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const livrosStorage = JSON.parse(jsonValue);
          dispatch({ type: 'livros/fetchAll/fulfilled', payload: livrosStorage });
        }
      } catch (e) {
        console.log('Erro ao carregar livros do AsyncStorage:', e);
      }
      dispatch(fetchLivros());
    };

    loadFromStorage();
  }, [user]);

  useEffect(() => {
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(livros));
      } catch (e) {
        console.log('Erro ao salvar livros no AsyncStorage:', e);
      }
    };

    if (livros.length > 0) {
      saveToStorage();
    }
  }, [livros]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  const handleAddLivro = () => {
    if (!titulo || !autor || !anoPublicacao) return;

    dispatch(addLivro({ titulo, autor, anoPublicacao, disponivel }))
      .unwrap()
      .then(() => {
        resetForm();
        setModalVisible(false);
        setSuccessMessage('Livro adicionado com sucesso!');
        setSuccessModalVisible(true);
      })
      .catch((err) => console.log('Erro ao adicionar livro:', err));
  };

  const openEditModal = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAnoPublicacao(String(livro.anoPublicacao));
    setDisponivel(livro.disponivel);
    setEditingLivroId(livro._id);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleEditLivro = () => {
    if (!titulo || !autor || !anoPublicacao) return;

    dispatch(editLivro({ id: editingLivroId, titulo, autor, anoPublicacao, disponivel }))
      .unwrap()
      .then(() => {
        resetForm();
        setModalVisible(false);
        setIsEditing(false);
        setEditingLivroId(null);
        setSuccessMessage('Livro atualizado com sucesso!');
        setSuccessModalVisible(true);
      })
      .catch((err) => console.log('Erro ao editar livro:', err));
  };

  const handleDeleteLivro = (id) => {
    dispatch(deleteLivro(id))
      .unwrap()
      .then(() => {
        setSuccessMessage('Livro apagado com sucesso!');
        setSuccessModalVisible(true);
      })
      .catch((err) => console.log('Erro ao apagar livro:', err));
  };

  const resetForm = () => {
    setTitulo('');
    setAutor('');
    setAnoPublicacao('');
    setDisponivel(true);
  };

  const openDetailsModal = (livro) => {
    setSelectedLivro(livro);
    setDetailsModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => dispatch(fetchLivros())}>
          <Text style={styles.link}>Tentar Novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Livros</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setIsEditing(false);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Adicionar Livro</Text>
      </TouchableOpacity>

      <FlatList
        data={livros}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.livroCard}
            onPress={() => openDetailsModal(item)}
          >
            <Text style={styles.livroTitulo}>{item.titulo}</Text>
            <Text style={styles.livroAutor}>{item.autor}</Text>
            <Text style={styles.livroDisponivel}>Ano: {item.anoPublicacao}</Text>
            <Text style={styles.livroDisponivel}>
              Disponível: {item.disponivel ? 'Sim' : 'Não'}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteLivro(item._id)}
              >
                <Text style={styles.actionText}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Nenhum livro encontrado.</Text>
          </View>
        )}
        contentContainerStyle={livros.length === 0 && styles.containerCentered}
      />

      {/* Edit/Add Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditing ? 'Editar Livro' : 'Novo Livro'}</Text>

            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={styles.input}
              placeholderTextColor="#A78BFA"
            />

            <TextInput
              placeholder="Autor"
              value={autor}
              onChangeText={setAutor}
              style={styles.input}
              placeholderTextColor="#A78BFA"
            />

            <TextInput
              placeholder="Ano de Publicação"
              value={anoPublicacao}
              onChangeText={setAnoPublicacao}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#A78BFA"
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Disponível</Text>
              <Switch
                value={disponivel}
                onValueChange={setDisponivel}
                trackColor={{ false: '#6B7280', true: '#8B5CF6' }}
                thumbColor={disponivel ? '#D8B4FE' : '#9CA3AF'}
              />
            </View>

            <View style={styles.buttonRow}>
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="#6B7280"
              />
              <View style={{ width: 10 }} />
              <Button
                title={isEditing ? 'Atualizar' : 'Salvar'}
                onPress={isEditing ? handleEditLivro : handleAddLivro}
                color="#8B5CF6"
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Livro</Text>
            {selectedLivro && (
              <>
                <Text style={styles.detailText}>Título: {selectedLivro.titulo}</Text>
                <Text style={styles.detailText}>Autor: {selectedLivro.autor}</Text>
                <Text style={styles.detailText}>Ano: {selectedLivro.anoPublicacao}</Text>
                <Text style={styles.detailText}>
                  Disponível: {selectedLivro.disponivel ? 'Sim' : 'Não'}
                </Text>
              </>
            )}
            <View style={styles.buttonRow}>
              <Button
                title="Fechar"
                onPress={() => setDetailsModalVisible(false)}
                color="#6B7280"
              />
              <View style={{ width: 10 }} />
              <Button
                title="Editar"
                onPress={() => {
                  setDetailsModalVisible(false);
                  openEditModal(selectedLivro);
                }}
                color="#8B5CF6"
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Success Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <Text style={styles.modalTitle}>{successMessage}</Text>
            <Button
              title="OK"
              onPress={() => setSuccessModalVisible(false)}
              color="#8B5CF6"
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A', // Deep black background
  },
  containerCentered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#2D1B4E', // Dark purple header
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D8B4FE', // Light purple for text
    fontFamily: 'Roboto',
  },
  logout: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F87171', // Red for logout
    padding: 8,
  },
  addButton: {
    backgroundColor: '#8B5CF6', // Vibrant purple
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  livroCard: {
    backgroundColor: '#2D1B4E', // Dark purple card
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  livroTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D8B4FE',
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  livroAutor: {
    fontSize: 16,
    color: '#A78BFA', // Lighter purple
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  livroDisponivel: {
    fontSize: 14,
    color: '#EDE9FE', // Very light purple
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#6D28D9', // Deep purple for edit
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#F87171', // Red for delete
    shellowColor: '#F87171',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  separator: {
    height: 12,
  },
  errorText: {
    color: '#F87171',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  emptyText: {
    color: '#A78BFA',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  link: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#2D1B4E', // Dark purple modal
    borderRadius: 16,
    padding: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  successModalContent: {
    backgroundColor: '#2D1B4E', // Dark purple for success modal
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D8B4FE',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6D28D9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: '#FFFFFF',
    backgroundColor: '#3C2F5F',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#D8B4FE',
    fontFamily: 'Roboto',
  },
  detailText: {
    fontSize: 16,
    color: '#EDE9FE',
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
});