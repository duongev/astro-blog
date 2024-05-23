import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();


    if (!title || !content) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }

    try {

        const db = getFirestore(app);
        const postsRef = db.collection("posts");
        const post = await postsRef.add({
            title,
            content,
            createAt: new Date()
        });
        return redirect(`/dashboard`);
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }

};