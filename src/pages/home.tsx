import { Link } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';

export const Home = () => {
  return (
    <div
      className="bg-contain bg-no-repeat p-4"
      style={{ backgroundImage: 'url(/polygon.png)' }}
    >
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
      <div className="mx-auto grid min-h-screen max-w-4xl grid-cols-1 items-center justify-center gap-4 p-4 md:grid-cols-2">
        <aside className="hidden flex-col md:flex">
          <div
            className="bg-contain bg-no-repeat p-40"
            style={{ backgroundImage: 'url(/illustration.svg)' }}
          />
          <p className="mt-10 font-bold font-secondary text-4xl text-white-200 leading-10">
            Create live Q&A rooms
          </p>
          <p className="mt-10 text-l text-white-200 leading-8">
            Answer questions in real time with AI help.
          </p>
        </aside>
        <CreateRoomForm />
      </div>
    </div>
  );
};
