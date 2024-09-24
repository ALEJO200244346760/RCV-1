package com.backend.rcv.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String fechaRegistro;
    @Column
    private String ubicacion;
    @Column
    private String edad;
    @Column
    private String genero;
    @Column
    private String diabetes;
    @Column
    private String fumador;
    @Column
    private String presionArterial;
    @Column
    private String colesterol;
    @Column
    private String nivelRiesgo;
    @Column
    private String peso;
    @Column
    private String talla;
    @Column
    private String imc;
    @Column
    private String hipertenso;
    @Column
    private String infarto;
    @Column
    private String acv;
    @Column(name = "medicamentos_notificacion_riesgo", columnDefinition = "LONGTEXT")
    private String notificacionRiesgo;
    @Column(name = "medicamentos_hipertension_arterial", columnDefinition = "LONGTEXT")
    private String hipertensionArterial;
    @Column(name = "medicamentos_prescripcion", columnDefinition = "LONGTEXT")
    private String medicacionPrescripcion;
    @Column(name = "medicamentos_dispensa", columnDefinition = "LONGTEXT")
    private String medicacionDispensa;
    @Column(name = "medicamentos_tabaquismo", columnDefinition = "LONGTEXT")
    private String tabaquismo;
    @Column(name = "medicamentos_laboratorio", columnDefinition = "LONGTEXT")
    private String laboratorio;
}