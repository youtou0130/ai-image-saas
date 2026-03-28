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

	const { keyword } = await request.json();
	
	try{
        // get keyword from request body
		const payload = {
			//prompt: "Lighthouse on a cliff overlooking the ocean",
			prompt: `Create Image with ${keyword}`,
			output_format: "png",
		};

        const formData = new FormData();
        formData.append("prompt", payload.prompt);
        formData.append("output_format", payload.output_format);

		const response = await axios.postForm(
			`https://api.stability.ai/v2beta/stable-image/generate/core`,
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
		console.error("Generate Image Error:", error);
		return NextResponse.json(
			{ error: "Failed to generate image" },
			{ status: 500 }
		);
	}

}