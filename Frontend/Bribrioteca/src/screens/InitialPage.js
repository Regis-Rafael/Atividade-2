import React from 'react';
import { View, Text, TouchableOpacityu, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const InitialPage = () => {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const increment = () => {
        dispatch({ type: 'INCREMENT' });
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <View>
                    <TouchableOpacityu onPress={increment}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacityu>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default InitialPage;
