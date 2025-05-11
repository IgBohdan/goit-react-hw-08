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
import { login } from "../../redux/auth/operations";
import FormikInput from "../FormikInput/FormikInput";
const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success(`Logged in as ${values.email}`, {
        duration: 4000,
        position: "top-right",
      });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-24">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col gap-6">
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <NavLink to="/register" className="underline underline-offset-4">
                Sign up
              </NavLink>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
