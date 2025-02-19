import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAdminStore } from "@/store/useAdminStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddPartnerForm() {
  const { addPartner } = useAdminStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await addPartner(data);
    reset();
  };

  return (
    <ScrollArea className="h-96">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 container">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter partner name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">email</Label>
          <Input
            type="email"
            id="email"
            placeholder="mcc@example.com"
            {...register("email", { required: "email is required" })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter partner description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="link">Link [Optional]</Label>
          <Input
            id="link"
            placeholder="Enter partner link"
            {...register("link")}
          />
          {errors.link && (
            <p className="text-red-500 text-sm">{errors.link.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="image">Partner Image [Optional]</Label>
          <Input type="url" id="image" {...register("image")} />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Adding..." : "Add Partner"}
        </Button>
      </form>
    </ScrollArea>
  );
}
