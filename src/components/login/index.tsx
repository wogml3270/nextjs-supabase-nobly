"use client";

import { useState } from "react";

import { supabase } from "@/libs/supabase";

interface DataType {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const [formData, setFormData] = useState<DataType>({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "someone@email.com",
        password: "IVlwpOPeauhRcpjSvGqG",
      });

      if (data) console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((i) => ({
      ...i,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <label>EMAIL</label>
        <input type="email" name="email" value={formData?.email} onChange={handleChange} />
      </div>
      <div>
        <label>PASSWORD</label>
        <input type="password" name="password" value={formData?.password} onChange={handleChange} />
      </div>
      <button type="button" onClick={login}>
        submit
      </button>
    </>
  );
};
export default LoginComponent;
