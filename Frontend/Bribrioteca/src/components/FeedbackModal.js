import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../util/FeedbackService';

const FeedbackModal = () => {
    const dispatch = useDispatch();
    const { modalVisible, modalMessage, modalType } = useSelector(state => state.feedback);
    
    useEffect(() => {
        if (modalVisible) {
        const timer = setTimeout(() => {
            dispatch(hideModal());
        }, 2000);
        return () => clearTimeout(timer);
        }
    }, [modalVisible, dispatch]);

    // Cores baseadas no tipo
    const bgColor = modalType === 'success' ? '#4CAF50' : 
                    modalType === 'error' ? '#F44336' : '#2196F3';

    return (
        <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => dispatch(hideModal())}
        >
        <View style={styles.overlay}>
            <View style={[styles.modal, { backgroundColor: bgColor }]}>
            <Text style={styles.message}>{modalMessage}</Text>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 50
    },
    modal: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    message: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default FeedbackModal;