"use client";

import { emailLogin } from "@/app/actions/authentication";
import FormField from "@/components/FormField";
import signInSchema from "@/validation/schemas/SignInSchema";
import {
  Box,
  Flex,
  Text,
  Heading,
  FormLabel,
  Checkbox,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

const SignInPage = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberLoggedIn: false,
  };

  const onSubmitForm = async (
    values: any,
    setSubmitting: (data: boolean) => void
  ) => {
    emailLogin(values);
  };

  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      alignItems="start"
      justifyContent="center"
      p={{ base: "25px", md: "0px" }}
      flexDirection="column"
    >
      <Box w={"100%"}>
        <Text fontSize="6xl" mb="10px" textAlign={"center"}>
          Sign In
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={"100%"}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        mb={{ base: "20px", md: "auto" }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(form, { setSubmitting }) => {
            onSubmitForm(form, setSubmitting);
          }}
          validationSchema={signInSchema}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }: any) => (
            <Form>
              <FormField
                label="Email*"
                name="email"
                type="text"
                placeholder="mail@redwood.com"
                disabled={isSubmitting}
                error={errors.email}
                touched={touched.email}
                styles={{ marginBottom: "1.5rem" }}
              />
              <FormField
                label="Password*"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                disabled={isSubmitting}
                error={errors.password}
                touched={touched.password}
                styles={{ marginBottom: "1.5rem" }}
              />
              <Flex alignItems={"center"} mb="1.5rem">
                <Checkbox
                  id="rememberLoggedIn"
                  name="rememberLoggedIn"
                  disabled={isSubmitting}
                  defaultChecked={values.rememberLoggedIn}
                  onChange={(e) =>
                    setFieldValue("rememberLoggedIn", e.target.checked)
                  }
                  me="10px"
                />
                <FormLabel htmlFor="rememberLoggedIn" mb="0">
                  Keep me logged in
                </FormLabel>
              </Flex>
              <Button
                type="submit"
                variant="brand"
                w="100%"
                isDisabled={isSubmitting}
              >
                Sign In {isSubmitting && <Spinner ml={"4"} />}
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
