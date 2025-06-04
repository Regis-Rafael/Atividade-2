import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideDeleteModal } from '../util/FeedbackService';
import { deleteBook as deleteBookAction } from '../util/BookService';
import { showModal } from '../util/FeedbackService';

const DeleteModal = () => {
    const dispatch = useDispatch();
    const { deleteModalVisible, bookToDelete } = useSelector(state => state.feedback);

    const handleDelete = () => {
        dispatch(deleteBookAction(bookToDelete));
        dispatch(hideDeleteModal());
        dispatch(showModal({ 
            message: 'Livro excluído com sucesso!', 
            type: 'success' 
        }));
    };

    return (
        <Modal
            transparent
            visible={deleteModalVisible}
            animationType="slide"
            onRequestClose={() => dispatch(hideDeleteModal())}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Confirmar Exclusão</Text>
                    <Text style={styles.message}>Tem certeza que deseja excluir este livro?</Text>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancelar" 
                            onPress={() => dispatch(hideDeleteModal())} 
                            color="#757575"
                        />
                        <Button 
                            title="Excluir" 
                            onPress={handleDelete} 
                            color="#F44336" 
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        fontSize: 16,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default DeleteModal;
