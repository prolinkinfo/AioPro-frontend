import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allusers, apipost } from '../../service/api';

export const ChemistView = () => {
  const [chemist, setChemist] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  async function fetchdata() {
    const result = await allusers(`/api/chemist/${params?.id}`);
    if (result && result?.status === 200) {
      setChemist(result?.data);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);



  console.log("chemist",chemist);

  return (
    <div>
        <h1>hello chemist</h1>
    </div>
  );
};
