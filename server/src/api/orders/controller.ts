import { RequestHandler } from "express";
import * as service from "./service";
import { TypedRequestBody } from "../../utils";
import { validateCreateOrder } from "./validator";


export const create: RequestHandler = async (
    req: TypedRequestBody<{
        customer: service.CustomerInfo;
        cart: service.Cart;
    }>,
    res
) => {
    // validate req

    const validationResult = validateCreateOrder(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .json({ badField: validationResult.error.message });
    }

    const {error, ...result} = await service.create(req.body);

    if (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    res.json({ ...result });
};
