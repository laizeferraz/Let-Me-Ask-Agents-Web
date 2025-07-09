import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
}>;

export const CreateRoom = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['create-room'],
    queryFn: async () => {
      // Simulate an API call
      const response = await fetch('http://localhost:3333/rooms');
      const result: GetRoomsAPIResponse = await response.json();
      return result;
    },
  });

  return (
    <div className="flex h-screen p-4">
      {isLoading && <p>Loading...</p>}
      {data && (
        <ul className="mt-4">
          {data.map((room) => (
            <li className="mb-2" key={room.id}>
              <Link
                className="inline-block rounded-md bg-gray-200 px-4 py-2 text-zinc-950 hover:bg-gray-300"
                to={`/room/${room.id}`}
              >
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
