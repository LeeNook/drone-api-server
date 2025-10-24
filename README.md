# Drone API Server (Assignment #1)

โปรเจกต์นี้เป็น **API server** สร้างด้วย **Node.js และ Express.js** สำหรับจัดการ **การตั้งค่า (configurations) และบันทึก (logs) ของโดรน**
This project is an **API server** built with **Node.js and Express.js** for managing **drone configurations and logs**.

---

## วิธีใช้งาน (How to Run)

1. **โคลนรีโพซิทอรี (Clone the repository):**

   ```bash
   git clone <your-repo-url>
   ```

   * คำสั่งนี้จะดาวน์โหลดโค้ดโปรเจกต์ลงมาในเครื่องของคุณ
     This command downloads the project code to your local machine.

2. **ติดตั้ง dependencies (Install dependencies):**

   ```bash
   npm install
   ```

   * ติดตั้งไลบรารีและแพ็กเกจที่โปรเจกต์ต้องใช้
     Installs all libraries and packages required by the project.

3. **สร้างไฟล์ `.env`** ในโฟลเดอร์หลักของโปรเจกต์ และใส่ตัวแปรดังนี้ (Create a `.env` file in the root directory and add the following variables):

   ```env
   CONFIG_URL=...
   LOG_URL=...
   LOG_API_TOKEN=...
   ```

   * ใช้สำหรับเก็บค่า URL และ Token ที่เซิร์ฟเวอร์ต้องใช้เชื่อมต่อ
     Used to store URLs and tokens for server connection.

4. **เริ่มเซิร์ฟเวอร์ (Start the server):**

   ```bash
   node index.js
   ```

   * เซิร์ฟเวอร์จะรันที่ `http://localhost:3000`
     The server will run at `http://localhost:3000`.

---

## ตัวอย่างการทดสอบ API (API Testing Examples)

* **GET /configs/{droneId}**

  ```http
  http://localhost:3000/configs/3001
  ```

  * ดึงข้อมูลการตั้งค่าของโดรน
    Fetch the drone's configuration.

* **GET /status/{droneId}**

  ```http
  http://localhost:3000/status/3001
  ```

  * ตรวจสอบสถานะของโดรน
    Check the drone's status.

* **GET /logs/{droneId}**

  ```http
  http://localhost:3000/logs/3001
  ```

  * ดูบันทึกการทำงานของโดรน
    View the drone's logs.

---

## PowerShell Commands (สำหรับ Windows)

```powershell
powershell.exe -ExecutionPolicy Bypass -Command "npm install"
powershell.exe -ExecutionPolicy Bypass -Command "npm start"
```

* ใช้สำหรับติดตั้งและรันเซิร์ฟเวอร์บน Windows
  Used to install and run the server on Windows.
