const Project = require('../models/projectModel');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.getById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create({
      name: req.body.name,
      description: req.body.description,
      owner_id: req.user.id
    });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
