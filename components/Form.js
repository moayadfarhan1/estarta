import stylesForm from '../styles/Form.module.css'
import { useRouter } from 'next/router';
import { useState } from 'react';

const FormComponent = () => {

  const router = useRouter();
  const [fitler, setFilter] = useState({});
  const updateFilter = (key, value) => {
    setFilter({
      ...fitler,
      [key]: value
    })
  };

  const applyFilter = () => {
    router.query = fitler;
    router.push(router);
  }

  const applyClearFilter=()=>{
    router.query = '';
    const form = document.getElementById('form-search');
    form.reset();

    router.push(router);
  }

  return (
    <form className={stylesForm.form} id="form-search">
      <div className={stylesForm.formContainer}>
        <div>
          <label>Employee Name</label>
          <input name="userId" onChange={(e) => updateFilter('userId', e.target.value)} />
        </div>
        <div>
          <label>Action type</label>
          <select defaultValue={0} onChange={(e) => updateFilter('actionType', e.target.value)}>
            <option value={0} disabled>choose</option>
            <option value={'DARI_REFRESH_TOKEN'}>DARI_REFRESH_TOKEN</option>
            <option value={'SUBMIT_APPLICATION'}>SUBMIT_APPLICATION</option>
            <option value={'INITIATE_APPLICATION'}>INITIATE_APPLICATION</option>
            <option value={'ADD_COMPANY'}>ADD_COMPANY</option>
          </select>
        </div>
        <div>
          <label>Application type</label>
          <select defaultValue={0} onChange={(e) => updateFilter('applicationType', e.target.value)}>
            <option value={0} disabled>choose</option>
            <option value={'ADD_COMPANY_EMPLOYEE'}>ADD_COMPANY_EMPLOYEE</option>
            <option value={'CERT_TITLE_DEED_PLOT'}>CERT_TITLE_DEED_PLOT</option>
            <option value={'ADD_POA'}>ADD_POA</option>
            <option value={'LEASE_REGISTRATION'}>LEASE_REGISTRATION</option>
            <option value={'CERT_PROP_OWNERSHIP'}>CERT_PROP_OWNERSHIP</option>
          </select>
        </div>
        <div>
          <label>From Date</label>
          <input type="date" onChange={(e) => updateFilter('startDate', e.target.value)}></input>
        </div>
        <div>
          <label>To Date</label>
          <input type="date" onChange={(e) => updateFilter('endDate', e.target.value)}></input>
        </div>
        <div>
          <label>Application Id</label>
          <input onChange={(e) => updateFilter('applicationId', e.target.value)}></input>
        </div>
        <div>
          <button type='button' onClick={() => applyFilter()} className={stylesForm.btnSubmit}>Search Logger</button>
          <button type='button' onClick={() => applyClearFilter()} className={stylesForm.btnSubmit}>clear</button>
        </div>
      </div>
    </form>
  )
}

export default FormComponent;