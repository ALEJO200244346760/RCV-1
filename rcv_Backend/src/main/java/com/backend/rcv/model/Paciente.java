package com.backend.rcv.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Datos Generales y de Riesgo ---
    @Column
    private String fechaRegistro;
    @Column
    private String ubicacion;
    @Column
    private String dni;
    @Column
    private String telefono; // NUEVO
    @Column
    private String fechaNacimiento; // NUEVO
    @Column
    private String edad;
    @Column
    private String genero;
    @Column
    private String colesterol;
    @Column
    private String nivelRiesgo;
    @Column(columnDefinition = "TEXT")
    private String imc; // Almacena "valor (clasificación)"

    // --- Hábitos de Vida ---
    @Column
    private String tomaMedicacionDiario;
    @Column(columnDefinition = "TEXT")
    private String medicacionCondiciones;
    @Column
    private String fumaDiario;
    @Column
    private String actividadFisica;
    @Column
    private String horasSueno;
    @Column
    private String estresCronico;
    @Column
    private String estresTipo;

    // --- Antecedentes de Salud Femenina ---
    @Column
    private String tumoresGinecologicos;
    @Column(columnDefinition = "TEXT")
    private String tumoresTipo;
    @Column
    private String enfermedadesAutoinmunes;
    @Column(columnDefinition = "TEXT")
    private String autoinmunesTipo;
    
    // --- Salud Reproductiva ---
    @Column
    private String tuvoHijos;
    @Column
    private String cantidadHijos;
    @Column
    private String complicacionesEmbarazo;
    @Column
    private String motivoNoHijos;
    @Column
    private String ciclosMenstruales;
    @Column
    private String metodoAnticonceptivo;
    @Column
    private String histerectomia;
    @Column
    private String menopausia; // NUEVO
    @Column
    private String edadMenopausia;

    // --- Datos Antropométricos y de Medición ---
    @Column
    private String peso;
    @Column
    private String talla;
    @Column
    private String cintura;
    @Column
    private String tensionSistolica; // CORREGIDO (antes 'presion')
    @Column
    private String tensionDiastolica;
}