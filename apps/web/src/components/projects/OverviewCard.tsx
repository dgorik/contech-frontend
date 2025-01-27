import { useProjectOverviewStore } from '@/stores/ProjectOverview';
import type { ProjectOverview } from '@/types/ProjectOverview';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { InlineEdit } from '@ux/src';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: ProjectOverview;
}

const WorkflowCard = ({ project }: ProjectCardProps) => {
  const { updateProject, saveProject } = useProjectOverviewStore();
  const router = useRouter();
  // Update Card
  const HandleUpdate = (updates: Partial<ProjectOverview>) => {
    updateProject(project.projectId, updates);
  };

  // Duplicate Card
  const HandleDuplicate = () => {};

  // Delete Card
  const HandleDelete = () => {};

  // Handle Double Click
  const HandleDoubleClick = () => {
    console.log('Double Clicked');
    saveProject();
    router.push(`/projects/${project.projectId}`);
  };

  return (
    <Card
      className="w-full max-w-sm overflow-hidden group"
      onDoubleClick={HandleDoubleClick}
    >
      <div className="relative">
        <div className="relative aspect-video">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => HandleDuplicate()}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => HandleDelete()}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">
          <InlineEdit
            value={project.name}
            onChange={(newName) => HandleUpdate({ name: newName })}
          />
        </CardTitle>
        <CardDescription>
          <InlineEdit
            value={project.description}
            onChange={(newDescription) =>
              HandleUpdate({ description: newDescription })
            }
            multiline
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WorkflowCard;
