// index.js (ฉบับสมบูรณ์)

import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

// --- 1. Setup ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ดึงค่าจาก .env มาเก็บในตัวแปรเพื่อง่ายต่อการใช้งาน
const { CONFIG_URL, LOG_URL, LOG_API_TOKEN, PORT = 3000 } = process.env;

// --- 2. API Endpoints ---

// Endpoint สำหรับทดสอบว่า Server ทำงานอยู่
app.get("/", (req, res) => {
  res.send("Drone API Server is running successfully!");
});

/**
 * GET /configs/{droneId}
 * ดึงข้อมูล config ของโดรนตาม ID ที่ระบุ
 * ข้อมูลที่ตอบกลับจะมีเฉพาะ: drone_id, drone_name, light, country, weight [cite: 30]
 */
app.get("/configs/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const response = await axios.get(CONFIG_URL);
    
    // จัดการข้อมูลที่อาจจะส่งมาในรูปแบบ .data หรือ .data.data
    const configs = response.data.data || response.data;
    
    const drone = configs.find((d) => d.drone_id == droneId);
    if (!drone) {
      return res.status(404).json({ message: "Drone config not found" });
    }

    res.json({
      drone_id: drone.drone_id,
      drone_name: drone.drone_name,
      light: drone.light,
      country: drone.country,
      weight: drone.weigh, // ในต้นทางอาจเป็น weigh แต่โจทย์ต้องการ weight [cite: 30, 38]
    });
  } catch (err) {
    console.error("Error fetching drone configs:", err.message);
    res.status(500).json({ error: "Failed to fetch drone configurations" });
  }
});

/**
 * GET /status/{droneId}
 * ดึงสถานะ (condition) ของโดรนตาม ID ที่ระบุ
 * ข้อมูลที่ตอบกลับจะมีเฉพาะ: condition [cite: 44]
 */
app.get("/status/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const response = await axios.get(CONFIG_URL);

    const configs = response.data.data || response.data;
    
    const drone = configs.find((d) => d.drone_id == droneId);
    if (!drone) {
      return res.status(404).json({ message: "Drone status not found" });
    }

    res.json({
      condition: drone.condition,
    });
  } catch (err) {
    console.error("Error fetching drone status:", err.message);
    res.status(500).json({ error: "Failed to fetch drone status" });
  }
});

/**
 * GET /logs/{droneId}
 * ดึงข้อมูล log ของโดรนตาม ID ที่ระบุ
 * โดยเรียงลำดับตามข้อมูลล่าสุด และจำกัดผลลัพธ์ที่ 12 รายการ 
 */
app.get("/logs/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const response = await axios.get(LOG_URL, {
      headers: { Authorization: `Bearer ${LOG_API_TOKEN}` },
      params: {
        filter: `drone_id = ${droneId}`,
        sort: "-created", // เรียงจากใหม่ไปเก่า
        perPage: 12,     // จำกัด 12 รายการ
      },
    });

    // map ข้อมูลให้เหลือเฉพาะ field ที่ต้องการ [cite: 57]
    const result = response.data.items.map(log => ({
      drone_id: log.drone_id,
      drone_name: log.drone_name,
      created: log.created,
      country: log.country,
      celsius: log.celsius
    }));
    
    res.json(result);
  } catch (err) {
    console.error("Error fetching drone logs:", err.message);
    res.status(500).json({ error: "Failed to fetch drone logs" });
  }
});

/**
 * POST /logs
 * สร้าง log record ใหม่ใน Server2 [cite: 77]
 * ข้อมูลที่ส่งไปจะมีเฉพาะ: drone_id, drone_name, country, celsius [cite: 78]
 */
app.post("/logs", async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body;
    const newLog = { drone_id, drone_name, country, celsius };

    const response = await axios.post(LOG_URL, newLog, {
      headers: { 
        Authorization: `Bearer ${LOG_API_TOKEN}`,
        "Content-Type": "application/json"
      },
    });

    res.status(201).json(response.data); // ตอบกลับด้วย 201 Created
  } catch (err) {
    console.error("Error creating drone log:", err.message);
    res.status(500).json({ error: "Failed to create drone log" });
  }
});


// --- 3. Start Server ---
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);