import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { useCreateRoom } from '@/http/use-create-room';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Minimum of 3 characteres.' }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const navigate = useNavigate();
  const { mutateAsync: createRoom } = useCreateRoom();
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({
      name,
      description,
    });
    createRoomForm.reset();
    navigate('room-list');
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Room</CardTitle>
        <CardDescription>
          Create a new room to start your own Q&A live session and use A.I. to
          help you answer questions about topic already discussed inside the
          room previously.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Room name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Type room name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Room description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Create room</Button>
          </form>
        </Form>
      </CardContent>
      <Separator className="mt-4" />
      <CardFooter className="flex flex-col">
        <p className="text-muted-foreground text-xs">or enter in a room</p>
        <div className="mt-4 w-full">
          <Link to="/room-list">
            <Button className="w-full" variant="outline">
              Go to room list
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
