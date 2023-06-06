import { Database } from "../../database";

const prisma = Database.get();

export const getAll = async () => {
    // TODO: add paginator
    const shops = await prisma.shop.findMany({
        include: {
            location: true,
        },
    });

    return { shops };
};

export const getOne = async (id: string) => {
    const shop = await prisma.shop.findFirst({
        where: {
            id,
        },
        include: {
            location: true,
        },
    });
    return { shop };
};
