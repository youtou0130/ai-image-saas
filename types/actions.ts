export type GenerateImageState = {
	imageUrl?: string;
	keyword?: string;
    status: "idle"  | "success" | "error";
    error?: string;
};
export type RemoveBackgroundState = {
	originalImage?: string;
	processedImage?: string;
    status: "idle"  | "success" | "error";
    error?: string;
};

export type StripeState = {
	status: "idle" | "success" | "error";
	error?: string;
	redirectUrl?: string;
};
