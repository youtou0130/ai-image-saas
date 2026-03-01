import { tools, ToolType } from "@/config/tools";
import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";

const ToolPage = async ({ params }: { params: Promise<{ tool: string }> }) => {
  const toolType = (await params).tool as ToolType;
  const tool = tools[toolType];
  if (!tool) {
    return <div>Tool not found</div>;
  }

  const ToolComponent = tool.component;

  return (
	<PageContainer>
		<PageHeader title={tool.name} description={tool.description} />
		<div className="max-w-2xl">
			<ToolComponent />
		</div>
	</PageContainer>
  );
};

export default ToolPage;
