import type {APIRoute} from "astro";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {app} from "../../../firebase/client.ts";
import {getApp} from "firebase-admin/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const POST: APIRoute = async ({request, redirect}) => {
    const formData = await request.formData();
    const file: any = formData.get("file");


    if (!file) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }

    try {
        // Get a reference to the storage service, which is used to create references in your storage bucket

        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
                console.log('uid', uid);
            } else {
                // User is signed out
                // ...
                console.log('log out')
            }
        });

        const storage = getStorage(app);

        // Create a storage reference from our storage service
        const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);

        // 'file' comes from the Blob or File API
        const upload = await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
            return snapshot
        });

        return Response.json({
            success: true,
            result: 'Data from Astro Endpoint!'
        })
    } catch (error) {
        console.log('error', error)
        return new Response("Something went wrong", {
            status: 500,
        });
    }

};