// Import PatientController
const PatientController = 
require("../controllers/PatientController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Expresss");
});

// route patients
router.get("/patients", PatientController.index); 
router.post("/patients", PatientController.store); 
router.put("/patients/:id", PatientController.update); 
router.delete("/patients/:id", PatientController.destroy); 
// route untuk get detail resource 
router.get("/patients/:id", PatientController.show);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead", PatientController.dead);

// Export router
module.exports = router;