import React, { useState, useRef } from 'react';
import {View, StyleSheet, Text, Button, TextInput, ScrollView } from 'react-native';
import List from './src/List';

const App = () => {
    const [value, setValue] = useState("");
    const [todo, setTodo] = useState(List);
    const listViewRef = useRef({});
    const addTodo = () =>{
        let now = new Date();
        setTodo([...todo, {id: `todo${now}`, text: value, date: now, selected: false}]);
    }
    const listSelected = (e) =>{
        e.selected = !e.selected;
        listViewRef.current[e.id].style.textDecorationLine = e.selected? 'line-through': 'none';
    }
    return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={{fontSize:80, padding: 10}}>9th week</Text>
            <Text style={styles.title}>할 일</Text>
            <TextInput style={styles.textInput} onChangeText={e=>setValue(e)} />
        </View>
        <View style={styles.wrapper}>
            <Button title='submit' onPress={()=>addTodo()} />
        </View>
        <View style={{ width: '100%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={styles.title}>List</Text>
        </View>
        <ScrollView style={styles.listView} >
            {todo.map((e)=>(
                <View style={styles.listItem} key={e.id} onPress={()=>{listSelected(e)}} onClick={()=>{listSelected(e)}} >
                {e.selected ?(
                    <Text style={styles.listItemTextSelected} selected={e.selected} ref={ref=>(listViewRef.current[e.id]=ref)}>{e.text}</Text>
                ):(
                    <Text style={styles.listItemText} selected={e.selected} ref={ref=>(listViewRef.current[e.id]=ref)}>{e.text}</Text>
                )}
                </View>
            ))}
        </ScrollView>
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
    wrapper:{
        marginTop: 20,
        width: '100%',
    },
    textInput:{
        fontSize: 18,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
    listView: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }, 
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 3,
    },
    listItemText: {
        fontSize: 25,
    },
    listItemTextSelected: {
        fontSize: 25,
        textDecorationLine: 'line-through',
    },
});

export default App;