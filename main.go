package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

// ** RUNSERVER COMMAND: go run main.go **

func main() {
	// Serve static files from the static directory
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
	// route handler for the home page
	http.HandleFunc("/", home) // home function for the home page
	// route handler for the projects page
	http.HandleFunc("/projects", projects) // projects function for the home page
	// route handler for the about page
	http.HandleFunc("/about", about) // about function for the home page
	// route handler for the contact page
	http.HandleFunc("/contact", contact) // contact function for the home page
	// route handler for the skills page
	http.HandleFunc("/skills", skills) // skills function for the home page

	fmt.Println("Server is running on http://localhost:8080") // print statement

	// start server on port 8080 and listen to requests
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// global scope
// home function
func home(w http.ResponseWriter, r *http.Request) {
	// render the home.html template
	renderTemplate(w, "home.html")
}

// projects function
func projects(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "projects.html")
}

// about function
func about(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "about.html")
}

// contact function
func contact(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "contact.html")
}

// skills function
func skills(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "skills.html")
}

func renderTemplate(w http.ResponseWriter, tmpl string) {
	// parse the spedified template file passed as the input (home, projects, contace, about, skills)
	t, err := template.ParseFiles("templates/" + tmpl)
	if err != nil { // if error is not null
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	t.Execute(w, nil)
}
