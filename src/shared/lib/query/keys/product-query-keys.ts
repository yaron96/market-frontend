export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'], 
  list: (filters: Record<any, any>) => 
      [...productKeys.lists(), {...filters}],
  details: () => [...productKeys.all, 'detail'],
  detail: (id: string) => [...productKeys.details(), id],
}