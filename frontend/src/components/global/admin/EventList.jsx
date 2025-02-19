import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/useAdminStore";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function EventsList({ events }) {
  const { deleteEvent, isDeletingEvent, updateEventStatus } = useAdminStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Poster</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length === 0 ? (
          <TableRow>
            <TableCell>
              <p>No events found</p>
            </TableCell>
          </TableRow>
        ) : (
          events.map((event) => (
            <TableRow key={event._id}>
              <TableCell className="min-w-20">
                <LazyLoadImage
                  effect="blur"
                  src={event.image}
                  alt={event.name}
                  className="object-cover rounded-lg h-16 w-20"
                />
              </TableCell>
              <TableCell className="min-w-52">{event.name}</TableCell>
              <TableCell className="min-w-52">{event.description}</TableCell>
              <TableCell className="min-w-52">
                {new Date(event.dateTime).toLocaleString()}
              </TableCell>
              <TableCell className="min-w-52">{event.location}</TableCell>
              <TableCell>
                {event.status ? (
                  <Badge variant={"outline"}>Active</Badge>
                ) : (
                  <Badge variant={"destructive"}>Closed</Badge>
                )}
              </TableCell>
              <TableCell className="space-y-2">
                <Button
                  variant={event.status ? "destructive" : "outline"}
                  size="sm"
                  onClick={() =>
                    updateEventStatus(event._id, event.status ? false : true)
                  }
                >
                  {event.status ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  onClick={() => deleteEvent(event._id)}
                  variant="destructive"
                  size={"sm"}
                  disabled={isDeletingEvent}
                >
                  Delete
                  <Trash2 size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
