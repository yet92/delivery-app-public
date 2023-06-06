import { RequestHandler } from "express";
import * as service from "./service";

export const getAll: RequestHandler = async (req, res) => {
    // validate req
    // get shops id

    const shopId = req.query.shopId as string;

    const { products } = await service.getAll({ shopId });
    res.json({ products });

};
