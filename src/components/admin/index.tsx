"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

import styles from "./index.module.scss";

interface Page {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

const AdminHome: React.FC = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [page, setPage] = useState<Page[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("page").select("*");

        if (error) throw new Error(error.message);

        setPage(data);
        console.log(data);
      } catch (err) {
        console.error("Fetching data failed:", err);
      }
    };
    fetchData();
  }, []);

  const handleInsert = async () => {
    try {
      const { data, error } = await supabase
        .from("page")
        .insert([{ title: "title value", body: "body value" }])
        .select();

      if (error) throw new Error(error.message);
    } catch (err) {
      console.error("Fetching data failed:", err);
    }
  };

  return (
    <main>
      <div className={styles.supabase}>
        <h1>Supabase Test</h1>
        {page.map((item) => (
          <div key={item.id}>
            <div>Page ID: {item.id}</div>
            <div>제목: {item.title}</div>
            <div>내용: {item.body}</div>
            <div>시간: {item.created_at}</div>
          </div>
        ))}
        <button type="button" onClick={handleInsert}>
          Create
        </button>
      </div>
      <Link href="/test">going to test page</Link>
    </main>
  );
};

export default AdminHome;
