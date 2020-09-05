import * as React from 'react'
import { StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor='#121212' barStyle='light-content' />
        <WebView
          source={{ uri: 'https://teamavo.github.io/Cafeteria/' }}
          // To avoid 403 disallowed useragent
          userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
        />
      </>
    )
  }
}
