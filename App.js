import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Button, Alert, Image, TextInput } from 'react-native';
import native from './native.png';



const App = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [time, setTime] = useState(new Date());
    const countUp = () =>{
        setValue(value+1);
    };
    useEffect(()=>{
        Alert.alert(
            "Count Up",
            `now count is ${value}`,
        );
        console.log(value);
    }, [value])
    useEffect(()=>{
        Alert.alert(
            "처음에는 값이 변해요",
            `now count is ${value} \nemail is ${email}\n name is ${name}`,
        );
        console.log(value, email, name);
    },[])
    setInterval(()=> setTime(new Date()), 1000);
    return (
    <View style={styles.container}>
        <View style={{flex: 3, justifyContent: 'center'}}>
            <Image style={styles.image} source={native} />
            <Text style={{fontSize:80, padding: 10}}>Count : {value}</Text>
            <Button title='click' onPress={countUp} />
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Text style={styles.defaultFont}>이메일 : {email}</Text>
            <Text style={styles.defaultFont}>이름 : {name}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
            <TextInput style={styles.defaultFont} onChangeText={v=>setEmail(v)} placeholder={'이메일을 입력하세요'} />
            <TextInput style={styles.defaultFont} onChangeText={(v)=>setName(v)} placeholder={'이름을 입력하세요'} />
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Text style={styles.defaultFont} >현재 시간 : {time.getHours()} : {time.getMinutes()} : {time.getSeconds()} {time.getHours()<12 ? 'AM' : 'PM'}</Text>
        </View>
        
    </View>
    );
};  

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '5%',
        width: '100%',
        alignSelf: 'center',
    },
    image: {
        width: 400,
        height: 200,
        resizeMode: 'contain', // 더 작은 값을 기준으로 사진의 비율을 맞춤
    },
    defaultFont: {
        fontSize: 30,
    },
});

export default App;