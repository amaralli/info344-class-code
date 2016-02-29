package main

import (
    "net/http"
    "fmt"
    "time"
    "encoding/json"
    "log"
    "runtime"
)

type HelloResponse struct {
    Name string
    Message string
    GeneratedAt time.Time
}

var memstats = new(runtime.MemStats)

func getMemStats(w http.ResponseWriter, r  *http.Request) {
    runtime.ReadMemStats(memstats)
    allocstats := make(map[string]uint64)
    allocstats["alloc"] = memstats.Alloc
    allocstats["totalAlloc"] = memstats.totalAlloc
    j, err := json.Marshal(allocstats)
    if nil != err {
        log.Println(err)
        w.WriteHeader(500)
        w.Write([]byte(err.Error()))
    } else {
        w.Header().Add("Content-Type", "application/json")
        w.Write(j)
    }
}

func sayHello(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Path[len("/api/v1/hello/"):]
    resp := HelloResponse{Name: name,
        Message: "Hello" + name,
        GeneratedAt: time.Now()}

    j, err := json.Marshal(resp)
    if nil != err {
        log.Println(err)
        w.WriteHeader(500)
        w.Write([]byte(err.Error()))
    } else {
        w.Header().Add("Content-Type", "application/json")
        w.Write(j)
    }
    //w.Write([]byte("Hello " + name + "!"))
}

func main() {
    http.Handle("/", http.FileServer(http.Dir("./static")))
    http.HandleFunc("/api/v1/hello/", sayHello)
    http.HandleFunc("/api/v1/memstats", getMemStats)

    fmt.Println("Server listening")
    http.ListenAndServe(":9000", nil)
}