'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearchParams } from 'next/navigation'

interface AssistantPaginationProps {
  hasNextPage: boolean
  totalPages?: number
}

const AssistantPagination = ({
  hasNextPage = true,
  totalPages,
}: AssistantPaginationProps) => {
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const perPage = searchParams.get('perPage') ?? '6'

  const showLastPage =
    totalPages &&
    totalPages !== 1 &&
    totalPages !== Number(page) &&
    totalPages !== Number(page) + 1

  return (
    <Pagination>
      <PaginationContent>
        {page !== '1' && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${Number(page) - 1}&perPage=${perPage}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`?page=${Number(page) - 1}&perPage=${perPage}`}
              >
                {Number(page) - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {hasNextPage && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`?page=${Number(page) + 1}&perPage=${perPage}`}
              >
                {Number(page) + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {showLastPage && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${totalPages}&perPage=${perPage}`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href={`?page=${Number(page) + 1}&perPage=${perPage}`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default AssistantPagination
