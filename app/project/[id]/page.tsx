import { sanityFetch, queries } from "@/lib/sanity";
import Navigation from "@/components/Navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { notFound } from "next/navigation";

// Generate static params from Sanity
export async function generateStaticParams() {
  try {
    const projects = await sanityFetch<any[]>(queries.allProjects);

    if (!projects || projects.length === 0) {
      return []; // Return empty array if no projects
    }

    return projects.map((project) => ({
      id: project._id,
    }));
  } catch (error) {
    console.log('Failed to generate static params:', error);
    return []; // Return empty array on error
  }
}

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const project = await sanityFetch<any>(queries.projectById(id));

    // If project not found, show 404
    if (!project) {
      notFound();
    }

    return (
      <>
        <Navigation />
        <ProjectDetailClient project={project} id={id} />
      </>
    );
  } catch (error) {
    console.log('Failed to fetch project:', error);
    notFound();
  }
}
