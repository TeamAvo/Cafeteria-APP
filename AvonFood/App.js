import * as React from 'react'
import { StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar
          backgroundColor='#121212'
          barStyle='light-content' // Here is where you change the font-color
        />
        <WebView source={{ uri: 'https://teamavo.github.io/Cafeteria/' }} />
      </>
    )
  }
}
