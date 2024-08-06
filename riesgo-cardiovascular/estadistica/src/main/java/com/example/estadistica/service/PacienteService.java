package com.example.estadistica.service;

import com.example.estadistica.model.Paciente;
import com.example.estadistica.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.ArrayList;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    public List<Paciente> filterPacientes(Paciente filtros) {
        // Solo aplicar la consulta si hay al menos un filtro
        return pacienteRepository.findAll((Root<Paciente> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Añadir filtros solo si no son nulos
            if (filtros.getProblemasCardiovasculares() != null) {
                predicates.add(cb.equal(root.get("problemasCardiovasculares"), filtros.getProblemasCardiovasculares()));
            }
            if (filtros.getEnfermedadRenal() != null) {
                predicates.add(cb.equal(root.get("enfermedadRenal"), filtros.getEnfermedadRenal()));
            }
            if (filtros.getDiabetes() != null) {
                predicates.add(cb.equal(root.get("diabetes"), filtros.getDiabetes()));
            }
            if (filtros.getNivelesColesterol() != null) {
                predicates.add(cb.equal(root.get("nivelesColesterol"), filtros.getNivelesColesterol()));
            }
            if (filtros.getGenero() != null) {
                predicates.add(cb.equal(root.get("genero"), filtros.getGenero()));
            }
            if (filtros.getTabaquismo() != null) {
                predicates.add(cb.equal(root.get("tabaquismo"), filtros.getTabaquismo()));
            }
            if (filtros.getPeso() != null) {
                predicates.add(cb.equal(root.get("peso"), filtros.getPeso()));
            }
            if (filtros.getEdad() != null) {
                predicates.add(cb.equal(root.get("edad"), filtros.getEdad()));
            }
            if (filtros.getPresionSistolica() != null) {
                predicates.add(cb.equal(root.get("presionSistolica"), filtros.getPresionSistolica()));
            }
            if (filtros.getAltura() != null) {
                predicates.add(cb.equal(root.get("altura"), filtros.getAltura()));
            }
            if (filtros.getDiabetesMellitus() != null) {
                predicates.add(cb.equal(root.get("diabetesMellitus"), filtros.getDiabetesMellitus()));
            }

            // Si no hay filtros, devolver todos los pacientes
            if (predicates.isEmpty()) {
                return cb.conjunction(); // No aplicar filtros
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });
}
}
