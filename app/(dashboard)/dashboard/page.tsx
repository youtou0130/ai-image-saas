import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserCredits } from "@/lib/credits";
import { navItems } from "@/config/nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Image, Layers, ImageDown } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  const credits = await getUserCredits();

  return (
    <div className="space-y-10">
      {/* ヒーロー */}
      <section>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {user
            ? `こんにちは、${user.firstName ?? user.username ?? "ユーザー"}さん`
            : "ダッシュボード"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          AI画像ツールを選んで、すぐに使い始めましょう。
        </p>
      </section>

      {/* クレジット & クイックアクション */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="size-4 text-primary" />
              残りクレジット
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credits}</p>
            <p className="text-sm text-muted-foreground">クレジット</p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link href="/dashboard/plan">プランを見る</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">今すぐ使う</CardTitle>
            <CardDescription>
              左のメニューまたは下のカードからツールを選べます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {navItems
                .filter(
                  (item) =>
                    item.href !== "/dashboard" &&
                    item.href !== "/dashboard/settings" &&
                    item.icon
                )
                .map((item) => {
                  const Icon = item.icon!;
                  return (
                    <Button key={item.href} asChild variant="secondary" size="sm">
                      <Link href={item.href} className="gap-1.5">
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ツール一覧 */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="size-5 text-primary" />
          利用可能なツール
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/tools/image-generator">
            <Card className="h-full transition-colors hover:border-primary/40 hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Image className="size-4 text-primary" />
                  </span>
                  画像生成
                </CardTitle>
                <CardDescription>
                  AIでプロンプトから画像を生成します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  使ってみる
                  <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/tools/remove-bg">
            <Card className="h-full transition-colors hover:border-primary/40 hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="size-4 text-primary" />
                  </span>
                  背景削除
                </CardTitle>
                <CardDescription>
                  画像の背景を自動で削除します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  使ってみる
                  <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/tools/optimize">
            <Card className="h-full transition-colors hover:border-primary/40 hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <ImageDown className="size-4 text-primary" />
                  </span>
                  画像圧縮
                </CardTitle>
                <CardDescription>
                  画像を最適化してサイズを縮小します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  使ってみる
                  <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* アップグレード CTA */}
      <section>
        <Card className="overflow-hidden border-primary/30 bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">もっとクレジットが欲しい？</CardTitle>
              <CardDescription className="mt-1">
                有料プランで月間クレジットを増やして、使い放題に近づけましょう。
              </CardDescription>
            </div>
            <Button asChild variant="premium" size="lg" className="shrink-0">
              <Link href="/dashboard/plan">プランをアップグレード</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
