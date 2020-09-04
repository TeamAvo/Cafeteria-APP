import * as React from 'react'
import { StatusBar, Linking } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  state = {
    url: 'https://teamavo.github.io/Cafeteria/'
  }

  onNavigationStateChangeEvent(data) {
    let link = decodeURIComponent(data.url)
    console.log(link)
    if (link.indexOf('auth?redirect_uri=') != -1) {
      let url = encodeURI(link.split('auth?redirect_uri=')[1])
      //console.log('!' + url)

      // auto redirect, but it will make new sessions and reset all data
      this.setState({
        //url: url
      })
    }

    // if (link.indexOf('https://teamavo.github.io/Cafeteria/') == -1) {
    //   Linking.openURL(link).catch((er) => {
    //     console.log('Failed to open Link:', er.message)
    //   })
    // }
  }

  onShouldStartLoadWithRequest(request) {
    if (!request || !request.url) {
      return true
    }

    console.log('!' + request.url)

    // list of schemas we will allow the webview
    // to open natively
    if (
      request.url.startsWith('storagerelay:') ||
      request.url.startsWith('mailto:')
    ) {
      Linking.openURL(request.url).catch((er) => {
        console.log('Failed to open Link:', er.message)
      })
      return false
    }

    // let everything else to the webview
    return true
  }

  render() {
    // Debugging srcipt
    const debugging = `
     // Debug
     console = new Object();
     console.log = function(log) {
      window.ReactNativeWebView.postMessage(log);
     };
     console.log;
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `

    return (
      <>
        <StatusBar backgroundColor='#121212' barStyle='light-content' />
        <WebView
          source={{ uri: this.state.url }}
          // To avoid 403 disallowed useragent
          userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
          onNavigationStateChange={this.onNavigationStateChangeEvent.bind(this)}
          // Test options
          sharedCookiesEnabled={true}
          mixedContentMode='always'
          javaScriptCanOpenWindowsAutomatically={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          originWhitelist={['*', 'storagerelay']}
          thirdPartyCookiesEnabled={true}
          useWebKit={true}
          allowUniversalAccessFromFileURLs={true}
          //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          // Get console log from webview. But not working perfectly.
          injectedJavaScript={debugging}
          onMessage={console.log}
        />
      </>
    )
  }
}
