package enterprise_ai_devops.service;

import enterprise_ai_devops.model.Project;
import enterprise_ai_devops.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServices {

    @Autowired
    private ProjectRepository projectRepository;

    /* ==========================================
                Get All Projects
    ========================================== */

    public List<Project> getAllProjects() {

        return projectRepository.findAll();

    }

    /* ==========================================
                Get Project By ID
    ========================================== */

    public Project getProjectById(Long id) {

        return projectRepository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException("Project not found with ID : " + id));

    }

    /* ==========================================
                Save Project
    ========================================== */

    public Project saveProject(Project project) {

        return projectRepository.save(project);

    }

    /* ==========================================
                Update Project
    ========================================== */

    public Project updateProject(Long id, Project project) {

        Project existingProject = projectRepository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException("Project not found with ID : " + id));

        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setTechnology(project.getTechnology());

        return projectRepository.save(existingProject);

    }

    /* ==========================================
                Delete Project
    ========================================== */

    public void deleteProject(Long id) {

        Project existingProject = projectRepository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException("Project not found with ID : " + id));

        projectRepository.delete(existingProject);

    }

}