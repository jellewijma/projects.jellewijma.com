import { ProjectsExplorer } from "@/components/projects-explorer";
import { publicProjects } from "@/lib/projects";

export default function Home() {
  return <ProjectsExplorer publicProjects={publicProjects} />;
}
