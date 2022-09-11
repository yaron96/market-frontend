import { ReactNode } from 'react'
import { queryClient } from 'shared/lib/query'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

interface Props{
  children?: ReactNode,
}

export const WithQueryClient: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
    </QueryClientProvider>
  )
}