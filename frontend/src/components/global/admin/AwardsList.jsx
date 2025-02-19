import {
  Github,
  Linkedin,
  Twitter,
  Trash2,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
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

export default function AwardsList({ awards }) {
  const { isDeletingAward, deleteAward } = useAdminStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {awards.length === 0 ? (
          <TableCell>
            <p>No awards found</p>
          </TableCell>
        ) : (
          awards.map((award) => (
            <TableRow key={award._id}>
              <TableCell className="text-nowrap">{award.title}</TableCell>
              <TableCell className="min-w-52">{award.description}</TableCell>
              <TableCell className="min-w-44">
                {award.link || "No link provided"}
              </TableCell>
              <TableCell className="min-w-44">
                {new Date(award.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => deleteAward(award._id)}
                  disabled={isDeletingAward}
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
