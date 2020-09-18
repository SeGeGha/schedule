import { URL_SWAGGER, methods, jsonType } from '../constants';

export default async function fetchSwagger(id: string, body: any) {
  let addUrl: string;
  let method: string;

  if(!id && !body) {
    addUrl = 'events';
    method = methods.get;
  } else if(!id && body) {
    addUrl = 'event';
    method = methods.post;
  } else if(id && body) {
    addUrl = `event/${id}`;
    method = methods.put;
  } else {
    addUrl = `event/${id}`;
    method = methods.del;
  }

  const url = `${URL_SWAGGER}${addUrl}`;
  let headers: {[key: string]: string};
  if(body) {
    headers = {
      Accept: jsonType,
      'Content-Type': jsonType,
    }
  } else {
    headers = { Accept: jsonType };
  }

  const option = { 
    body: body && JSON.stringify(body), 
    method, 
    headers
  };

  try {
    const res = await fetch(url, option);
    return res.json();
  } catch(e) {
    return Promise.reject(e);
  }
}
