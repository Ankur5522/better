import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface ToastProps {
    message: string;
    duration?: number;
    type?: 'success' | 'error';
    setMessage: (value: { message: string; type: 'success' | 'error' } | null) => void;
}

const Toast: React.FC<ToastProps> = ({ message, setMessage, type, duration = 3000 }) => {
    const [showToast, setShowToast] = useState(false);
    const translateY = useSharedValue(-100);

    useEffect(() => {
        if (message) {
            setShowToast(true);
            translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) });

            const timer = setTimeout(() => {
                translateY.value = withTiming(-100, { duration: 500, easing: Easing.in(Easing.ease) });
                setTimeout(() => {
                    setShowToast(false);
                    setMessage(null);
                }, 500);
            }, duration);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message, duration, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    if (!showToast) return null;

    return (
        <Animated.View style={[styles.toast, animatedStyle, { backgroundColor: type === 'success' ? '#4caf50' : '#f44336' }]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: '#c9c8c7',
        padding: 15,
        borderRadius: 10,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Toast;
