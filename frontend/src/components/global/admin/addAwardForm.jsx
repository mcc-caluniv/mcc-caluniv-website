import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminStore } from "@/store/useAdminStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddAwardForm() {
  const { addAward } = useAdminStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await addAward(data);
    reset();
  };

  return (
    <ScrollArea className="h-96">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 container">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter award title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter award description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="link">Link [Optional]</Label>
          <Input type="url" id="link" {...register("link")} />
          {errors.link && (
            <p className="text-red-500 text-sm">{errors.link.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Adding..." : "Add Award"}
        </Button>
      </form>
    </ScrollArea>
  );
}
