package enterprise_ai_devops.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "projects")
public class Project {

    /* ==========================================
                Primary Key
    ========================================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ==========================================
                Project Name
    ========================================== */

    @NotBlank(message = "Project name is required")
    @Size(min = 3, max = 100,
            message = "Project name must be between 3 and 100 characters")
    @Column(nullable = false)
    private String name;

    /* ==========================================
                Description
    ========================================== */

    @NotBlank(message = "Project description is required")
    @Size(min = 5, max = 500,
            message = "Description must be between 5 and 500 characters")
    @Column(nullable = false, length = 500)
    private String description;

    /* ==========================================
                Technology
    ========================================== */

    @NotBlank(message = "Technology is required")
    @Size(min = 2, max = 100,
            message = "Technology must be between 2 and 100 characters")
    @Column(nullable = false)
    private String technology;

    /* ==========================================
                Constructors
    ========================================== */

    public Project() {
    }

    public Project(Long id,
                   String name,
                   String description,
                   String technology) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.technology = technology;

    }

    /* ==========================================
                Getters & Setters
    ========================================== */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    /* ==========================================
                toString()
    ========================================== */

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", technology='" + technology + '\'' +
                '}';
    }

}