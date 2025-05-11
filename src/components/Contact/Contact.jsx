import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import people from "../../assets/people.svg";
import phone from "../../assets/phone.svg";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import FormikInput from "../FormikInput/FormikInput";
const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    number: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      toast.success(`Contact ${contact.name} deleted successfully`, {
        duration: 4000,
        position: "top-right",
      });
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("An error occurred while deleting the contact", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async (values, { resetForm }) => {
    setIsEditing(true);
    try {
      await dispatch(updateContact({ id: contact.id, ...values })).unwrap();
      toast.success(`Contact ${values.name} updated successfully`, {
        duration: 4000,
        position: "top-right",
      });
      setEditOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the contact", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={people} alt="people" className="w-4 h-4" />
              <p className="text-sm">{contact.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={phone} alt="phone" className="w-4 h-4" />
              <p className="text-sm">{contact.number}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isEditing || isDeleting}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Contact</DialogTitle>
                  <DialogDescription>
                    Update the details for {contact.name}.
                  </DialogDescription>
                </DialogHeader>
                <Formik
                  initialValues={{ name: contact.name, number: contact.number }}
                  validationSchema={validationSchema}
                  onSubmit={handleEdit}
                >
                  <Form className="grid gap-4 py-4">
                    <FormikInput
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                    />
                    <FormikInput
                      label="Number"
                      name="number"
                      type="text"
                      placeholder="+1234567890"
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditOpen(false)}
                        disabled={isEditing}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isEditing}>
                        {isEditing ? "Saving..." : "Save"}
                      </Button>
                    </DialogFooter>
                  </Form>
                </Formik>
              </DialogContent>
            </Dialog>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="shadow-2xl shadow-amber-50 p-12"
                  disabled={isDeleting || isEditing}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Contact</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {contact.name}? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    variant="destructive"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contact;
