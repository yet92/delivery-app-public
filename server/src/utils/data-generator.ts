import { Shop } from "@prisma/client";
import { Database } from "../database";

const prisma = Database.get();

export const generateShops = async () => {

    const kfcLocation = await prisma.location.create({
        data: {
            address: "Square of Defenders of Ukraine, 7/8, Kharkiv, Kharkiv Oblast, 61000"
        }
    });

    const kfc = await prisma.shop.create({
        data: {
            name: "KFC",
            logo: "https://play-lh.googleusercontent.com/s7slUGiae9bq7XuYur0GWd_qDp_UXgo_5BIpzOT_BvKGg17TYG5QDr3ckqPcpq20jVU",
            locationId: kfcLocation.id
        },
    });

    const mcdonaldsLocation = await prisma.location.create({
        data: {
            address: "Pushkins'ka St, 37, Kharkiv, Kharkiv Oblast, 61057"
        }
    });

    const mcdonalds = await prisma.shop.create({
        data: {
            name: "McDonald's",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/2560px-McDonald%27s_logo.svg.png",
            locationId: mcdonaldsLocation.id
        },
    });

    const bufetLocation = await prisma.location.create({
        data: {
            address: "Liubovi Maloj Ave, 24, Kharkiv, Kharkiv Oblast, 61000"
        }
    })

    const bufet = await prisma.shop.create({
        data: {
            name: "Bufet ",
            logo: "https://bufet.ua/wp-content/uploads/2019/11/bufet.jpg",
            locationId: bufetLocation.id
        },
    });

    return [kfc, mcdonalds, bufet];
};

export const generateProducts = async (shops: Shop[]) => {
    const pictures = [
        "https://bufet.ua/wp-content/uploads/2023/03/myaso_product_new.jpg",
        "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWNkb25hbGRzfGVufDB8fDB8fHww&w=1000&q=80",
    ];

    const getPicture = () => {
        return pictures[Math.floor(Math.random() * 2)];
    };

    const promises = shops.map((shop) => {
        const promises = [0, 1, 2].map((index) => {
            return prisma.product.create({
                data: {
                    shopId: shop.id,
                    name: `Product ${index} of ${shop.name}`,
                    price: (index + 1) * 1000,
                    picture: getPicture(),
                },
            });
        });

        return Promise.all(promises);
    });

    await Promise.all(promises);
};

export const generate = async () => {
    const shops = await generateShops();
    await generateProducts(shops);
};

const clear = async () => {
    await prisma.shop.deleteMany();

    await prisma.product.deleteMany();
};

export const tryGenerate = async () => {
    const mode = process.env.GENERATE_MODE;

    if (mode === undefined) return;

    if (mode === "IF_NOT_EXISTS") {
        const shopsCount = await prisma.shop.count();
        if (shopsCount === 0) {
            await generate();
        }
    }

    if (mode === "REGENERATE") {
        await clear();
        await generate();
    }
};
