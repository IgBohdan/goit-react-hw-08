import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import FormikInput from "../FormikInput/FormikInput";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required("Required"),
    number: Yup.string().min(3).max(50).required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addContact(values)).unwrap();
      toast.success(`Contact ${values.name} added successfully`, {
        duration: 4000,
        position: "top-right",
      });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the contact", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-6 p-3 rounded-md shadow-md">
        <FormikInput
          label="Name"
          name="name"
          type="text"
          className="bg-black"
          placeholder="John Doe"
        />
        <FormikInput
          label="Number"
          name="number"
          type="text"
          placeholder="+1234567890"
        />
        <Button type="submit">Add Contact</Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
