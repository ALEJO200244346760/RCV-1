package com.example.estadistica.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Paciente {
                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                private Long id;

                private String problemasCardiovasculares;
                private String enfermedadRenal;
                private String diabetes;
                private String nivelesColesterol;
                private String genero;
                private String tabaquismo;
                private String peso;
                private String edad;
                private String presionSistolica;
                private String altura;
                private String diabetesMellitus;

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getProblemasCardiovasculares() {
                return problemasCardiovasculares;
        }

        public void setProblemasCardiovasculares(String problemasCardiovasculares) {
                this.problemasCardiovasculares = problemasCardiovasculares;
        }

        public String getEnfermedadRenal() {
                return enfermedadRenal;
        }

        public void setEnfermedadRenal(String enfermedadRenal) {
                this.enfermedadRenal = enfermedadRenal;
        }

        public String getDiabetes() {
                return diabetes;
        }

        public void setDiabetes(String diabetes) {
                this.diabetes = diabetes;
        }

        public String getNivelesColesterol() {
                return nivelesColesterol;
        }

        public void setNivelesColesterol(String nivelesColesterol) {
                this.nivelesColesterol = nivelesColesterol;
        }

        public String getGenero() {
                return genero;
        }

        public void setGenero(String genero) {
                this.genero = genero;
        }

        public String getTabaquismo() {
                return tabaquismo;
        }

        public void setTabaquismo(String tabaquismo) {
                this.tabaquismo = tabaquismo;
        }

        public String getPeso() {
                return peso;
        }

        public void setPeso(String peso) {
                this.peso = peso;
        }

        public String getEdad() {
                return edad;
        }

        public void setEdad(String edad) {
                this.edad = edad;
        }

        public String getPresionSistolica() {
                return presionSistolica;
        }

        public void setPresionSistolica(String presionSistolica) {
                this.presionSistolica = presionSistolica;
        }

        public String getAltura() {
                return altura;
        }

        public void setAltura(String altura) {
                this.altura = altura;
        }

        public String getDiabetesMellitus() {
                return diabetesMellitus;
        }

        public void setDiabetesMellitus(String diabetesMellitus) {
                this.diabetesMellitus = diabetesMellitus;
        }
}

