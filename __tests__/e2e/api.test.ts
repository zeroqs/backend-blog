// @ts-ignore
import request from "supertest";
import {app} from "../../index.js";
import mongoose from "mongoose";
import Post from "../../models/Post";

const userPayload = {
    email: 'test@mail.ru',
    password: "test123",
    fullName: 'Test Test'
}
const postPayload = {
    title: "test jest",
    text: "tesdasdt jedasst"

}
const {fullName, ...userPayloadWithOutName} = userPayload
beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONN);
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({ fullName: 'Test Test' });
        await collection.deleteMany({ title: 'test jest' });
    }
    await mongoose.connection.close();
});

describe("GET /", () => {
    it("should return main route", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /sign-up", () => {
    it("sign-up and save in db success", async () => {
        const res = await request(app).post("/sign-up").send(userPayload);

        const result = await request(app).get("/users");
        const test = result.body.users.find(item => item._id === res.body._id)
        expect(test).toBeDefined()
        expect(res.statusCode).toBe(200);

    });


});

describe("POST /log-in", () => {
    it("should return is log-in user", async () => {
        const res = await request(app).post("/log-in").send(userPayloadWithOutName);
        expect(res.statusCode).toBe(200);


    });
});

describe("POST /posts", () => {

    it("should return post created", async () => {
        const res = await request(app).post("/log-in").send(userPayloadWithOutName);
        expect(res.statusCode).toBe(200);
        const post = await request(app).post("/posts").set("authorization", `Bearer ${res._body.token}`).send(postPayload);
        expect(post.statusCode).toBe(200);
        const allPosts = await request(app).get("/posts");
        const foundPost = allPosts.body.find(item => item._id === post.body._id)
        expect(foundPost).toBeDefined()


    });

});


describe("GET /posts", () => {
    it("should return all posts", async () => {
        const res = await request(app).get("/posts");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});



