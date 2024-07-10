import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '../get-mount-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    receipt: 30000,
    diffFromLastMonth: 10,
  })
})
