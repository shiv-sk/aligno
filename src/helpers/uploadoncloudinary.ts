import cloudinary from "@/lib/cloudinary";

export default async function uploadToCloudinary(files: File[]){
    const uploadPromise = files.map(async (file)=>{
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve , reject)=>{
            cloudinary.uploader.upload_stream({folder:"task_files"} , (err , result)=>{
                if (err) reject(err);
                else resolve (result);
            }).end(buffer)
        })
        return result
    })
    return Promise.all(uploadPromise);
} 