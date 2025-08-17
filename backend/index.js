const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ursl5kh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // const coffeesCollection = client.db('coffeeDB').collection('coffees');
        const usersCollection = client.db('onlineHealthCare').collection('users');

       const doctorsCollection = client.db("onlineHealthCare").collection("doctors");

    // Get all doctors
   app.get("/doctors", async (req, res) => {
      const uid = req.query.uid;
      if (!uid) return res.status(400).send({ message: "UID required" });
      const doctors = await doctorsCollection.find({ createdBy: uid }).toArray();
      res.send(doctors);
    });

    // Add doctor
    app.post("/doctors", async (req, res) => {
      const doctor = req.body;
      if (!doctor.createdBy) return res.status(400).send({ message: "User not specified" });
      // Convert education & availability to array
      doctor.education = doctor.education.split(",").map((s) => s.trim());
      doctor.availability = doctor.availability.split(",").map((s) => s.trim());
      const result = await doctorsCollection.insertOne(doctor);
      res.send({ message: "Doctor added", ...result });
    });

    // Update doctor (only creator)
    app.put("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const uid = req.body.uid;
      const doctor = req.body;
      // Convert education & availability to array
      doctor.education = doctor.education.split(",").map((s) => s.trim());
      doctor.availability = doctor.availability.split(",").map((s) => s.trim());
      const result = await doctorsCollection.updateOne(
        { _id: new ObjectId(id), createdBy: uid },
        { $set: doctor }
      );
      if (result.matchedCount === 0) return res.status(403).send({ message: "Not allowed" });
      res.send({ message: "Doctor updated" });
    });

    // Delete doctor (only creator)
    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const uid = req.body.uid;
      const result = await doctorsCollection.deleteOne({ _id: new ObjectId(id), createdBy: uid });
      if (result.deletedCount === 0) return res.status(403).send({ message: "Not allowed" });
      res.send({ message: "Doctor deleted" });
    });



        // // User related APIs
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

       // GET user by UID
app.get("/users/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await usersCollection.findOne({ unique_id: uid });
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({
      name: user.name || "",
      email: user.email || "",
      photoURL: user.photo || "",
      accountType: user.accountType || "ordinary",
      address: user.address || "",
      phone: user.phone || "",
      creationTime: user.creationTime || "",
      lastSignInTime: user.lastSignInTime || "",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PUT update
app.put("/users/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const updateData = req.body;

    const filter = { unique_id: uid }; // <--- use unique_id here
    const updateDoc = {
      $set: {
        name: updateData.name,
        email: updateData.email,
        photo: updateData.photoURL, // keep consistent
        accountType: updateData.accountType,
        address: updateData.address,
        phone: updateData.phone,
      },
    };

    const result = await usersCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});




        app.post('/users', async (req, res) => {
            const userProfile = req.body;
            console.log(userProfile)
            const result = await usersCollection.insertOne(userProfile);
            res.send(result);
        })


    app.delete("/users/:uid", async (req, res) => {
      const uid = req.params.uid;
      const result = await usersCollection.deleteOne({ uid });
      res.send(result);
    });


       


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Online Health Care server is getting hotter.')
});

app.listen(port, () => {
    console.log(`Online Health Care is running on port ${port}`)
})