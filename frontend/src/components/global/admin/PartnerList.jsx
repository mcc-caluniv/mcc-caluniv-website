import { Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PartnerList({ partners }) {
  const { deletePartner, isDeletingPartner } = useAdminStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.length === 0 ? (
          <TableCell>
            <p>No partners found</p>
          </TableCell>
        ) : (
          partners.map((partner) => (
            <TableRow key={partner._id}>
              <TableCell className="text-nowrap">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="min-w-12 min-h-12 max-w-12 max-h-12"
                />
              </TableCell>
              <TableCell className="text-nowrap">{partner.name}</TableCell>
              <TableCell className="min-w-52">{partner.description}</TableCell>
              <TableCell className="min-w-44">
                {partner.link || "No link provided"}
              </TableCell>
              <TableCell className="min-w-44">
                {new Date(partner.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => deletePartner(partner._id)}
                  disabled={isDeletingPartner}
                >
                  Delete
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
