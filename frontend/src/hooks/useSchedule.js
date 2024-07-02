import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useSchedule = () => {
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/coldemail", data, {
        withCredentials: true,
      });
      const resData = response.data;
      if (response.error) {
        throw new Error(response.error);
      }
      console.log(resData);
      toast.success(resData.msg);
    } catch (error) {
      console.log("form Submit error", error.response.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, formSubmit };
};

export default useSchedule;
