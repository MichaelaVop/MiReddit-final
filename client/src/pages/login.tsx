import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
//import { useMutation } from 'urql'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from "next/link";

// interface registerProps {}


const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    
    const [, login] = useLoginMutation();
        return (
            <Wrapper variant='small'>
            <Formik
                initialValues={{ usernameOrEmail: '', password: ''}}
                onSubmit={async (values, {setErrors}) => {
                    //console.log('onsubmit values', values);
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        //console.log(router)
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
     
                        <InputField
                            name='usernameOrEmail'
                            placeholder='username or email'
                            label='Username or Email'
                        />
                        <Box mt={4}>
                        <InputField 
                            name='password'
                            placeholder='password'
                            label='Password'
                            type='password'
                        />
                        </Box>
                        <Button 
                            mt={4}
                            type='submit' 
                            isLoading={isSubmitting} 
                            colorScheme='teal' 
                        >
                            login
                        </Button>
                        <Flex mt={2}>
                            <NextLink href="/forgot-password">
                                <Link ml="auto">forgot password?</Link>
                            </NextLink>
                        </Flex>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );
};

export default withUrqlClient(createUrqlClient) (Login);