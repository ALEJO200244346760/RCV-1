package com.backend.rcv.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getEdad() {
        return edad;
    }

    public void setEdad(String edad) {
        this.edad = edad;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(String diabetes) {
        this.diabetes = diabetes;
    }

    public String getFumador() {
        return fumador;
    }

    public void setFumador(String fumador) {
        this.fumador = fumador;
    }

    public String getPresionArterial() {
        return presionArterial;
    }

    public void setPresionArterial(String presionArterial) {
        this.presionArterial = presionArterial;
    }

    public String getColesterol() {
        return colesterol;
    }

    public void setColesterol(String colesterol) {
        this.colesterol = colesterol;
    }

    public String getNivelRiesgo() {
        return nivelRiesgo;
    }

    public void setNivelRiesgo(String nivelRiesgo) {
        this.nivelRiesgo = nivelRiesgo;
    }

    public String getPeso() {
        return peso;
    }

    public void setPeso(String peso) {
        this.peso = peso;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public String getImc() {
        return imc;
    }

    public void setImc(String imc) {
        this.imc = imc;
    }

    public String getHipertenso() {
        return hipertenso;
    }

    public void setHipertenso(String hipertenso) {
        this.hipertenso = hipertenso;
    }

    public String getInfarto() {
        return infarto;
    }

    public void setInfarto(String infarto) {
        this.infarto = infarto;
    }

    public String getAcv() {
        return acv;
    }

    public void setAcv(String acv) {
        this.acv = acv;
    }
}
