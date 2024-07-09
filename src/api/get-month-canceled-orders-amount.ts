import { api } from '@/lib/axios'

export interface GetMonthCanceledOrderResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrderAmount() {
  const response = await api.get<GetMonthCanceledOrderResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
