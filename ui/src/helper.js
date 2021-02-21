
const isDebug = process.env.VUE_APP_ENV == "development";

export const server = {
    baseURL: isDebug ? 'http://localhost:3000' : ""
}
