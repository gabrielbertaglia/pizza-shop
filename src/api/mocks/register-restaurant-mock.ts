import { http, HttpResponse } from 'msw'

import { RegisterRestaurantBody } from '../register-restaurant'

// eslint-disable-next-line prettier/prettier
export const registerRestaurant = http.post<never,RegisterRestaurantBody> (
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json()
    if (restaurantName === 'Pizza Shop') {
      return new HttpResponse(null, { status: 201 })
    }
    return new HttpResponse(null, { status: 400 })
  },
)
