import { sanityFetch, queries, Project } from "@/lib/sanity";
import ArchiveClient from "./ArchiveClient";

export default async function ArchivePage() {
  let projects: Project[] = [];

  try {
    const sanityProjects = await sanityFetch<Project[]>(queries.allProjects);
    if (sanityProjects && sanityProjects.length > 0) {
      projects = sanityProjects;
    }
  } catch (error) {
    console.log('Failed to fetch projects from Sanity:', error);
  }

  return <ArchiveClient projects={projects} />;
}
