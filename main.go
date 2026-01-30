package main

import (
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/", home) // home function for the home page

}

// global scope
// home function
func home(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "home.html")
}

func renderTemplate(w http.ResponseWriter, tmpl string) {
	// parse the spedified template file passed as the input (home, projects, contace, about, skills)
	t, err := template.ParseFiles("templates/" + tmpl)
	if err != nil { // if error is not null
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	t.Execute(w, nil)
}
