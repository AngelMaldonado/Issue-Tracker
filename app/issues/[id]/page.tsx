import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

type Props = {
  params: { id: string }
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

export default async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  const issue = await fetchIssue(parseInt(params.id))

  if (!issue) return notFound()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session &&
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      }
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id))
  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: `Details for issue ${issue?.title}`,
  }
}