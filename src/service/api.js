/* eslint-disable dot-notation */
/* eslint-disable consistent-return */

import axios from 'axios';
import { toast } from 'react-toastify';
import { constant } from '../constant';

export const apiget = async (path) => {
  console.log(path,"path")
  try {
    // eslint-disable-next-line prefer-const
    let response = await axios.get(constant.baseUrl + path, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    // eslint-disable-next-line dot-notation
    if (response.data.token && response.data.token !== null) {
      // eslint-disable-next-line dot-notation
      localStorage.setItem('token', response.data.token);
    }
    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      }
    }
  }
};

export const resetpassword = async (path, data) => {
  try {
    const response = await axios({
      url: constant.baseUrl + path,
      method: 'POST',
      data,
    });
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      }
    }
  }
};

export const apipost = async (path, data) => {
  try {
    const response = await axios.post(constant.baseUrl + path, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response?.data?.token);
    }

    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    console.log('errorresponse', error);
    if (error && error.response) {
      if (error && error.response.data && error.response.status === 400) {
        if (error.response.data) {
          return error?.response?.data;
          // toast.error(error.response.data.message);
        }
      }
    }
  }
};
export const adduser = async (path, data) => {
  try {
    const response = await axios.post(constant.baseUrl + path, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    console.log('errorresponse', error);
    if (error && error.response) {
      if (error && error.response.data && error.response.status === 400) {
        if (error.response.data) {
          return error?.response?.data;
          // toast.error(error.response.data.message);
        }
      }
    }
  }
};


export const apiput = async (path, data) => {
  try {
    const response = await axios.put(constant.baseUrl + path, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response.data.token);
    }
    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};

export const apidelete = async (path, data) => {
  try {
    const response = await axios.delete(`${constant.baseUrl + path}/${data}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};

export const deleteManyApi = async (path, data) => {
  try {
    const response = await axios.post(constant.baseUrl + path, data, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response?.data?.token);
    }

    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response.data && error.response.status === 401) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};

export const allusers = async (path) => {
  console.log('allusers', path);
  try {
    const response = await axios.get(constant.baseUrl + path, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response.data.token);
    }
    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      }
    }
  }
};

export const addmeeting= async (path, data) => {
  try {
    const response = await axios.post(constant.baseUrl + path, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response?.data?.token)
    }

    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;

  } catch (error) {
    if (error && error.response) {
      if (error && error.response.data && error.response.status === 401) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};




export const getmeeting = async (path) => {
  try {
    const response = await axios.get(constant.baseUrl + path, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response?.data?.token);
    }

    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response.data && error.response.status === 401) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};


export const getsingleuser = async (path, data) => {
  try {
    const response = await axios.get(`${constant.baseUrl + path}/${data}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
};


export const deletemeetingApi=async(path)=>{
   try {
    const response = await axios.delete(constant.baseUrl + path, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
}

export const apieditmeeting=async(path,data)=>{
  try {
    const response = await axios.put(constant.baseUrl + path, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response.data.token);
    }
    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }
}



export const singleuser = async (path,data) => {
  console.log('allusers', path);
  try {
    const response = await axios.get(`${constant.baseUrl + path}/${data}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.token && response.data.token !== null) {
      localStorage.setItem('token', response.data.token);
    }
    if (response && response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      }
    }
  }
};

export const deleteManymeeting=async(path,data)=>{
try {
    const response = await axios.delete(constant.baseUrl + path, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response;
  } catch (error) {
    if (error && error.response) {
      if (error && error.response && error.response.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }

}