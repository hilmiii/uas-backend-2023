// import Model Patient
const Patient = require("../models/Patient");

class PatientController {
  // menambahkan keyword async

  async index(req, res) {
    const patients = await Patient.all();

    // data array lebih dari 0
    if (patients.length > 0) { 
      const data={
        message: "Menampilkkan semua patients", 
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Patients is empty",
      };

      res.status(200).json(data);
    }
  }

  async store(req, res) {
    /**
    * Validasi sederhana
    * - Handle jika salah satu data tidak dikirim
    */
    // destructing object req.body
    const {name, phone, address, status } = req.body;

    // jika data undefined maka kirim response error 
    if (!name || !phone || !address || !status) { 
      const data = {     
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }
  // else
  const patient = await Patient.create(req.body);
    const data = {
      message: "Menambahkan data patient", 
      data: patient,
    };
    return res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    // cari id patient yang ingin diupdate
    const patient = await Patient.find(id);

    if(patient) {
      // melakukan update data
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit data patients`,
        data: patient,
      };
      res.status(200).json(data);
    }
    else {
      const data = {
        message: `Patient not found`,
      };

      res.status(404).json(data);
    }
  }

  async destroy(req, res) { 
    const {id} = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: `Menghapus data patients`,
      };
      res.status(200).json(data);
    } else {
        const data = {
          message: `Patient not found`,
        };

      res.status(404).json(data);
    }
  }

  async show(req, res) { 
    const {id}= req.params;
    // cari patient berdasarkan id 
    const patient = await Patient.find(id);
    if (patient) {
      const data = {
        message: `Menampilkan detail patients`, 
      data: patient,
      };
      res.status(200).json(data);
      } else {
        const data = {
        message: `Patient not found`,
        };
        res.status(404).json(data);
      }
  }

  // cari patient berdasarkan nama
  async search(req, res) {
    const { name } = req.params;
    const patients = await Patient.search(name);

    if (patients.length > 0) {
      const data = {
        message: `Menampilkan patients dengan nama ${name}`,
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient dengan nama ${name} tidak ditemukan`,
      };
      res.status(404).json(data);
    }
  }

  // cari patient berdasarkan status positive
  async positive(req, res) {
    const patients = await Patient.getByStatus("positive");

    const data = {
      message: "Menampilkan patients dengan status positif",
      data: patients,
    };
    res.status(200).json(data);
  }

  // cari patient berdasarkan status recovered/sembuh
  async recovered(req, res) {
    const patients = await Patient.getByStatus("recovered");

    const data = {
      message: "Menampilkan patients dengan status recovered/sembuh",
      data: patients,
    };
    res.status(200).json(data);
  }

  // cari patient berdasarkan status dead/meninggal
  async dead(req, res) {
    const patients = await Patient.getByStatus("dead");

    const data = {
      message: "Menampilkan patients dengan status dead/meninggal",
      data: patients,
    };
    res.status(200).json(data);
  }

}

// Membuat object PatientController
const object = new PatientController();

// Export object PatientController
module.exports = object;