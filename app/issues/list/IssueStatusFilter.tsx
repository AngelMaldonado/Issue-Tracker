"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]

export default function IssueStatusFilter() {
  const router = useRouter()
  return (
    <Select.Root onValueChange={(status) => {
      const query = `?status=${status}`
      router.push('/issues/list' + query)
    }}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || 'ALL'}>{status.label}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
