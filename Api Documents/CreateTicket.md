**Create New Ticket**
----
  Create a new ticket for an EventHawk event.

* **URL**

  /tickets

* **Method:**
  
  POST

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

* **Data Params**

   **Required:**
 
   `{ "ticket" : { "attending" : [boolean], "event_id" : [string], "attendee_id" : [string] } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "ticket" : { "attending" : [boolean], "attendee_id" : "[string]", "event_id" : [string], "ticket_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
  * **Code:** 409 CONFLICT <br />
    **Content:** `{ "ticket" : { "attending" : [boolean], "attendee_id" : "[string]", "event_id" : [string], "ticket_id" : [string], "is_active" : "true" } }`
