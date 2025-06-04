import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BookItem = ({ book, onPress, onDelete }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{book.titulo}</Text>
            <Text style={styles.author}>{book.autor} ({book.anoPublicacao})</Text>
            <Text style={book.disponivel ? styles.available : styles.unavailable}>
            {book.disponivel ? 'Disponível' : 'Indisponível'}
            </Text>
        </View>
        
        <TouchableOpacity onPress={() => onDelete(book.id)} style={styles.deleteButton}>
            <MaterialIcons name="delete" size={24} color="#F44336" />
        </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff'
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    author: {
        fontSize: 14,
        color: '#666'
    },
    available: {
        color: '#4CAF50',
        fontWeight: 'bold'
    },
    unavailable: {
        color: '#F44336',
        fontWeight: 'bold'
    },
    deleteButton: {
        padding: 8
    }
});

export default BookItem;