package enterprise_ai_devops.repository;

import enterprise_ai_devops.model.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /* ==========================================
            Custom Query Methods
    ========================================== */

    List<Project> findByTechnologyContainingIgnoreCase(String technology);

    List<Project> findByNameContainingIgnoreCase(String name);

    List<Project> findByDescriptionContainingIgnoreCase(String description);

}