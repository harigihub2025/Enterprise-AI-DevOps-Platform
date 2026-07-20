package enterprise_ai_devops.controller;

import enterprise_ai_devops.model.Project;
import enterprise_ai_devops.service.ProjectServices;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/project")

@CrossOrigin(origins = "*")

public class HomeController {

    @Autowired

    private ProjectServices projectServices;

    /* ==========================================
                Get All Projects
    ========================================== */

    @GetMapping

    public ResponseEntity<List<Project>> getAllProjects() {

        List<Project> projects = projectServices.getAllProjects();

        return ResponseEntity.ok(projects);

    }

    /* ==========================================
                Get Project By ID
    ========================================== */

    @GetMapping("/{id}")

    public ResponseEntity<Project> getProjectById(

            @PathVariable Long id) {

        Project project = projectServices.getProjectById(id);

        return ResponseEntity.ok(project);

    }

    /* ==========================================
                Create Project
    ========================================== */

    @PostMapping

    public ResponseEntity<Project> addProject(

            @Valid

            @RequestBody

            Project project) {

        Project savedProject =

                projectServices.saveProject(project);

        return new ResponseEntity<>(

                savedProject,

                HttpStatus.CREATED);

    }

    /* ==========================================
                Update Project
    ========================================== */

    @PutMapping("/{id}")

    public ResponseEntity<Project> updateProject(

            @PathVariable Long id,

            @Valid

            @RequestBody Project project) {

        Project updatedProject =

                projectServices.updateProject(id, project);

        return ResponseEntity.ok(updatedProject);

    }

    /* ==========================================
                Delete Project
    ========================================== */

    @DeleteMapping("/{id}")

    public ResponseEntity<String> deleteProject(

            @PathVariable Long id) {

        projectServices.deleteProject(id);

        return ResponseEntity.ok(

                "Project Deleted Successfully."

        );

    }

}

