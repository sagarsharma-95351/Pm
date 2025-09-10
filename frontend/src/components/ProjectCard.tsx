export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">{project.name}</h2>
      <p className="text-gray-500">{project.description}</p>
      <div className="text-xs text-gray-400 mt-2">Created: {new Date(project.created_at).toLocaleDateString()}</div>
    </div>
  );
}