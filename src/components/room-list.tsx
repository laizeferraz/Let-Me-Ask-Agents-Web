import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GetRoomsResponse } from '@/http/types/get-rooms-response';
import { useRooms } from '@/http/use-rooms';
import { dayjs } from '@/lib/dayjs';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

interface RoomListProps {
  currentPage: number;
  itemsPerPage: number;
  rooms: GetRoomsResponse;
}

export function RoomList({ currentPage, itemsPerPage, rooms }: RoomListProps) {
  const { isLoading, error } = useRooms();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = rooms?.slice(startIndex, endIndex) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent rooms</CardTitle>
        <CardDescription>Fast access to recent rooms created.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}
        {error && (
          <p className="text-muted-foreground text-sm">
            {' '}
            An internal error has occurred. The technical staff has been
            informed to fix this. Sorry for any inconvenience.{' '}
          </p>
        )}
        {!(isLoading || error) && paginatedRooms.length === 0 && (
          <p className="py-8 text-center text-muted-foreground text-sm">
            No rooms found.
          </p>
        )}
        {paginatedRooms?.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="outline">
                    {dayjs(room.createdAt).fromNow()}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} question(s)
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm">
                Enter
                <ArrowRight className="size-3" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
