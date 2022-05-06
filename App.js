import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Button, TextInput } from 'react-native';

const App = () => {
    const [num, setNum] = useState(1);  
    const [name, setName] = useState("");
    useEffect(() => {
        console.log("mount (최초 1회만)");
    },[])
    useEffect(() => {
        console.log("mount + update");
    })
    useEffect(() => {
        console.log("mount + name이 update될 때");
    }, [name])

    return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={{fontSize:80}}>9th week</Text>
            <Text style={styles.title}>count : {num}</Text>
            <Text style={styles.title}>name : {name}</Text>
            <TextInput style={styles.textInput} onChangeText={e=>setName(e)} />
        </View>
        <View style={styles.wrapper}>
            <Button title='-1' onPress={()=>{setNum(num-1)}} />
            <Button title='+1' onPress={()=>{setNum(num+1)}} />
            <Button title='2x' onPress={()=>{setNum(num*2)}} />
            <Button title='2/' onPress={()=>{setNum(num/2)}} />
            <Button title='clear' onPress={()=>{setNum(1)}} />
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
        width: `60vw`,
        alignSelf: 'center',
    },
    wrapper:{
        width: `100%`,
        marginTop: 20,
        gap: 10,
    },
    textInput:{
        width: `100%`,
        height: `2rem`,
        fontSize: '2rem',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
    },
    title: {
        fontSize: 30,
    },
});

export default App;