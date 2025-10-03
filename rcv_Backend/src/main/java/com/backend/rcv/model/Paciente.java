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
    private String fechaRegistro; // Se mantiene del modelo original
    @Column
    private String ubicacion; // Se mantiene del modelo original
    @Column
    private String dni; // Anteriormente 'cuil'
    @Column
    private String edad;
    @Column
    private String genero; // Será 'femenino' por defecto desde el frontend
    @Column
    private String colesterol;
    @Column
    private String nivelRiesgo; // Calculado
    @Column(columnDefinition = "TEXT")
    private String imc; // Almacenará valor y clasificación, ej: "26.5 (Sobrepeso)"

    // --- Hábitos de Vida ---
    @Column
    private String tomaMedicacionDiario; // Sí/No
    @Column(columnDefinition = "TEXT")
    private String medicacionCondiciones; // "Diabetes, Hipertensión"
    @Column
    private String fumaDiario; // Sí/No
    @Column
    private String actividadFisica; // Sí/No
    @Column
    private String horasSueno; // Sí/No
    @Column
    private String estresCronico; // Sí/No
    @Column
    private String estresTipo; // "Depresión", "Otras"

    // --- Antecedentes de Salud Femenina ---
    @Column
    private String tumoresGinecologicos; // Sí/No
    @Column(columnDefinition = "TEXT")
    private String tumoresTipo; // "Ovarios, Mama"
    @Column
    private String enfermedadesAutoinmunes; // Sí/No
    @Column(columnDefinition = "TEXT")
    private String autoinmunesTipo; // "Lupus, Artritis"
    
    // --- Salud Reproductiva ---
    @Column
    private String tuvoHijos; // Sí/No
    @Column
    private String cantidadHijos;
    @Column
    private String complicacionesEmbarazo; // Sí/No
    @Column
    private String motivoNoHijos; // "No quiso", "No pudo", etc.
    @Column
    private String ciclosMenstruales; // Sí/No
    @Column
    private String metodoAnticonceptivo;
    @Column
    private String histerectomia; // Sí/No
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
    private String tensionSistolica; // Anteriormente 'presionArterial'
    @Column
    private String tensionDiastolica;
}