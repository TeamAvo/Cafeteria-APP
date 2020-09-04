import * as React from 'react'
import { StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  state = {
    url: 'https://teamavo.github.io/Cafeteria/'
  }

  onNavigationStateChangeEvent(data) {
    console.log(data.url)
    if (data.url.indexOf('redirect_uri=') != -1) {
      let url = encodeURI(
        decodeURIComponent(data.url.split('redirect_uri=')[1])
      )
      console.log('!' + url)
      this.setState({
        //url: url
      })
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor='#121212' barStyle='light-content' />
        <WebView
          source={{ uri: this.state.url }}
          userAgent='Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
          onNavigationStateChange={this.onNavigationStateChangeEvent.bind(this)}
          sharedCookiesEnabled={true}
          mixedContentMode='always'
          javaScriptCanOpenWindowsAutomatically={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          originWhitelist={['*']}
        />
      </>
    )
  }
}
