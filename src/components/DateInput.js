import { SafeAreaView, View, Image, Text, TextInput, Pressable, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useIsFocused } from '@react-navigation/native';

export default function DateInput(props) {
    const [date, setDate] = useState(new Date());
    const [dateOf, setDateOf] = useState("");
    const [showPicker, setShowPicker] = useState(false)

    const isFocused = useIsFocused();

    const label = props.label
    const descricao = props.descricao

    const labelStyle = {
        marginHorizontal: 24,
        marginTop: 8,
        color: '#007AFF'
    }

    const descricaoStyle = {
        marginHorizontal: 24,
        color: 'grey'
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const inputStyle = {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#007AFF',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: 'black'
    }

    const onChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            setDateOf(formattedDate);
        }
        toggleDatepicker();
    };

    useEffect(() => {
        // Redefina os dados do input quando a tela for focada novamente
        if (isFocused) {
            setDate(new Date());
            setDateOf('');
        }
    }, [isFocused]);

    return (
        <SafeAreaView>
            {showPicker && (
                <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    minimumDate={new Date()}
                    textColor='black'
                />
            )}

            {!showPicker && (
                <Pressable
                    onPress={toggleDatepicker}
                >
                    <Text style={labelStyle}>{label}</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='dd/mm/aaaa'
                        value={dateOf}
                        onChangeText={setDateOf}
                        editable={false}
                        placeholderTextColor="black"
                        
                    />
                    <Text style={descricaoStyle}>{descricao}</Text>
                </Pressable>
            )}


        </SafeAreaView>
    )

}