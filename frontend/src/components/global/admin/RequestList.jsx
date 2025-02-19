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

export default function RequestsList({ requests }) {
  const { approveRequest, denyRequest, isApproving, isDenying } =
    useAdminStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell>No request found</TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="text-nowrap">{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell className="min-w-52">
                {new Date(request.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {request.isVerified ? (
                  <Badge>Verified</Badge>
                ) : (
                  <Badge variant={"destructive"}>Pending</Badge>
                )}
              </TableCell>
              <TableCell className="min-w-52">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => approveRequest(request._id)}
                  disabled={isApproving || isDenying}
                  className="mr-2"
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => denyRequest(request._id)}
                  disabled={isApproving || isDenying}
                >
                  Deny
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
