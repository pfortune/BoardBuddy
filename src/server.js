import Hapi from '@hapi/hapi';
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from 'url';
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
    console.log(result.error);
    process.exit(1);
}

async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
    });

    await server.register(Cookie);
    server.validator(Joi);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: "./views",
        layoutPath: "./views/layouts",
        helpersPath: "./views/helpers",
        partialsPath: "./views/partials",
        layout: true,
        isCached: false
    });

    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.COOKIE_NAME,
            password: process.env.COOKIE_PASSWORD,
            isSecure: false
        },
        redirectTo: "/",
        validate: accountsController.validate
    });
    server.auth.default("session");

    db.init();
    server.route(webRoutes);
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();