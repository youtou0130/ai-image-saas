import ImageGenerator from "@/components/dashboard/tools/image-generator";
import BackgroundRemover from "@/components/dashboard/tools/background-remover";
// import RemoveBg from "@/components/dashboard/tools/remove-bg";
// import Optimize from "@/components/dashboard/tools/optimize";

export const tools = {
    "image-generator": {
        name: "画像生成",
        description: "AIを使用してお好みの画像を生成",
        component: ImageGenerator,
    },
    "remove-bg": {
        name: "背景削除",
        description: "画像から背景を自動で削除",
        component: BackgroundRemover,

    },
    "optimize": {
        name: "画像圧縮",
        description: "画像を最適化してサイズを縮小",
		component: ImageGenerator,
    },
};

export type ToolType = keyof typeof tools;
