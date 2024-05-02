const projectsData = [
  { id: "1", name: "Project A", description: "Description for Project A" },
  { id: "2", name: "Project B", description: "Description for Project B" },
  { id: "3", name: "Project C", description: "Description for Project C" },
];

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Simulate fetching projects from a database or external API
    res.status(200).json(projectsData);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
