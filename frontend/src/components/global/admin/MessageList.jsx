import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MessageList({ messages }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date & Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.length === 0 ? (
          <TableRow>
            <TableCell>No messages</TableCell>
          </TableRow>
        ) : (
          messages.map((message) => (
            <TableRow key={message._id}>
              <TableCell className="text-nowrap">
                {message.firstName + " " + message.lastName}
              </TableCell>
              <TableCell className="min-w-52">{message.email}</TableCell>
              <TableCell className="min-w-44">{message.subject}</TableCell>
              <TableCell className="min-w-52">{message.message}</TableCell>
              <TableCell className="min-w-44">
                {new Date(message.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
