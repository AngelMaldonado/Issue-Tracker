import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) return notFound()

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box>
        <div>
          <Heading>{issue.title}</Heading>
          <Flex className='gap-3' my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose' mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </div>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}
