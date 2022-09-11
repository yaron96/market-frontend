import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from 'shared/lib/store'
import { WithQueryClient } from './WithReactQuery'
import { AuthProvider } from './AuthProvider'

interface Props{
    children?: ReactNode,
}

export const MainProvider: React.FC<Props> = ({ children }) => {
    return (
        <Provider store={store}>
            <WithQueryClient>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </WithQueryClient>
        </Provider>
    )
}