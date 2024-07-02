import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useScheduleEmail = () => {
  const [loading, setLoading] = useState(false);
  const [mailData, setMailData] = useState([]);

  useEffect(() => {
    const getScheduledMail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/coldemail/get`, {
          withCredentials: true,
        });
        const data = response.data;
        if (response.error) {
          throw new Error(response.error);
        }
        setMailData(data.emails);
      } catch (error) {
        console.log("get latest recipes hook error", error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getScheduledMail();
  }, []);

  return { loading, mailData };
};

export default useScheduleEmail;
