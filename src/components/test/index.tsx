import { supabase } from "@/libs/supabase";

const TestPage = () => {
  const setNewView = async () => {
    const { data, error } = await supabase.from("views").insert({
      name: "random name",
    });

    if (data) console.log(data);
    if (error) console.log(error);
  };

  setNewView();
};

export default TestPage;
