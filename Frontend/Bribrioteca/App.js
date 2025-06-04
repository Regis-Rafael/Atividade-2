import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from "./src/util/ThemeService";
import Store from './src/util/Store';
import BookList from './src/screens/BookList';
import BookDetails from './src/screens/BookDetails';
import BookForm from './src/screens/BookForm';
import FeedbackModal from './src/components/FeedbackModal';
import DeleteModal from './src/components/DeleteModal';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="BookList">
    <Stack.Screen 
      name="BookList" 
      component={BookList} 
      options={{ title: 'Lista de Livros' }} 
    />
    <Stack.Screen 
      name="BookDetails" 
      component={BookDetails} 
      options={{ title: 'Detalhes do Livro' }} 
    />
    <Stack.Screen 
      name="BookForm" 
      component={BookForm} 
      options={{ title: 'Adicionar/Editar Livro' }} 
    />
  </Stack.Navigator>
);

export default function App() {
  const { theme } = useTheme();

  return (
    <Provider store={Store}>
      <ThemeProvider>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
        <FeedbackModal />
        <DeleteModal />
      </ThemeProvider>
    </Provider>
  );
}

