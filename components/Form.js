import stylesForm from '../styles/Form.module.css'
import useStore from '../hooks/store';
import { useRouter } from 'next/router';
import { useState } from 'react';

const formComponent = () => {
  
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
  
  return (
    <form className={stylesForm.form} >
      <div className={stylesForm.formContainer}>
        <div>
          <label>Employee Name</label>
          <input name="userId" onChange={(e) => updateFilter('userId', e.target.value)} />
        </div>
        <div>
          <label>Action type</label>
          <select defaultValue={0} onChange={(e) => updateFilter('actionType', e.target.value)}>
            <option value={0} disabled>choose</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div>
          <label>Application type</label>
          <select defaultValue={0} onChange={(e) => updateFilter('applicationType', e.target.value)}>
            <option value={0} disabled>choose</option>
            <option value={1}>1</option>
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
        </div>
      </div>
    </form>
  )
}

export default formComponent;