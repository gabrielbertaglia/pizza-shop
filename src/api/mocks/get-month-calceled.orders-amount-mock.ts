import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrderResponse } from '../get-month-canceled-orders-amount'

export const getMonthCanceledOrderMock = http.get<
  never,
  never,
  GetMonthCanceledOrderResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})
