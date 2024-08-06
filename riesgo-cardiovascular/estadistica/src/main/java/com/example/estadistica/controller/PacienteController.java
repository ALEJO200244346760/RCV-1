package com.example.estadistica.controller;

import com.example.estadistica.model.Paciente;
import com.example.estadistica.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadisticas")
@CrossOrigin(origins = "http://localhost:3000")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public boolean createPaciente(@RequestBody Paciente paciente) {
        try {
            return pacienteService.getAllPacientes().add(paciente);
        } catch (Exception e) {
            // Manejar la excepción y registrar el error
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping
    public List<Paciente> getPacientes(@RequestParam(required = false) String problemasCardiovasculares,
                                       @RequestParam(required = false) String enfermedadRenal,
                                       @RequestParam(required = false) String diabetes,
                                       @RequestParam(required = false) String nivelesColesterol,
                                       @RequestParam(required = false) String genero,
                                       @RequestParam(required = false) String tabaquismo,
                                       @RequestParam(required = false) String peso,
                                       @RequestParam(required = false) String edad,
                                       @RequestParam(required = false) String presionSistolica,
                                       @RequestParam(required = false) String altura,
                                       @RequestParam(required = false) String diabetesMellitus) {
        try {
            Paciente filtros = new Paciente();
            filtros.setProblemasCardiovasculares(problemasCardiovasculares);
            filtros.setEnfermedadRenal(enfermedadRenal);
            filtros.setDiabetes(diabetes);
            filtros.setNivelesColesterol(nivelesColesterol);
            filtros.setGenero(genero);
            filtros.setTabaquismo(tabaquismo);
            filtros.setPeso(peso);
            filtros.setEdad(edad);
            filtros.setPresionSistolica(presionSistolica);
            filtros.setAltura(altura);
            filtros.setDiabetesMellitus(diabetesMellitus);

            return pacienteService.filterPacientes(filtros);
        } catch (Exception e) {
            // Manejar la excepción y registrar el error
            e.printStackTrace();
            throw e;
        }
    }
}
