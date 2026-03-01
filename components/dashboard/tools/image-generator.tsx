"use client";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { GenerateImageState } from '@/types/actions';
import { generateImage } from '@/actions/actions';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import { Loader } from 'lucide-react';
import { Download } from 'lucide-react';
import LoadingSpinner from '../loading-spinner';
import { toast } from 'sonner';
import { SignInButton, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const initialState: GenerateImageState = {
  status: "idle",
}

const ImageGenerator = () => {

  const { isSignedIn } = useUser();
  // if(!isSignedIn){
  //   redirect("/sign-in");
  // }

  const [state, formAction, pending] = useActionState(generateImage, initialState);

  const handleDownload = () => {
    if(!state.imageUrl){
      toast.error("エラー", {
        description: "画像が生成されていません",
      });
      return;
    }
    try{
      const base64Data = state.imageUrl?.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], { type: "image/png" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download =  `${state.keyword}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("画像をダウンロードしました", {
        description: "画像のダウンロードに成功しました",
      });


    }catch(error){
      console.error("Download Error:", error);
      toast.error("エラー", {
        description: "画像のダウンロードに失敗しました",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="keyword">キーワード</Label>
              <Input 
                id="keyword"
                name="keyword"
                placeholder="例: キャラクター, 背景, シーン, アクション, コスチューム, 表情, 髪型, 髪飾り, 髪色, 瞳色, 肌色, 服, 靴, アクセサリー, バッグ, 備考"
                required
                />
          </div>
          {/* submit button */}
          {isSignedIn ? (
              <Button
              type="submit"
              disabled={pending}
              className={cn("w-full duration-200", pending && "bg-primary/80")}
            >
              {pending ? (<LoadingSpinner />):(
                <>
                <ImageIcon className="mr-2" />
                画像を生成する
                </>
              )}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">
                <ImageIcon className="mr-2" />
                ログインして画像を生成する
              </Button>
            </SignInButton>
          ) }

        </form>
      </div>

      {/* generated images */}
      {state.imageUrl && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img 
                src={state.imageUrl} 
                alt="Generated Image" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={handleDownload}
            >
            <Download className="mr-2" />
            画像をダウンロード
          </Button>
        </div>
      )}
    </div>
  )
};

export default ImageGenerator;
