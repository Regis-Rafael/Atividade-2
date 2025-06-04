import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Switch, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from '../util/BookService';
import { showModal } from '../util/FeedbackService';

const BookForm = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const existingBook = route.params?.book;
    
    const [titulo, setTitulo] = useState(existingBook?.titulo || '');
    const [autor, setAutor] = useState(existingBook?.autor || '');
    const [anoPublicacao, setAnoPublicacao] = useState(existingBook?.anoPublicacao || '');
    const [disponivel, setDisponivel] = useState(existingBook?.disponivel ?? true);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!titulo.trim()) newErrors.titulo = 'Título é obrigatório';
        if (!autor.trim()) newErrors.autor = 'Autor é obrigatório';
        if (!anoPublicacao.trim()) newErrors.anoPublicacao = 'Ano é obrigatório';
        else if (!/^\d{4}$/.test(anoPublicacao)) newErrors.anoPublicacao = 'Ano inválido';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const bookData = {
        id: existingBook?.id || Date.now().toString(),
        titulo,
        autor,
        anoPublicacao,
        disponivel
        };

        if (existingBook) {
        dispatch(updateBook(bookData));
        dispatch(showModal({ message: 'Livro atualizado com sucesso!' }));
        } else {
        dispatch(addBook(bookData));
        dispatch(showModal({ message: 'Livro adicionado com sucesso!' }));
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={[styles.input, errors.titulo && styles.errorInput]}
            placeholder="Título do Livro"
            value={titulo}
            onChangeText={setTitulo}
        />
        {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

        <TextInput
            style={[styles.input, errors.autor && styles.errorInput]}
            placeholder="Autor"
            value={autor}
            onChangeText={setAutor}
        />
        {errors.autor && <Text style={styles.errorText}>{errors.autor}</Text>}

        <TextInput
            style={[styles.input, errors.anoPublicacao && styles.errorInput]}
            placeholder="Ano de Publicação"
            value={anoPublicacao}
            onChangeText={setAnoPublicacao}
            keyboardType="numeric"
            maxLength={4}
        />
        {errors.anoPublicacao && <Text style={styles.errorText}>{errors.anoPublicacao}</Text>}

        <View style={styles.switchContainer}>
            <Text>Disponível:</Text>
            <Switch
            value={disponivel}
            onValueChange={setDisponivel}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={disponivel ? '#f5dd4b' : '#f4f3f4'}
            />
        </View>

        <Button 
            title={existingBook ? "Atualizar Livro" : "Adicionar Livro"} 
            onPress={handleSubmit} 
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
        borderRadius: 4
    },
    errorInput: {
        borderColor: '#F44336'
    },
    errorText: {
        color: '#F44336',
        marginBottom: 8
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        gap: 8
    }
});

export default BookForm;