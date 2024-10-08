import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Button, Alert, BackHandler} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

const App: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        // @ts-ignore
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    Alert.alert('Message from WebView', message);
    console.log('Message from WebView', message);
  };

  const sendMessageToWeb = () => {
    if (webViewRef.current) {
      console.log('Sending message to WebView');
      webViewRef.current.postMessage('Hello from React Native!');
    } else {
      console.error('WebView reference is null.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Send Message to WebView" onPress={sendMessageToWeb} />
      <WebView
        ref={webViewRef}
        source={{uri: 'http://10.0.2.2:5500'}} // Replace with your web server URL
        onMessage={handleMessage}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
        injectedJavaScript={`window.postMessage(JSON.stringify({message: "hello"}))`}
      />
    </SafeAreaView>
  );
};

export default App;
