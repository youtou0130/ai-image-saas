"use client";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { RemoveBackgroundState } from '@/types/actions';
import { removeBackground } from '@/actions/actions';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';
import { Loader } from 'lucide-react';
import { Download } from 'lucide-react';
import LoadingSpinner from '../loading-spinner';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
const initialState: RemoveBackgroundState = {
  status: "idle",
}

const BackgroundRemover = () => {
  const { isSignedIn } = useUser();

  const [state, formAction, pending] = useActionState(removeBackground, initialState);

  const handleDownload = () => {
    if(!state.processedImage){
      toast.error("エラー", {
        description: "背景が削除されていません",
      });
      return;
    }
    try{
      const base64Data = state.processedImage?.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], { type: "image/png" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download =  `${new Date().toISOString()}-background-removed-image.png`;
      
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
              <Label htmlFor="image">ファイルをアップロード</Label>
              <Input 
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full"
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
                <Layers className="mr-2" />
                背景を削除する
                </>
              )}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">
                <Layers className="mr-2" />
                ログインして背景を削除する
              </Button>
            </SignInButton>
          ) }

        </form>
      </div>

      {/* generated images */}
      {state.processedImage && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img 
                src={state.processedImage} 
                alt="Processed Image" 
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

export default BackgroundRemover;
