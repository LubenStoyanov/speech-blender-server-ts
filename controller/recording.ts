import { Request, Response } from "express";

export const createRecording = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};

export const getRecordings = async (req: Request, res: Response) => {
  try {
    const data;
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};
