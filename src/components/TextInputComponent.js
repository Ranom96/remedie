import { SafeAreaView, Text, TextInput } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';


export default function TextInputComponent(props) {
    const label = props.label
    const descricao = props.descricao
    const placeholder = props.placeholder

    const [inputValue, setInputValue] = useState('');

    const labelStyle = {
        marginHorizontal: 24,
        marginTop: 16,
        color: '#007AFF'
    }

    const descricaoStyle = {
        marginHorizontal: 24,
        color: 'grey'
    }

    const inputStyle = {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#007AFF',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: 'black'
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        // Redefina o valor do input quando a tela for focada novamente
        if (isFocused) {
            setInputValue('');
        }
    }, [isFocused]);

    return (
        <SafeAreaView>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                style={inputStyle}
                placeholder={placeholder}
                placeholderTextColor="black"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
            />
            <Text style={descricaoStyle}>{descricao}</Text>
        </SafeAreaView>
    )

}