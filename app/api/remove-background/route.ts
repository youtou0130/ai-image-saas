import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";


export async function POST(request: Request) {

	const user = await currentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const formData = await request.formData();
	const imageFile = formData.get("image") as File;

	if(!imageFile){
		return NextResponse.json(
			{ error: "画像が選択されていません" },
			{ status: 400 }
		);
	}

	const bytes = await imageFile.arrayBuffer();
	const buffer = Buffer.from(bytes);

	//画像の最適化処理
	const optimizedInput = await sharp(buffer)
	.resize(1280, 720)
	.png({quality: 80, compressionLevel: 9})
	.toBuffer();

	try{
        const formData = new FormData();
		formData.append("image", optimizedInput, {
			filename: "image.png",
			contentType: "image/png",
		});
        formData.append("output_format", "png");


		const response = await axios.post(
			`https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
			formData,
			//axios.toFormData(payload, new FormData()),
			{
				validateStatus: undefined,
				responseType: "arraybuffer",
				headers: {
				Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
				Accept: "image/*"
				},
			},
		);

        if(response.status !== 200){
			throw new Error(`API Error: ${response.status}: ${response.data.toString()}`);
		}
		//画像の最適化処理
		const optimizedImage = await sharp(response.data)
		.resize(1280, 720)
		.png({quality: 80, compressionLevel: 9})
		.toBuffer();
        //Base64 encode the image
        const base64Image = optimizedImage.toString("base64");
		const imageUrl = `data:image/png;base64,${base64Image}`;

		return NextResponse.json({imageUrl});
	}catch(error){
		console.error("Remove Background Error:", error);
		return NextResponse.json(
			{ error: "Failed to remove background" },
			{ status: 500 }
		);
	}

}