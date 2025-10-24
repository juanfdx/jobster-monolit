import { Form, Link, redirect, useActionData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
//components
import { Logo, FormRow, SubmitBtn } from '../components';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  //to trim form values here
  //validate form here
  // const errors = {msg: ''};
  // if (data.password.length < 3) {
  //   errors.msg = 'password too short';
  //   return errors;
  // }
  
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Something went wrong');
    // errors.msg = error.response?.data?.msg;
    return error;
  }
}


export const Login = () => {
  //we can access errors in the action L15 using useActionData()
  // const errors = useActionData();

  //use redirect in loaders and actions, use navigate un the component
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };

    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');

    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    }
  };
  

  
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />

        <h4>Login</h4>
        {/* {errors?.msg && <p style={{color: 'red'}}>{errors.msg}</p>} */}

        <FormRow type='email' name='email' defaultValue='john@email.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />

        <SubmitBtn />

        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>

        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}