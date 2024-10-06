// import React, {useRef} from 'react';
// import {SafeAreaView, Button, Alert} from 'react-native';
// import {WebView} from 'react-native-webview';

// const App = () => {
//   const webviewRef = useRef(null);

//   // Function to handle messages from the WebView
//   const handleMessage = event => {
//     const message = event.nativeEvent.data;
//     Alert.alert('Message from WebView', message);
//     console.log('Message from WebView', message);
//   };

//   // Function to send message to the WebView
//   const sendMessageToWeb = () => {
//     webviewRef.current.postMessage('Hello from React Native!');
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Button title="Send Message to WebView" onPress={sendMessageToWeb} />
//       <WebView
//         ref={webviewRef}
//         source={{uri: 'http://10.0.2.2:5173'}} // Change to your web server URL
//         onMessage={handleMessage}
//       />
//     </SafeAreaView>
//   );
// };

// export default App;

// App.tsx
import React, {useRef} from 'react';
import {SafeAreaView, Button, Alert} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

const App: React.FC = () => {
  const webviewRef = useRef<WebView>(null);

  // Handle messages from the WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    Alert.alert('Message from WebView', message);
    console.log('Message from WebView', message);
  };

  // Send a message to the WebView
  const sendMessageToWeb = () => {
    if (webviewRef.current) {
      console.log('Sending message to WebView');
      webviewRef.current.postMessage('Hello from React Native!');
    } else {
      console.error('WebView reference is null.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Send Message to WebView" onPress={sendMessageToWeb} />
      <WebView
        ref={webviewRef}
        source={{uri: 'http://10.0.2.2:5173'}} // Change to your web server URL
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
};

export default App;
