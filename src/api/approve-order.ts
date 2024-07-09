import { api } from '@/lib/axios'

export interface ApproveOrderParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  console.log('aqui 2')
  await api.patch(`/orders/${orderId}/approve`)
}
