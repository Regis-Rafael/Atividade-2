import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAvailability } from '../util/BookService';
import { showModal } from '../util/FeedbackService';

const BookDetailsScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const dispatch = useDispatch();
    const book = useSelector(state => 
        state.books.items.find(book => book.id === bookId)
    );

    if (!book) {
        return (
        <View style={styles.container}>
            <Text>Livro não encontrado!</Text>
        </View>
        );
    }

    const handleToggleAvailability = () => {
        dispatch(toggleAvailability(bookId));
        dispatch(showModal({
        message: `Disponibilidade alterada para ${book.disponivel ? 'Indisponível' : 'Disponível'}`,
        type: 'info'
        }));
    };

    const handleEdit = () => {
        navigation.navigate('BookForm', { book });
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{book.titulo}</Text>
        <Text style={styles.detail}>Autor: {book.autor}</Text>
        <Text style={styles.detail}>Ano: {book.anoPublicacao}</Text>
        <Text style={styles.detail}>
            Disponível: {book.disponivel ? 'Sim' : 'Não'}
        </Text>

        <View style={styles.buttonGroup}>
            <Button 
            title={book.disponivel ? 'Marcar como Indisponível' : 'Marcar como Disponível'} 
            onPress={handleToggleAvailability}
            color="#FF9800"
            />
            
            <Button 
            title="Editar Livro" 
            onPress={handleEdit} 
            color="#2196F3"
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    detail: {
        fontSize: 18,
        marginBottom: 8
    },
    buttonGroup: {
        marginTop: 20,
        gap: 10
    }
});

export default BookDetailsScreen;