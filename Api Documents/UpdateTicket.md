**Update Ticket**
----
  Update a single EventHawk event ticket.

* **URL**

  /votes/:id

* **Method:**
  
  PUT

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

*  **URL Params**

   **Required:**
    
   `id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "ticket" : { "attending" : [boolean] } }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "ticket" : { "attending" : [boolean], "attendee_id" : "[string]", "event_id" : [string], "ticket_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
