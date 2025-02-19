import { Github, Linkedin, Twitter, Trash2, Globe, Instagram, Facebook } from "lucide-react";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function MembersList({ members }) {
  const { deleteMember, isDeletingMember } = useAdminStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Time-Frame</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Social Handles</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member._id}>
            <TableCell>
              <LazyLoadImage
              effect="blur"
                src={member.image}
                alt={member.name}
                width={40}
                height={40}
                className="object-cover rounded-lg"
              />
            </TableCell>
            <TableCell className="text-nowrap">{member.name}</TableCell>
            <TableCell>{member.designation}</TableCell>
            <TableCell>{member.timeframe}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.phone}</TableCell>
            <TableCell>
              {new Date(member.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex gap-x-2 items-center h-14">
              {Object.entries(member.socialHandles || {}).map(
                ([platform, link]) => {
                  const icons = {
                    linkedin: <Linkedin size={20} />,
                    github: <Github size={20} />,
                    twitter: <Twitter size={20} />,
                    facebook: <Facebook size={20} />,
                    instagram: <Instagram size={20} />,
                  };

                  return (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-[#1B2A4A] transition"
                    >
                      {icons[platform.toLowerCase()] || <Globe size={20} />}
                    </a>
                  );
                }
              )}
            </TableCell>

            <TableCell>
              <Button
                onClick={() => deleteMember(member._id)}
                variant="destructive"
                size={"icon"}
                disabled={isDeletingMember}
              >
                <Trash2 size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
