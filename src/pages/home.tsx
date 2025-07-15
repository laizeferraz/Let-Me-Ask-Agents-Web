import { Link } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';

export const Home = () => {
  return (
    <div className="p-4">
      <header>
        <Link to="./">
          <div
            aria-label="Let me ask agents logo"
            className="h-12 w-auto bg-contain bg-start bg-no-repeat"
            role="img"
            style={{ backgroundImage: 'url(/logo.png)' }}
          />
        </Link>
      </header>
      <div className="mx-auto grid min-h-screen max-w-4xl grid-cols-1 items-center justify-center p-4">
        <CreateRoomForm />
      </div>
    </div>
  );
};
