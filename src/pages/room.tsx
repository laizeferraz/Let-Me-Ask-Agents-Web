import { Navigate, useParams } from 'react-router-dom';

type RoomParams = {
  roomId: string;
};
export const Room = () => {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-bold text-2xl">Room Page</h1>
    </div>
  );
};
