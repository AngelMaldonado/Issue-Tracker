import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: { id: string }
}

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) return notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className='gap-3' my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.status}</Text>
      </Flex>
      <Card>
        <p>{issue.createdAt.toDateString()}</p>
      </Card>
    </div>
  )
}
