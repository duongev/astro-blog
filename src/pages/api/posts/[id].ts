import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const postsRef = db.collection("posts");

export const POST: APIRoute = async ({ params, redirect, request }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !content) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }

    if (!params.id) {
        return new Response("Cannot find post", {
            status: 404,
        });
    }

    try {
        await postsRef.doc(params.id).update({
            title,
            content
        });
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/dashboard");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
    if (!params.id) {
        return new Response("Cannot find post", {
            status: 404,
        });
    }

    try {
        await postsRef.doc(params.id).delete();
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/dashboard");
};