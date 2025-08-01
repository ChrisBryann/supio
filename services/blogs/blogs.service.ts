import { BlogPatchBody, BlogPostBody } from "@/app/api/blogs/route";
import { db, storage } from "@/firebase.config";
import { Blog } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  StorageError,
  StorageErrorCode,
  updateMetadata,
  uploadString,
} from "firebase/storage";

export const getBlogById = async (blog_id: string): Promise<Blog | null> => {
  try {
    const snapshot = await getDoc(doc(db, "blogs", blog_id));
    return snapshot.exists()
      ? ({
          ...(snapshot.data() as Blog),
          id: snapshot.id,
        } as Blog)
      : null;
  } catch (err: any) {
    throw err;
  }
};

export const getBlogs = async (doc_limit?: number): Promise<Blog[]> => {
  try {
    const q = doc_limit
      ? query(collection(db, "blogs"), limit(doc_limit))
      : query(collection(db, "blogs"));
    const querySnapshot = await getDocs(q);
    let blogs: Blog[] = [];
    querySnapshot.forEach((snapshot) => {
      const data = snapshot.data();
      blogs.push({
        ...(data as Blog),
        id: snapshot.id,
      });
    });
    return blogs;
  } catch (err) {
    throw err;
  }
};

export const addBlog = async ({ content_images, ...blog }: BlogPostBody) : Promise<Blog> => {
  // create new firebase storage refs for each image added to editor and upload them individually to each refs
  //1. get a temprorary document ID from firestore
  const updatedTime = new Date().toISOString();
  const blogDocRef = doc(collection(db, "blogs"));

  // 2. create the Firebase storage ref folder
  const contentImageFolderRef = ref(storage, `blogs/${blogDocRef.id}`);
  try {
    await Promise.all(
      content_images.map(async (img) => {
        const imageRef = ref(contentImageFolderRef, img.name);
        await uploadString(imageRef, img.url, "data_url", {
          customMetadata: {
            status: "active",
            updated_at: updatedTime,
          },
        });
      })
    );

    // 3. create the blog document in Firestore
    await setDoc(blogDocRef, blog);
  } catch (err) {
    // delete all files in the Firebase storage ref folder
    const contentImages = await listAll(contentImageFolderRef);
    await Promise.all(
      contentImages.items.map(async (imageRef) => {
        await deleteObject(imageRef);
      })
    );
  }
  // return the added document
  const snapshot = await getDoc(doc(db, "blogs", blogDocRef.id));
  return {
    ...(snapshot.data()),
    id: snapshot.id
  } as Blog
};

export const updateBlog = async ({
  content_images,
  ...blog
}: BlogPatchBody) : Promise<Blog>=> {
  // When user submits form, delete all images in firebase storage that are not in firebase storage folder. Then, upload new images that are added in content_images
  const updatedTime = new Date().toISOString();
  // 1. get the Firebase storage ref folder
  const contentImageFolderRef = ref(storage, `blogs/${blog.id}`);
  try {
    // 2. delete any content images there that was deleted in rich editor
    const contentImages = await listAll(contentImageFolderRef);
    await Promise.all(
      contentImages.items.map(async (imageRef) => {
        if (!content_images.find((img) => img.name === imageRef.name)) {
          // instead of deleting immediately, set metadata status to 'deleted' and have a firebase function run a cleanup job
          await updateMetadata(imageRef, {
            customMetadata: {
              status: "deleted",
              updated_at: updatedTime,
            },
          });
          // await deleteObject(imageRef);
        }
      })
    );
    // 3. add new content images to the ref folder
    await Promise.all(
      content_images.map(async (img) => {
        const imageRef = ref(contentImageFolderRef, img.name);
        try {
          // check to see if file exists
          await getDownloadURL(imageRef);
        } catch (err) {
          const error = err as StorageError;
          if (error.code === StorageErrorCode.OBJECT_NOT_FOUND) {
            // this means that we can add this image to the storage
            await uploadString(imageRef, img.url, "data_url", {
              customMetadata: {
                status: "active",
                updated_at: updatedTime,
              },
            });
          }
        }
      })
    );

    // 4. update the document
    await updateDoc(doc(db, "blogs", blog.id), blog);
  } catch (err) {
    console.error('updateBlog - Error updating image and document of Blog:', err);
    // if image files are already 'deleted', then reactivate it
    const contentImages = await listAll(contentImageFolderRef);
    contentImages.items.map(async (imageRef) => {
      const metadata = await getMetadata(imageRef);
      if (metadata.customMetadata)
        if (
          metadata.customMetadata.status === "deleted" &&
          metadata.customMetadata.updated_at === updatedTime
        ) {
          // this means that it was recently deleted in this same function
          // time to recover the file
          await updateMetadata(imageRef, {
            customMetadata: {
              status: "active",
            },
          });
        }
    });
  }
  // return the updated document
  const snapshot = await getDoc(doc(db, "blogs", blog.id));
  return {
    ...(snapshot.data()),
    id: snapshot.id
  } as Blog
};

// export const getContentImageUrlsById = async (
//   id: string
// ): Promise<EditorContentImage[]> => {
//   // get all content image URLs from the blog entry ID
//   const contentImageFolderRef = await ref(storage, `blogs/${id}`);
//   try {
//     const contentImages = await listAll(contentImageFolderRef);
//     const contentImageUrls: EditorContentImage[] = await Promise.all(
//       contentImages.items.map(async (imageRef) => ({
//         name: imageRef.name,
//         url: await getDownloadURL(imageRef),
//         is_added: false, // it is not newly to editor because this image exist already in content
//       }))
//     );

//     return contentImageUrls;
//   } catch (err) {
//     console.error("getContentImageUrlsById - Error:", err);
//     return [];
//   }
// };
