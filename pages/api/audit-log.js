// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const filters = (param, paramValue, data) => data[param] == paramValue;


const startDateFilter = (startDate, data) => {
  const date = new Date(data.creationTimestamp.split(' ')[0]) || {};
  return date.getTime() >= startDate.getTime();
}

const endDateFilter = (endDate, data) => {
  const date = new Date(data.creationTimestamp.split(' ')[0]) || {};
  return date.getTime() <= endDate.getTime();
}

const dateRangeFilter = (startDate, endDate, data) => {
  const date = new Date(data.creationTimestamp.split(' ')[0]) || {};
  return (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime());
}

export default async function handler(req, res) {
    const {
      pageNumber = 0,
      pageSize = 10,
      applicationType,
      actionType,
      startDate,
      endDate,
      userId
    } = req.query
    const callApi = await fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
    const datatables = await callApi.json();
    // pagination
    const start = Number(pageSize) * Number(pageNumber);
    const end = start + Number(pageSize);
    let totalRecords = datatables.result.auditLog.length;
    let data = datatables.result.auditLog.slice(start, end);
    // filter
    if (!!applicationType) {
      data = data.filter(filters.bind(this, 'applicationType', applicationType));
      totalRecords = data.length
    }
    if (!!actionType) {
      data = data.filter(filters.bind(this, 'actionType', actionType));
      totalRecords = data.length
    }
    if (!!userId) {
      data = data.filter(filters.bind(this, 'userId', userId));
      totalRecords = data.length
    }
    if (!!startDate && !!endDate) {
      data = data.filter(dateRangeFilter.bind(this, new Date(startDate), new Date(endDate)));
      totalRecords = data.length
    }
    if (!!startDate) {
      data = data.filter(startDateFilter.bind(this, new Date(startDate)));
      totalRecords = data.length
    }
    if (!!endDate) {
      data = data.filter(endDateFilter.bind(this, new Date(endDate)));
      totalRecords = data.length
    }

    const result = {
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      totalRecords,
      pageCount: totalRecords,
      data,
    }
    
    res.status(200).json(result)
  }
  