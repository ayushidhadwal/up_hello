import React, { useCallback, useEffect, useState } from 'react';
import NetInfo, {
    NetInfoState,
    useNetInfo,
} from '@react-native-community/netinfo';
import { Button, VStack, Modal, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';



export const NetInfoCheck = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const netInfo = useNetInfo();

    const setInternetStatus = useCallback((info: NetInfoState) => {
        const isConnected = info.isInternetReachable && info.isConnected;

        if (typeof isConnected === 'boolean') {
            setModalVisible(!isConnected);
        }
    }, []);

    useEffect(() => {
        setInternetStatus(netInfo);
    }, [netInfo, setInternetStatus]);

    const refresh = () => NetInfo.refresh().then(setInternetStatus);

    return (
        <Modal size="full" _backdrop={{
            bg: "black"
        }} isOpen={modalVisible} safeAreaBottom>
            <Modal.Content style={styles.modelContent} rounded={0} >
                <Modal.Header >
                    <Text color={'black'} fontSize="xl" textAlign="center" fontWeight="bold">
                        Network Offline!
                    </Text>
                </Modal.Header>
                <Modal.Body >
                    <VStack space={2} mb={10} alignItems="center">
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../../assets/images/logo.png')}
                        />

                        <Text color={'black'} textAlign="center" fontSize="md">
                            It seems there is something wrong with your internet connection.
                            Please connect to the internet and start UpHello again.
                        </Text>
                    </VStack>

                    <Button onPress={refresh} colorScheme="red">
                        Try Again!
                    </Button>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modelContent: {
        marginBottom: 0,
        marginTop: 'auto',
    },
});
