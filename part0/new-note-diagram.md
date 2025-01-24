```mermaid
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: Recieves the HTML for the note page to render 
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css 
    activate server
    server->>browser: Receives the CSS for the page 
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js 
    activate server
    server-->>browser: Recieves the JS for the page to run 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json 
    activate server
    server-->>browser: Recieves the Note data from the server to show on page 
    deactivate server
    Note right of browser: User inputs and submits a new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/data.json/new_note
    activate server
    browser->>server: New note is sent to the server in the form of text/HTML
    server->>browser: Server responds with a 302
    deactivate server
    Note right of browser: Once a response is back from server, page is reloaded and process is started again

```
