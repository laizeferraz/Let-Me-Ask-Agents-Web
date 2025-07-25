import { ArrowLeft, Radio } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { QuestionsList } from '@/components/questions-list';
import { Button } from '@/components/ui/button';
import { QuestionForm } from '../components/question-form';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div
      className="min-h-screen bg-contain bg-zinc-950 bg-no-repeat p-4"
      style={{ backgroundImage: 'url(/polygon.png)' }}
    >
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
      <div className="container mx-auto mt-40 max-w-4xl px-4">
        <div className="mb-8">
          <div className="mb-10 flex items-center justify-between">
            <Link to="/room-list">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Go back
              </Button>
            </Link>
            <Link to={`/room/${params.roomId}/audio`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Record audio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Room questions
          </h1>
          <p className="text-muted-foreground">
            Ask questions and receive reponses from A.I.
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={params.roomId} />
        </div>
        <QuestionsList roomId={params.roomId} />
      </div>
    </div>
  );
}
