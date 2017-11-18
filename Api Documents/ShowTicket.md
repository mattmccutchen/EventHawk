**Show Ticket**
----
  Returns JSON data about a single EventHawk event ticket.

* **URL**

  /ticket/:id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
    
   `id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "ticket" : { "attending" : [boolean], "attendee_id" : "[string]", "event_id" : [string], "ticket_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
