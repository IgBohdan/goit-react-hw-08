import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import FormikInput from "../FormikInput/FormikInput";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success(`Account created for ${values.email}`, {
        duration: 4000,
        position: "top-right",
      });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-24">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col gap-6">
              <FormikInput
                label="Name"
                name="name"
                type="text"
                placeholder="example"
              />
              <FormikInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <FormikInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
              <Button type="submit">Register</Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="underline underline-offset-4 hover:text-gray-700"
              >
                Login
              </NavLink>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
