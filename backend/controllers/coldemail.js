import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request.js";
import { CustomAPIError } from "../errors/custom-api.js";
import agenda from "../utils/agenda.js";
import Coldemail from "../models/Coldemail.js";

export const coldemail = async (req, res) => {
  const { to, subject, text, delay, nodes, edges } = req.body;
  const userId = req.user.userId;
  // console.log({ to, subject, text, delay, nodes, edges });
  if (!to || !subject || !text || !delay) {
    throw new BadRequestError("Required all the fields");
  }

  try {
    const schedule = await agenda.schedule(
      `in ${delay}`,
      "schedule-coldemail",
      {
        to,
        subject,
        text,
        userId,
        nodes,
        edges,
      }
    );
    const emailPersist = await Coldemail.create({
      userId,
      to,
      subject,
      text,
      nodes,
      edges,
      delay,
    });
    // console.log("persist", emailPersist);
    res.status(StatusCodes.CREATED).json({
      msg: "coldemail schedulded successfully",
      emailId: emailPersist._id,
    });
  } catch (error) {
    throw new CustomAPIError(
      "error scheduling email",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getColdemail = async (req, res) => {
  try {
    const userId = req.user.userId;
    const emails = await Coldemail.find({ userId });

    res
      .status(StatusCodes.OK)
      .json({ msg: "successfully get the scheduled", emails });
  } catch (error) {
    console.log("Error in getCOoldmail route", error);
    throw new CustomAPIError(
      "Error in getCOoldmail route",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
