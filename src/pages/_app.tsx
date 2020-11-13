// import '../styles/globals.css'
import '@theme/normalize.css'
import { FC } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { GlobalStyles } from '@theme/globalStyles'
import { ThemeProvider } from 'styled-components'
import { wrapper } from '@redux/store'
import theme from '@theme/index'

const WrapperComponent = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const store: any = useStore()

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  )
}

const VideoApp = (props: AppProps) => (
  <WrapperComponent>
    <MyApp {...props} />
  </WrapperComponent>
)

export default wrapper.withRedux(VideoApp)
