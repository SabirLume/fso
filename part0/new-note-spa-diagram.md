```mermaid
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: Recieves the HTML for the note page to render 
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css 
    activate server
    server->>browser: Receives the CSS for the page 
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js 
    activate server
    server-->>browser: Recieves the JS for the page to run 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json 
    activate server
    server-->>browser: Recieves the Note data from the server to show on page 
    deactivate server
    Note right of browser: Page is loaded with notes from the server 

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser->>server: User Inputs a note and submits the form, with the following content in the form of JSON, {"content":"hello world","date":"2025-01-24T19:36:01.510Z"}
    server->>browser: Response with 201 created code with {"message":"note created"} meassage
    deactivate server
    Note right of browser: Once the note is created the UI is updated with the input text.

```

