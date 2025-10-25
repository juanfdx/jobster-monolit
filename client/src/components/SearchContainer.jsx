import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';



export const SearchContainer = ({ searchParams }) => {

  const { search, jobStatus, jobType, sort } = searchParams
  const submit = useSubmit();

  //now after last keystroke we make the request
  const debounce = (onChange) => {
    let timeout;

    return (e) => {
      const form = e.currentTarget.form; //get the form element from the event 'e'
      clearTimeout(timeout);
      timeout = setTimeout(() => { onChange(form); }, 800);
    };
  };


  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow 
            type='search' 
            name='search' 
            defaultValue={search} 
            onChange={debounce((form) => { submit(form); })} 
          />

          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)} 
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)} 
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)} 
          />
          {/* it resets bc we don't send query params in this Link */}
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>

          {/* TEMP!!!! */}
          {/* <SubmitBtn formBtn /> */}
          
        </div>
      </Form>
    </Wrapper>
  )
}

/* 
* Note: default behavior from Form in react router dom is to send a GET request by url  
*/