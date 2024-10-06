import React, {useRef, useEffect} from 'react';
import {View, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebViewComponent = () => {
  const webViewRef = useRef(null);

  // Function to send a message to the WebView
  const sendMessageToWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage('Hello from React Native!');
    }
  };

  // Handle messages received from the WebView
  const onMessage = (event: {nativeEvent: {data: any}}) => {
    const messageFromWebView = event.nativeEvent.data;
    console.log('Message from WebView:', messageFromWebView);
    // Handle the message here (update state, call a function, etc.)
  };

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage('Initial message from WebView');
      `);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button title="Send Message to WebView" onPress={sendMessageToWebView} />
      <WebView
        ref={webViewRef}
        source={{uri: 'https://react-native-webview-poc-web1.vercel.app/'}}
        onMessage={onMessage}
      />
    </View>
  );
};

export default MyWebViewComponent;
