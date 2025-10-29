import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Login from './Login';

export default function App(){
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Login />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});