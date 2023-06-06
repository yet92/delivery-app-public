import { RequestHandler } from "express";
import * as service from "./service";

export const getAll: RequestHandler = async (req, res) => {
    const { shops } = await service.getAll();
    res.json({ shops });
};

export const getOne: RequestHandler = async (req, res) => {
    const { shop } = await service.getOne(req.params.id);

    if (!shop) {
        return res.status(404).json({error: "Not found"});
    }

    res.json({shop});
}
