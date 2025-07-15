import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PaginationComp } from '@/components/pagination';
import { RoomList } from '@/components/room-list';
import { useRooms } from '@/http/use-rooms';

export const RoomListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: rooms = [] } = useRooms();

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [rooms]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedRooms.length / ITEMS_PER_PAGE);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  return (
    <div className="p-4">
      <header>
        <Link to="/">
          <div
            aria-label="Let me ask agents logo"
            className="h-12 w-auto bg-contain bg-start bg-no-repeat"
            role="img"
            style={{ backgroundImage: 'url(/logo.png)' }}
          />
        </Link>
      </header>
      <div className="mx-auto grid min-h-screen max-w-4xl grid-cols-1 items-center justify-center p-4">
        <RoomList
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          rooms={sortedRooms}
        />
        {totalPages > 1 && (
          <PaginationComp
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};
