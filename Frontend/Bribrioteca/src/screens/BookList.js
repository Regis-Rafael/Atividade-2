import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadBooks } from '../util/BookService';
import { showDeleteModal } from '../util/FeedbackService';
import BookItem from '../components/BookItem';

const BookList = ({ navigation }) => {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.books);
    const [filterAvailable, setFilterAvailable] = useState(false);

    useEffect(() => {
        dispatch(loadBooks());
    }, [dispatch]);

    const filteredBooks = filterAvailable 
        ? items.filter(book => book.disponivel) 
        : items;

    const handleDelete = (bookId) => {
        dispatch(showDeleteModal(bookId));
    };

    if (status === 'loading') {
        return (
        <View style={styles.container}>
            <Text>Carregando livros...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BookForm')}
            >
                <Text style={styles.buttonText}>Adicionar Livro</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setFilterAvailable(!filterAvailable)}
            >
                <Text style={styles.buttonText}>
                    Mostrar {filterAvailable ? 'Todos' : 'Disponíveis'}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={filteredBooks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <BookItem 
                        book={item} 
                        onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                ListEmptyComponent={<Text>Nenhum livro encontrado</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        marginVertical: 8,
        borderRadius: 4
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default BookList;

